/**
 * i18n エントリポイント
 *
 * 使い方:
 *   const t = await getT(guildId);
 *   await reply(t.event.listTitle);
 */

import { ja } from './ja.js';
import { en } from './en.js';
import { prisma } from '../lib/prisma.js';

export type Lang = 'ja' | 'en';
export type T = typeof ja;

const dictionaries: Record<Lang, T> = { ja, en: en as unknown as T };

/**
 * guildId からサーバーの言語設定を取得して辞書を返す
 */
export async function getT(guildId: string | null): Promise<T> {
    if (!guildId) return ja;
    const guild = await prisma.guild.findUnique({
        where: { guildId },
        select: { language: true },
    });
    const lang = (guild?.language ?? 'ja') as Lang;
    return dictionaries[lang] ?? ja;
}

/**
 * 言語コードから辞書を直接取得（DB不要な場合）
 */
export function getDict(lang: string): T {
    return dictionaries[(lang as Lang)] ?? ja;
}

export { ja, en };
