/**
 * 日本語 (ja) 翻訳辞書
 */
export const ja = {
    // === 共通 ===
    common: {
        errorTitle: 'エラー',
        guildOnly: 'サーバー内でのみ使用できます。',
        notFound: 'イベントが見つかりません。',
        processing: '処理中にエラーが発生しました。',
        noChange: '変更はありませんでした。',
    },

    // === /availability ===
    availability: {
        registerTitle: (year: number, month: number) => `${year}年${month}月の空き日を登録`,
        howTo: [
            '**使い方:**',
            '1️⃣ 前半・後半のメニューから空いている日を選択',
            '2️⃣ 「✅ 空き日を確定する」ボタンで登録',
            '',
            '💡 既に登録済みの日は ✅ で表示・プリセット済み',
            '🟧 = 土日 ⬜ = 平日',
        ].join('\n'),
        currentReg: (count: number) => `✅ **現在の登録（${count}日）:**`,
        noReg: '📌 **現在の登録:** なし',
        firstHalfPlaceholder: (month: number) => `📅 前半: ${month}月1日〜15日から選択`,
        secondHalfPlaceholder: (month: number, last: number) => `📅 後半: ${month}月16日〜${last}日から選択`,
        confirmBtn: '✅ 空き日を確定する',
        clearBtn: '🗑️ 選択をクリア',
        cleared: '選択をクリアしました。もう一度メニューから選択してください。',
        selectionTitle: (count: number) => `📅 現在の選択（${count}日）`,
        selectionHint: '選択を変更できます。最後に **「✅ 空き日を確定する」** ボタンを押してください。',
        noneSelected: 'なし',
        notSelectedError: 'まだ日付が選択されていません。\n上のメニューから空いている日を選択してください。',
        notSelectedTitle: '未選択',
        savedTitle: '空き日を登録しました！',
        savedDesc: (count: number) => `**${count}日分** の空き日を登録しました。`,

        statusTitle: (year: number, month: number) => `📊 ${year}年${month}月 空き日状況`,
        noOneRegistered: 'まだ誰も空き日を登録していません。\n`/availability register` で登録しましょう！',
        noOneThisMonth: (year: number, month: number) => `${year}年${month}月はまだ誰も空き日を登録していません。`,
        legend: '👤 凡例（メンバーカラー）',
        unregistered: '📝 未登録メンバー',

        dayLabels: ['日', '月', '火', '水', '木', '金', '土'] as string[],
    },

    // === /event ===
    event: {
        // create
        noCandidatesTitle: 'イベント作成完了',
        noCandidatesDesc: (title: string, id: string) =>
            `**${title}** を作成しましたが、現在の条件に合う候補日が見つかりません。\nメンバーに空き日の登録を依頼してください。\n\nイベントID: \`${id}\``,
        selectPlaceholder: '候補日を選択してください',
        participantsLabel: (count: number) => `${count}人参加可能`,

        // list
        listTitle: '📋 イベント一覧',
        listEmpty: 'まだイベントがありません。\n`/event create` で作成しましょう！',
        listHint: '`/event manage` で管理できます',
        historyBtn: '📜 過去のイベント',
        dateTbd: '未定',

        // manage
        manageTitle: '⚙️ イベント管理',
        manageEmpty: 'まだイベントがありません。\n`/event create` で作成しましょう！',
        manageHint: '管理したいイベントを選択してください。\n\n**選択後にできること:**\n📋 詳細表示 / ✏️ 編集 / 🗑️ 削除',
        managePlaceholder: '管理するイベントを選択',
        batchDeleteBtn: (count: number) => `🗑️ まとめて削除（${count}件）`,
        recommendBtn: '🔍 最適日を再提案',

        // status labels
        statusConfirmed: '✅ 確定',
        statusPlanning: '📝 計画中',
        dateLabel: '**日程:**',
        minLabel: '**最低人数:**',
        confirmedLabel: '**参加確定:**',
        waitlistLabel: '**キャンセル待ち:**',
        requiredLabel: '**必須メンバー:**',
        joinBtn: '参加',
        cancelBtn: 'キャンセル',
        infoBtn: '📋 参加',
        editBtn: '✏️ 編集',
        deleteBtn: '🗑️ 削除',
        dateUnset: '日程未定',

        // confirmed embed
        confirmedTitle: 'イベント日程が確定しました！',

        // detail
        scheduleLabel: '📅 **日程:**',
        participantsDetailLabel: '👥 **参加者:**',
        waitlistDetailLabel: '⏳ **キャンセル待ち:**',

        // edit modal
        editModalTitle: 'イベントを編集',
        editTitleLabel: 'イベント名',
        editMinLabel: '最低参加人数',
        editMaxLabel: '定員（0 = 無制限）',
        editedTitle: 'イベントを更新しました',
        editTitleChanged: (from: string, to: string) => `📝 イベント名: **${from}** → **${to}**`,
        editMinChanged: (from: number, to: number) => `👥 最低人数: **${from}** → **${to}**`,
        editMaxChanged: (from: string | number, to: string | number) => `📊 定員: **${from}** → **${to}**`,
        unlimited: '無制限',

        // delete
        deletedTitle: '削除完了',
        deletedDesc: (title: string) => `**${title}** を削除しました。`,
        batchDeleteTitle: (count: number) => `${count}件のイベントを削除しました`,
        batchDeletePlaceholder: '削除するイベントを選択（複数選択可）',
        batchDeleteMenuTitle: '🗑️ まとめて削除',
        batchDeleteMenuDesc: '削除するイベントを選択してください。',
        noDeleteTarget: '削除できるイベントがありません。',
        noDeleteTargetTitle: '削除対象なし',

        // history
        historyTitle: '📜 過去のイベント',
        historyEmpty: '過去のイベントはまだありません。',
        historyParticipants: (count: number) => `${count}人参加`,
        dateNone: '日程なし',

        // recommend
        recommendTitle: '🔍 最適日を再提案',
        recommendDesc: '最適日を再計算するイベントを選択してください。\n最新の空き日データをもとに提案します。',
        recommendPlaceholder: '再提案するイベントを選択',
        recommendEmpty: 'まだイベントがありません。`/event create` で作成してください。',
        currentDate: (date: string) => `現在: ${date}`,
    },

    // === /setup ===
    setup: {
        channelName: '🗓｜knot-日程調整',
        channelTopic: '/availability で空き日を登録 | /event でイベントを管理 | Powered by Knot',
        alreadySetTitle: 'セットアップ済み',
        alreadySetDesc: (channelId: string) =>
            `Knotの専用チャンネルは既に設定されています。\n\n📌 専用チャンネル: <#${channelId}>\n\n` +
            `他のチャンネルに変更するには \`/setup channel channel:#チャンネル名\` を実行してください。\n` +
            `制限を解除したい場合は \`/setup reset\` を実行してください。`,
        createFailed: 'チャンネル作成失敗',
        createFailedDesc:
            'チャンネルの自動作成に失敗しました。\n\n**対処方法:**\n' +
            '1. Botに「チャンネルの管理」権限を付与する\n' +
            '2. または既存のチャンネルを指定する:\n   `/setup channel channel:#チャンネル名`',
        welcomeTitle: '👋 Knot へようこそ！',
        welcomeDesc:
            'このチャンネルはKnot Botの専用チャンネルです。\n\n**できること:**\n' +
            '📅 `/availability register` — 翌月の空き日を登録\n' +
            '📊 `/availability status` — みんなの空き日を確認\n' +
            '🎉 `/event create` — イベントを作成\n' +
            '📋 `/event list` — イベント一覧を表示\n' +
            '⚙️ `/event manage` — イベントを管理\n' +
            '📖 `/help` — 詳しい使い方を確認',
        doneTitle: 'セットアップ完了',
        doneDesc: (channelId: string) =>
            `専用チャンネルを <#${channelId}> に設定しました！\n\nこれ以降、Knotのコマンドは <#${channelId}> でのみ使用できます。`,
        resetTitle: 'チャンネル制限を解除',
        resetDesc: 'どのチャンネルからでもKnotのコマンドを使用できるようになりました。',
        wrongChannel: (channelId: string) => `Knotのコマンドは <#${channelId}> でのみ使用できます。`,
        wrongChannelTitle: 'チャンネルが違います',
        languageSetTitle: '言語設定を変更しました',
        languageSetDesc: (lang: string) => `サーバーの言語を **${lang === 'en' ? 'English' : '日本語'}** に変更しました。`,
        languagePlaceholder: '言語を選択 / Select language',
    },

    // === /help ===
    help: {
        title: '📖 Knot - ヘルプ',
        description: 'Knotは、メンバーの空きスケジュールから**最適な日程を自動提案**するDiscord Botです。',
        availabilityField: {
            name: '📅 `/availability`',
            value: '翌月の空き日をカレンダー選択で登録・修正します。\n再実行で既存の登録を確認・上書きできます。',
        },
        eventCreateField: {
            name: '🎉 `/event create`',
            value: 'イベントを作成し、最適日を自動抽出します。\n• `title` - イベント名（必須）\n• `min` - 最低参加人数\n• `max` - 定員（上限）\n• `required1〜3` - 必須メンバー\n• `dayfilter` - 平日のみ / 週末のみ',
        },
        eventListField: {
            name: '📋 `/event list`',
            value: '現在のイベント一覧を表示します。',
        },
        eventManageField: {
            name: '⚙️ `/event manage`',
            value: 'イベントの管理パネルを表示します。\n選択したイベントに対して以下の操作が可能:\n• 📋 **参加** - 詳細表示＆参加ボタン\n• ✏️ **編集** - イベント名・人数を変更\n• 🗑️ **削除** - イベントを削除\n• 🗑️ **まとめて削除** - 複数イベントを一括削除',
        },
        autoField: {
            name: '🤖 自動機能',
            value: '• 月末に翌月の空き日登録リマインダーを自動送信\n• 月末に終了したイベントを自動クリーンアップ',
        },
        setupField: {
            name: '⚙️ `/setup`',
            value: '専用チャンネルの設定や言語の変更ができます（管理者のみ）。\n• `/setup channel` - 専用チャンネルを設定\n• `/setup language` - 表示言語を変更（日本語 / English）\n• `/setup reset` - チャンネル制限を解除',
        },
        footer: 'Knot v1.2.0 | Discord日程調整Bot',
    },

    // === 参加/キャンセル ===
    participant: {
        joinTitle: '参加登録',
        cancelTitle: 'キャンセル',
        promotedMsg: (userId: string) => `🎉 <@${userId}> キャンセル待ちから繰り上げで参加が確定しました！`,
    },

    // === スケジューラータグ ===
    schedulerTags: {
        allAvailable: '🏆 全員参加可能',
        manyParticipants: '👥 参加者多数',
        requiredAll: '✅ 必須メンバー全員空き',
        weekday: '📅 平日',
        weekend: '🏖️ 週末',
    },

    // === /premium ===
    premium: {
        activateTitle: 'プレミアム有効化完了',
        activateMonthly: (guildName: string, expires: string) =>
            `**${guildName}** にプレミアムプラン（月額）を適用しました。\n有効期限: **${expires}** まで`,
        activateYearly: (guildName: string, expires: string) =>
            `**${guildName}** にプレミアムプラン（年額）を適用しました。\n有効期限: **${expires}** まで`,
        invalidCode: 'コードが無効または使用済みです。',
        invalidCodeTitle: '無効なコード',
        alreadyPremium: (expires: string) => `このサーバーは既にプレミアム有効中です。\n有効期限: **${expires}** まで`,
        alreadyPremiumTitle: '既にプレミアム中',
        statusTitle: '💰 プラン状況',
        statusPremium: (expires: string, remaining: string) =>
            `✨ **プレミアムプラン**\n有効期限: **${expires}** まで\n\n🎉 イベント作成: **無制限**\n📞 優先サポート: 有効\n\n${remaining}`,
        statusFree: (used: number) =>
            `📦 **無料プラン**\n\n📅 今月のイベント作成: **${used}/3 回**\n\n💰 プレミアムへのアップグレード:\n[BOOTHで購入](https://booth.pm) → \`/premium activate <コード>\``,
        limitTitle: 'イベント作成上限',
        limitDesc: '無料プランでは月3回までイベントを作成できます。\n\n💰 [BOOTHでプレミアム購入](https://booth.pm) → `/premium activate <コード>` で無制限に！',
        daysLeft: (days: number) => `📆 残り **${days}** 日`,
    },
} as const;

export type Locale = typeof ja;
