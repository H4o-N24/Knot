/**
 * /availability コマンド - 空き日登録（カレンダー選択式）
 *
 * 翌月のカレンダーをSelectMenu形式で表示し、
 * 空いている日を複数選択で登録できるUI。
 * 前半(1-15日)と後半(16-末日)の2つのメニューに分割。
 */

import {
    SlashCommandBuilder,
    type ChatInputCommandInteraction,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { getNextMonthInfo, formatDateJP } from '../utils/date.js';
import { infoEmbed } from '../utils/embeds.js';

const prisma = new PrismaClient();

/**
 * 外部から呼べるように: 既存の登録をインメモリに読み込む
 */
export async function prePopulateSelections(
    selectionMap: Map<string, Set<string>>,
    userId: string,
    guildId: string,
): Promise<Set<string>> {
    const { year, month } = getNextMonthInfo();
    const monthStr = String(month).padStart(2, '0');
    const key = `${userId}:${guildId}`;

    const existing = await prisma.availability.findMany({
        where: {
            userId,
            guildId,
            date: { startsWith: `${year}-${monthStr}` },
            status: 'AVAILABLE',
        },
        select: { date: true },
    });

    const existingDates = new Set(existing.map((e) => e.date));

    // インメモリにも反映
    selectionMap.set(key, new Set(existingDates));

    return existingDates;
}

export const data = new SlashCommandBuilder()
    .setName('availability')
    .setDescription('翌月の空き日を登録・修正します（カレンダー選択式）');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const { year, month, daysInMonth } = getNextMonthInfo();
    const monthStr = String(month).padStart(2, '0');
    const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

    // 既存の登録を取得 & インメモリに読み込み
    const guildId = interaction.guildId;
    let existingDates = new Set<string>();
    if (guildId) {
        // interactionCreate の availabilitySelections を直接参照できないので
        // 既存データだけ取得してEmbedに表示
        const existing = await prisma.availability.findMany({
            where: {
                userId: interaction.user.id,
                guildId,
                date: { startsWith: `${year}-${monthStr}` },
                status: 'AVAILABLE',
            },
            select: { date: true },
        });
        existingDates = new Set(existing.map((e) => e.date));
    }

    // --- 前半メニュー (1日〜15日) ---
    const firstHalfOptions = [];
    const firstHalfDefaults: string[] = [];
    for (let d = 1; d <= 15; d++) {
        const dateStr = `${year}-${monthStr}-${String(d).padStart(2, '0')}`;
        const dow = new Date(dateStr + 'T00:00:00').getDay();
        const dayLabel = dayLabels[dow];
        const isWeekend = dow === 0 || dow === 6;
        const isRegistered = existingDates.has(dateStr);
        const emoji = isRegistered ? '✅' : isWeekend ? '🟧' : '⬜';
        firstHalfOptions.push({
            label: `${month}/${d} (${dayLabel})${isRegistered ? ' ✓' : ''}`,
            value: dateStr,
            emoji,
            default: isRegistered,
        });
        if (isRegistered) firstHalfDefaults.push(dateStr);
    }

    const firstHalfMenu = new StringSelectMenuBuilder()
        .setCustomId('availability_select_first')
        .setPlaceholder(`📅 前半: ${month}月1日〜15日から選択`)
        .setMinValues(0)
        .setMaxValues(15)
        .addOptions(firstHalfOptions);

    // --- 後半メニュー (16日〜末日) ---
    const secondHalfOptions = [];
    const secondHalfDefaults: string[] = [];
    for (let d = 16; d <= daysInMonth; d++) {
        const dateStr = `${year}-${monthStr}-${String(d).padStart(2, '0')}`;
        const dow = new Date(dateStr + 'T00:00:00').getDay();
        const dayLabel = dayLabels[dow];
        const isWeekend = dow === 0 || dow === 6;
        const isRegistered = existingDates.has(dateStr);
        const emoji = isRegistered ? '✅' : isWeekend ? '🟧' : '⬜';
        secondHalfOptions.push({
            label: `${month}/${d} (${dayLabel})${isRegistered ? ' ✓' : ''}`,
            value: dateStr,
            emoji,
            default: isRegistered,
        });
        if (isRegistered) secondHalfDefaults.push(dateStr);
    }

    const secondHalfMenu = new StringSelectMenuBuilder()
        .setCustomId('availability_select_second')
        .setPlaceholder(`📅 後半: ${month}月16日〜${daysInMonth}日から選択`)
        .setMinValues(0)
        .setMaxValues(secondHalfOptions.length)
        .addOptions(secondHalfOptions);

    // --- ボタン ---
    const confirmBtn = new ButtonBuilder()
        .setCustomId('availability_confirm')
        .setLabel('✅ 空き日を確定する')
        .setStyle(ButtonStyle.Success);

    const clearBtn = new ButtonBuilder()
        .setCustomId('availability_clear')
        .setLabel('🗑️ 選択をクリア')
        .setStyle(ButtonStyle.Secondary);

    // --- カレンダーEmbed ---
    const calendarText = buildCalendarText(year, month, daysInMonth, existingDates);
    const existingInfo = existingDates.size > 0
        ? `\n✅ **現在の登録（${existingDates.size}日）:** ${Array.from(existingDates).sort().map(d => `${Number(d.split('-')[2])}日`).join(', ')}\n`
        : '\n📌 **現在の登録:** なし\n';

    const embed = infoEmbed(
        `${year}年${month}月の空き日を登録`,
        [
            calendarText,
            existingInfo,
            '**使い方:**',
            '1️⃣ 前半・後半のメニューから空いている日を選択',
            '2️⃣ 「✅ 空き日を確定する」ボタンで登録',
            '',
            '💡 既に登録済みの日は ✅ で表示・プリセット済み',
            '🟧 = 土日 ⬜ = 平日',
        ].join('\n'),
    );

    const row1 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(firstHalfMenu);
    const row2 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(secondHalfMenu);
    const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(confirmBtn, clearBtn);

    await interaction.reply({
        embeds: [embed],
        components: [row1, row2, row3],
        ephemeral: true,
    });
}

/**
 * カレンダーテキストを生成（月表示）
 */
function buildCalendarText(year: number, month: number, daysInMonth: number, _existingDates?: Set<string>): string {
    const header = '`日  月  火  水  木  金  土`';
    const firstDow = new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00`).getDay();

    let line = '`';
    for (let i = 0; i < firstDow; i++) {
        line += '    ';
    }

    const lines = [header];
    for (let d = 1; d <= daysInMonth; d++) {
        const dow = (firstDow + d - 1) % 7;
        const dayStr = String(d).padStart(2, ' ');
        line += `${dayStr}  `;

        if (dow === 6 || d === daysInMonth) {
            if (d === daysInMonth && dow !== 6) {
                for (let i = dow + 1; i <= 6; i++) {
                    line += '    ';
                }
            }
            lines.push(line.trimEnd() + '`');
            line = '`';
        }
    }

    return lines.join('\n');
}
