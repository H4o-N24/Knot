import dotenv from 'dotenv';
dotenv.config();

export const config = {
    /** Discord Botトークン */
    discordToken: process.env.DISCORD_TOKEN ?? '',
    /** Discord Client ID */
    clientId: process.env.CLIENT_ID ?? '',
    /** Discord Guild ID（開発用） */
    guildId: process.env.GUILD_ID ?? '',
    /** データベースURL */
    databaseUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
};

// 起動時に必須環境変数をバリデーション
export function validateConfig(): void {
    const required = ['discordToken', 'clientId'] as const;
    for (const key of required) {
        if (!config[key]) {
            throw new Error(`環境変数が未設定です: ${key} (.env.example を参照してください)`);
        }
    }
}
