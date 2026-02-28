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
| 🌐 **多言語対応** | 日本語 / English をサーバー単位で切り替え |
| 💰 **プレミアムプラン** | 月300円/年3000円でイベント作成無制限 |

---

## 💰 料金プラン

| 機能 | 無料プラン | プレミアム（月300円 / 年3000円） |
|:---|:---:|:---:|
| イベント作成 | 月3回 | **無制限** |
| 空き日登録 | ✅ 無制限 | ✅ 無制限 |
| 最適日提案 | ✅ | ✅ |
| 多言語対応 | ✅ | ✅ |
| 優先サポート | - | ✅ |

**購入方法**: [BOOTHで購入](https://booth.pm) → `/premium activate <コード>`

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

| 変数名 | 取得場所 | 必須 |
|:---|:---|:---:|
| `DISCORD_TOKEN` | Discord Developer Portal > Bot > Reset Token | ✅ |
| `CLIENT_ID` | Discord Developer Portal > General Information > Application ID | ✅ |
| `GUILD_ID` | サーバー右クリック → IDをコピー（開発者モード必須） | - |
| `DATABASE_URL` | そのまま（`file:./prisma/dev.db`） | - |
| `BOOTH_SECRET` | BOOTHショップ管理画面（プレミアム運用者向け） | - |
| `PREMIUM_WEBHOOK` | Discord Webhook URL（管理通知用） | - |

> **Discord Developer Portal**: https://discord.com/developers/applications

### 4. Botをサーバーに招待

以下のURLの `YOUR_CLIENT_ID` を実際のClient IDに置き換えてブラウザで開く:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=68608&scope=bot%20applications.commands
```

> **推奨権限:** メッセージ送信・メッセージ履歴の閲覧・チャンネルの管理・スラッシュコマンドの使用

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
🔧 5 コマンドをギルド XXXX に登録しました
```

### 7. プレミアム機能有効化（運用者向け）

```bash
# DBマイグレーション実行（課金テーブル作成）
npx prisma migrate dev --name add_premium

# コード生成スクリプト（Node.js）
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const code = require('crypto').randomBytes(8).toString('hex').toUpperCase();
prisma.premiumCode.create({ data: { code, planType: 'MONTHLY' } })
  .then(r => console.log('生成コード:', r.code))
  .finally(() => prisma.\$disconnect());
"
```

---

## ⚙️ Discord上での初期セットアップ

Botを起動後、Discordサーバーで以下を実行してください（サーバー管理者のみ）。

### 専用チャンネルの設定（推奨）

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

### 表示言語の変更

```
/setup language lang:en   # 英語に変更
/setup language lang:ja   # 日本語に戻す
```

---

## 📋 コマンド一覧

| コマンド | 説明 |
|:---|:---|
| `/availability register` | 翌月の空き日をカレンダー選択で登録 |
| `/availability status` | サーバー全員の空き日をカラーマップで表示 |
| `/event create` | 条件付きイベントを作成し最適日を提案 |
| `/event list` | イベント一覧を表示 |
| `/event manage` | イベントの詳細表示・編集・削除・まとめて削除 |
| `/premium activate` | プレミアムコード有効化（管理者のみ） |
| `/premium status` | プラン状況・今月の残作成回数を確認 |
| `/setup channel` | Knot専用チャンネルを設定（管理者のみ） |
| `/setup language` | 表示言語を変更（管理者のみ） |
| `/setup reset` | チャンネル制限を解除（管理者のみ） |
| `/help` | ヘルプを表示 |

### `/event create` のオプション

| オプション | 説明 | 必須 |
|:---|:---|:---:|
| `title` | イベント名 | ✅ |
| `min` | 最低参加人数 | - |
| `max` | 定員（上限） | - |
| `required1〜3` | 必須メンバー | - |
| `dayfilter` | 平日のみ / 週末のみ / すべて | - |

---

## 🏗️ 技術スタック

- **Runtime**: Node.js (TypeScript)
- **Discord**: discord.js v14
- **ORM**: Prisma + SQLite

> **注意**: 本番運用時は SQLite → PostgreSQL への移行を推奨。  
> Railway / Supabase で無料PostgreSQLを取得後、`DATABASE_URL` を変更するだけで移行完了。

- **Test**: Vitest

## 📁 プロジェクト構成

```
Knot/
├── src/
│   ├── commands/           # スラッシュコマンド (availability, event, premium, setup, help)
│   ├── events/
│   │   ├── handlers/       # インタラクションハンドラ (availability, event, manage)
│   │   └── interactionCreate.ts  # ルーター
│   ├── i18n/               # 多言語辞書 (ja.ts, en.ts, index.ts)
│   ├── lib/                # 共有インスタンス・ヘルパー
│   ├── services/           # ビジネスロジック (scheduler, participant)
│   └── utils/              # ユーティリティ (embeds, date)
├── prisma/                 # DBスキーマ・マイグレーション
└── tests/                  # ユニットテスト
```

---

## ℹ️ サポート・お問い合わせ

- 💰 プレミアム購入: [BOOTH](https://booth.pm)
- 🐛 バグ報告: [GitHub Issues](https://github.com/H4o-N24/Knot/issues)

## 📜 ライセンス

ISC
