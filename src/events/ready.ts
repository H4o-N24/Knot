/**
 * ready イベントハンドラ
 * Bot起動時にスラッシュコマンドを登録
 */

import { REST, Routes, type Client, Events } from 'discord.js';
import { config } from '../config.js';
import { getCommandsJSON } from '../commands/index.js';

export function registerReadyHandler(client: Client): void {
    client.once(Events.ClientReady, async (readyClient) => {
        console.log(`✅ Knot がオンラインになりました！ ${readyClient.user.tag} としてログイン中`);
        console.log(`📡 ${readyClient.guilds.cache.size} サーバーに接続中`);

        // スラッシュコマンドの登録
        const rest = new REST({ version: '10' }).setToken(config.discordToken);
        const commandsJSON = getCommandsJSON();

        try {
            if (config.guildId) {
                // 開発用: 特定のギルドに即座に反映
                await rest.put(
                    Routes.applicationGuildCommands(config.clientId, config.guildId),
                    { body: commandsJSON },
                );
                console.log(`🔧 ${commandsJSON.length} コマンドをギルド ${config.guildId} に登録しました`);
            } else {
                // 本番用: グローバルコマンドとして登録
                await rest.put(
                    Routes.applicationCommands(config.clientId),
                    { body: commandsJSON },
                );
                console.log(`🌐 ${commandsJSON.length} コマンドをグローバルに登録しました`);
            }
        } catch (error) {
            console.error('❌ コマンド登録に失敗しました:', error);
        }
    });
}
