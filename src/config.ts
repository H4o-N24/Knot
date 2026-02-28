import dotenv from 'dotenv';
dotenv.config();

export const config = {
    /** Discord Botトークン */
    discordToken: process.env.DISCORD_TOKEN ?? '',
    /** Discord Client ID */
    clientId: process.env.CLIENT_ID ?? '',
    /** Discord Guild ID（開発用 - 省略時はグローバル登録） */
    guildId: process.env.GUILD_ID ?? '',
    /** データベースURL */
    databaseUrl: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
};

const REQUIRED: { key: keyof typeof config; envVar: string }[] = [
    { key: 'discordToken', envVar: 'DISCORD_TOKEN' },
    { key: 'clientId', envVar: 'CLIENT_ID' },
];

/**
 * 起動時に必須環境変数を検証する。
 * 未設定の場合は明確なエラーメッセージを表示して即終了する。
 */
export function validateConfig(): void {
    const missing: string[] = [];

    for (const { key, envVar } of REQUIRED) {
        if (!config[key]) {
            missing.push(envVar);
        }
    }

    if (missing.length > 0) {
        console.error('');
        console.error('❌ 必須の環境変数が設定されていません:');
        for (const v of missing) {
            console.error(`   • ${v}`);
        }
        console.error('');
        console.error('👉 .env.example をコピーして .env を作成し、値を設定してください:');
        console.error('   cp .env.example .env');
        console.error('');
        process.exit(1);
    }
}
