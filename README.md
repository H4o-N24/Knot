# 🗓️ Knot - Discord日程調整Bot

メンバーの空きスケジュールから最適な日程を自動提案するDiscord Botです。

## ✨ 主な機能

| 機能 | 説明 |
|:---|:---|
| 📅 **空き日登録** | 翌月の空き日をカレンダー選択UIで登録 |
| 📊 **空き日確認** | サーバー全員の空き日をカラーマップで表示 |
| 🏆 **最適日自動提案** | 参加人数・必須メンバー・曜日条件で絞り込み |
| 👥 **定員管理** | 先着順参加・キャンセル待ち自動繰り上げ |
| 📌 **専用チャンネル** | Knotのやり取りを専用チャンネルに限定 |

---

## 🚀 導入手順

### 1. 環境要件

- Node.js >= 20
- npm >= 10

### 2. インストール

```bash
git clone https://github.com/H4o-N24/Knot.git
cd Knot
npm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env
```

`.env` を編集し、以下を設定:

| 変数名 | 取得場所 | 説明 |
|:---|:---|:---|
| `DISCORD_TOKEN` | Bot → Reset Token | BotのTokens |
| `CLIENT_ID` | General Information → Application ID | アプリケーションID |
| `GUILD_ID` | サーバーを右クリック → IDをコピー（開発者モード必須） | テスト用サーバーID |
| `DATABASE_URL` | そのまま | `file:./dev.db` |

> **Discord Developer Portal**: https://discord.com/developers/applications

### 4. Botをサーバーに招待

以下のURLの `YOUR_CLIENT_ID` を実際のClient IDに置き換えてブラウザで開く:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=268437504&scope=bot%20applications.commands
```

> **付与される権限:** メッセージ送信・チャンネルの管理・スラッシュコマンド

### 5. データベースの初期化

```bash
npx prisma migrate dev --name init
```

### 6. 起動

```bash
# 開発モード
npm run dev

# 本番モード
npm run build && npm start
```

起動ログの例:
```
✅ Knot がオンラインになりました！ Knot#XXXX としてログイン中
📡 1 サーバーに接続中
🔧 4 コマンドをギルド XXXX に登録しました
```

---

## ⚙️ Discord上での初期セットアップ

Botを起動後、Discordサーバーで以下を実行してください。

### 専用チャンネルの設定（推奨）

Knotのやり取りを専用チャンネルに限定できます。

```
/setup channel
```
→ `🗓｜knot-日程調整` チャンネルが自動作成され、以降はそこでのみKnotが使えるようになります。

**既存のチャンネルを指定する場合:**
```
/setup channel channel:#チャンネル名
```

**制限を解除する場合:**
```
/setup reset
```

> `/setup` コマンドはサーバー管理者のみ実行できます。

---

## 📋 コマンド一覧

| コマンド | 説明 |
|:---|:---|
| `/availability register` | 翌月の空き日をカレンダー選択で登録 |
| `/availability status` | サーバー全員の空き日をカラーマップで表示 |
| `/event create` | 条件付きイベントを作成し最適日を提案 |
| `/event list` | イベント一覧を表示 |
| `/event manage` | イベントの詳細表示・編集・削除 |
| `/setup channel` | Knot専用チャンネルを設定（管理者のみ） |
| `/setup reset` | チャンネル制限を解除（管理者のみ） |
| `/help` | ヘルプを表示 |

### `/event create` のオプション

| オプション | 説明 | 必須 |
|:---|:---|:---|
| `title` | イベント名 | ✅ |
| `min` | 最低参加人数 | - |
| `max` | 定員（上限） | - |
| `required1〜3` | 必須メンバー | - |
| `dayfilter` | 平日のみ / 週末のみ | - |

---

## 🏗️ 技術スタック

- **Runtime**: Node.js (TypeScript)
- **Discord**: discord.js v14
- **ORM**: Prisma + SQLite
- **Test**: Vitest

## 📁 プロジェクト構成

```
Knot/
├── src/
│   ├── commands/   # スラッシュコマンド
│   ├── events/     # Discordイベントハンドラ
│   ├── lib/        # 共有インスタンス（Prisma等）
│   ├── services/   # ビジネスロジック
│   └── utils/      # ユーティリティ
├── prisma/         # DBスキーマ・マイグレーション
├── tests/          # テスト
└── README.md
```

## 📜 ライセンス

ISC
