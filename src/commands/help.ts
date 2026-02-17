/**
 * /help コマンド - ヘルプ表示
 */

import {
    SlashCommandBuilder,
    type ChatInputCommandInteraction,
    EmbedBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Knotの使い方を表示します');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('📖 Knot - ヘルプ')
        .setDescription(
            'Knotは、メンバーの空きスケジュールから**最適な日程を自動提案**するDiscord Botです。',
        )
        .addFields(
            {
                name: '📅 `/availability`',
                value: '翌月の空き日を登録します。Modal画面で日付を入力できます。',
                inline: false,
            },
            {
                name: '🎉 `/event create`',
                value: [
                    'イベントを作成し、最適日を自動抽出します。',
                    '**オプション:**',
                    '• `title` - イベント名（必須）',
                    '• `min` - 最低参加人数',
                    '• `max` - 定員（上限）',
                    '• `required1〜3` - 必須メンバー',
                    '• `dayfilter` - 平日のみ / 週末のみ',
                ].join('\n'),
                inline: false,
            },
            {
                name: '📋 `/event list`',
                value: '現在のイベント一覧を表示します。',
                inline: false,
            },
            {
                name: '🔍 `/event info`',
                value: 'イベントの詳細（参加者、キャンセル待ち等）を表示します。',
                inline: false,
            },
        )
        .setFooter({ text: 'Knot v1.0.0 | 次世代Discord日程調整Bot' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
}
