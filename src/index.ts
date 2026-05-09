/**
 * Knot - Discord日程調整Bot
 * エントリーポイント
 */

import { Client, GatewayIntentBits } from 'discord.js';
import { config, validateConfig } from './config.js';
import { registerReadyHandler } from './events/ready.js';
import { registerInteractionHandler } from './events/interactionCreate.js';
import { registerGuildCreateHandler } from './events/guildCreate.js';
import { startMonthlyScheduler, stopMonthlyScheduler } from './services/cleanup.js';
import { prisma } from './lib/prisma.js';

// 環境変数のバリデーション
validateConfig();

// Discord Clientの初期化
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

// イベントハンドラの登録
registerReadyHandler(client);
registerInteractionHandler(client);
registerGuildCreateHandler(client);

// ログイン
client.login(config.discordToken).then(() => {
    startMonthlyScheduler(client);
}).catch((error) => {
    console.error('❌ Botのログインに失敗しました:', error);
    process.exit(1);
});

// グレースフルシャットダウン
function shutdown(): void {
    console.log('\n🛑 Knot をシャットダウンしています...');
    stopMonthlyScheduler();
    client.destroy();
    prisma.$disconnect().finally(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
