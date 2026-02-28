/**
 * src/lib/guildPlan.ts
 *
 * サーバーのプラン判定・使用カウント管理ミドルウェア
 *
 * - 無料プラン: イベント作成月3回まで（月初に自動リセット）
 * - プレミアム: 制限なし
 */

import { prisma } from './prisma.js';

/** プランタイプ定数 */
export const PlanType = {
    FREE: 'FREE',
    PREMIUM: 'PREMIUM',
} as const;

export type PlanTypeValue = (typeof PlanType)[keyof typeof PlanType];

/** 無料プランの月次作成上限 */
export const FREE_PLAN_MAX_EVENTS = 3;

// ─────────────────────────────────────────────
// プラン判定
// ─────────────────────────────────────────────

export interface PlanInfo {
    isPremium: boolean;
    planType: PlanTypeValue;
    usedCount: number;        // 今月の使用数
    maxEvents: number;        // 上限（プレミアムは Infinity）
    premiumExpiresAt: Date | null;
}

/**
 * サーバーのプラン情報を取得し、月次カウントを必要に応じてリセットして返す。
 * DBを変更せず読み取りのみ行う。
 */
export async function getPlanInfo(guildId: string): Promise<PlanInfo> {
    const guild = await prisma.guild.findUnique({
        where: { guildId },
        select: { planType: true, premiumExpiresAt: true, eventCountThisMonth: true, eventCountResetAt: true },
    });

    const now = new Date();
    const isPremium = guild?.planType === PlanType.PREMIUM
        && guild.premiumExpiresAt != null
        && guild.premiumExpiresAt > now;

    // 月が変わっていたらカウントを0として扱う（実際のリセットはincrement時に行う）
    const resetAt = guild?.eventCountResetAt;
    const needsReset = !resetAt
        || resetAt.getMonth() !== now.getMonth()
        || resetAt.getFullYear() !== now.getFullYear();
    const usedCount = needsReset ? 0 : (guild?.eventCountThisMonth ?? 0);

    return {
        isPremium,
        planType: (guild?.planType ?? PlanType.FREE) as PlanTypeValue,
        usedCount,
        maxEvents: isPremium ? Infinity : FREE_PLAN_MAX_EVENTS,
        premiumExpiresAt: guild?.premiumExpiresAt ?? null,
    };
}

/**
 * イベント作成が許可されているか確認する。
 * - プレミアムの場合: 常に true
 * - 無料プランの場合: 今月の使用数が上限未満なら true
 */
export async function canCreateEvent(guildId: string): Promise<{ allowed: boolean; planInfo: PlanInfo }> {
    const planInfo = await getPlanInfo(guildId);
    const allowed = planInfo.isPremium || planInfo.usedCount < FREE_PLAN_MAX_EVENTS;
    return { allowed, planInfo };
}

/**
 * イベント作成成功後にカウンターをインクリメントする。
 * プレミアムサーバーは呼び出し不要（呼んでも無害）。
 */
export async function incrementEventCount(guildId: string): Promise<void> {
    const now = new Date();
    const guild = await prisma.guild.findUnique({
        where: { guildId },
        select: { eventCountResetAt: true, eventCountThisMonth: true },
    });

    const resetAt = guild?.eventCountResetAt;
    const needsReset = !resetAt
        || resetAt.getMonth() !== now.getMonth()
        || resetAt.getFullYear() !== now.getFullYear();

    await prisma.guild.update({
        where: { guildId },
        data: {
            eventCountThisMonth: needsReset ? 1 : { increment: 1 },
            ...(needsReset ? { eventCountResetAt: now } : {}),
        },
    });
}

/**
 * 月初に全無料サーバーのカウントをリセットする（cron等から呼び出す想定）。
 */
export async function resetMonthlyCountsForFreeGuilds(): Promise<number> {
    const result = await prisma.guild.updateMany({
        where: { planType: PlanType.FREE },
        data: { eventCountThisMonth: 0, eventCountResetAt: new Date() },
    });
    return result.count;
}
