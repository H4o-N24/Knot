/**
 * Guild / User upsert の共通ヘルパー
 *
 * 複数のコマンドで同じ upsert ロジックが重複していたため共通化。
 */

import { prisma } from './prisma.js';

/** Guild を存在しなければ作成し、返す */
export async function ensureGuild(guildId: string) {
    return prisma.guild.upsert({
        where: { guildId },
        create: { guildId },
        update: {},
    });
}

/** User を存在しなければ作成、discordTag を更新して返す */
export async function ensureUser(userId: string, discordTag: string) {
    return prisma.user.upsert({
        where: { userId },
        create: { userId, discordTag },
        update: { discordTag },
    });
}

/** Guild と User を一括で ensureする（コマンド開始時によく使う） */
export async function ensureGuildAndUser(
    guildId: string,
    userId: string,
    discordTag: string,
) {
    await ensureGuild(guildId);
    await ensureUser(userId, discordTag);
}
