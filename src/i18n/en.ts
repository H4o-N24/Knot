/**
 * English (en) translation dictionary
 */
export const en = {
    // === Common ===
    common: {
        errorTitle: 'Error',
        guildOnly: 'This command can only be used in a server.',
        notFound: 'Event not found.',
        processing: 'An error occurred while processing.',
        noChange: 'No changes were made.',
    },

    // === /availability ===
    availability: {
        registerTitle: (year: number, month: number) => `Register availability for ${new Date(year, month - 1).toLocaleString('en', { month: 'long' })} ${year}`,
        howTo: [
            '**How to use:**',
            '1️⃣ Select available dates from the menus below',
            '2️⃣ Click the "✅ Confirm" button to save',
            '',
            '💡 Already registered dates are shown with ✅',
            '🟧 = Weekend ⬜ = Weekday',
        ].join('\n'),
        currentReg: (count: number) => `✅ **Currently registered (${count} days):**`,
        noReg: '📌 **Currently registered:** None',
        firstHalfPlaceholder: (month: number) => `📅 First half: Select from 1st–15th`,
        secondHalfPlaceholder: (month: number, last: number) => `📅 Second half: Select from 16th–${last}th`,
        confirmBtn: '✅ Confirm availability',
        clearBtn: '🗑️ Clear selection',
        cleared: 'Selection cleared. Please select again from the menus above.',
        selectionTitle: (count: number) => `📅 Current selection (${count} days)`,
        selectionHint: 'You can change your selection. Click **"✅ Confirm availability"** when done.',
        noneSelected: 'None',
        notSelectedError: 'No dates selected yet.\nPlease select dates from the menus above.',
        notSelectedTitle: 'Nothing selected',
        savedTitle: 'Availability saved!',
        savedDesc: (count: number) => `Saved **${count} days** of availability.`,

        statusTitle: (year: number, month: number) => `📊 Availability for ${new Date(year, month - 1).toLocaleString('en', { month: 'long' })} ${year}`,
        noOneRegistered: 'No one has registered availability yet.\nUse `/availability register` to register!',
        noOneThisMonth: (year: number, month: number) => `No availability registered for ${new Date(year, month - 1).toLocaleString('en', { month: 'long' })} ${year} yet.`,
        legend: '👤 Legend (member colors)',
        unregistered: '📝 Not yet registered',

        dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as string[],
    },

    // === /event ===
    event: {
        // create
        noCandidatesTitle: 'Event Created',
        noCandidatesDesc: (title: string, id: string) =>
            `**${title}** was created, but no candidate dates match the conditions.\nAsk members to register their availability.\n\nEvent ID: \`${id}\``,
        selectPlaceholder: 'Select a date',
        participantsLabel: (count: number) => `${count} available`,

        // list
        listTitle: '📋 Event list',
        listEmpty: 'No events yet.\nUse `/event create` to create one!',
        listHint: 'Use `/event manage` to manage events',
        historyBtn: '📜 Past events',
        dateTbd: 'TBD',

        // manage
        manageTitle: '⚙️ Event management',
        manageEmpty: 'No events yet.\nUse `/event create` to create one!',
        manageHint: 'Select an event to manage.\n\n**Available actions:**\n📋 View / ✏️ Edit / 🗑️ Delete',
        managePlaceholder: 'Select an event to manage',
        batchDeleteBtn: (count: number) => `🗑️ Delete all (${count})`,
        recommendBtn: '🔍 Re-suggest optimal dates',

        // status labels
        statusConfirmed: '✅ Confirmed',
        statusPlanning: '📝 Planning',
        dateLabel: '**Date:**',
        minLabel: '**Min participants:**',
        confirmedLabel: '**Confirmed:**',
        waitlistLabel: '**Waitlist:**',
        requiredLabel: '**Required members:**',
        joinBtn: 'Join',
        cancelBtn: 'Cancel',
        infoBtn: '📋 Join',
        editBtn: '✏️ Edit',
        deleteBtn: '🗑️ Delete',
        dateUnset: 'Date TBD',

        // confirmed embed
        confirmedTitle: 'Event date confirmed!',

        // detail
        scheduleLabel: '📅 **Date:**',
        participantsDetailLabel: '👥 **Participants:**',
        waitlistDetailLabel: '⏳ **Waitlist:**',

        // edit modal
        editModalTitle: 'Edit event',
        editTitleLabel: 'Event name',
        editMinLabel: 'Minimum participants',
        editMaxLabel: 'Capacity (0 = unlimited)',
        editedTitle: 'Event updated',
        editTitleChanged: (from: string, to: string) => `📝 Name: **${from}** → **${to}**`,
        editMinChanged: (from: number, to: number) => `👥 Min participants: **${from}** → **${to}**`,
        editMaxChanged: (from: string | number, to: string | number) => `📊 Capacity: **${from}** → **${to}**`,
        unlimited: 'Unlimited',

        // delete
        deletedTitle: 'Deleted',
        deletedDesc: (title: string) => `**${title}** has been deleted.`,
        batchDeleteTitle: (count: number) => `Deleted ${count} event(s)`,
        batchDeletePlaceholder: 'Select events to delete (multi-select)',
        batchDeleteMenuTitle: '🗑️ Delete events',
        batchDeleteMenuDesc: 'Select events to delete.',
        noDeleteTarget: 'No events to delete.',
        noDeleteTargetTitle: 'Nothing to delete',

        // history
        historyTitle: '📜 Past events',
        historyEmpty: 'No past events yet.',
        historyParticipants: (count: number) => `${count} attended`,
        dateNone: 'No date',

        // recommend
        recommendTitle: '🔍 Re-suggest optimal dates',
        recommendDesc: 'Select an event to recalculate optimal dates.\nNew suggestions will be based on the latest availability data.',
        recommendPlaceholder: 'Select an event',
        recommendEmpty: 'No events yet. Use `/event create` to create one.',
        currentDate: (date: string) => `Current: ${date}`,
    },

    // === /setup ===
    setup: {
        channelName: '🗓｜knot-scheduling',
        channelTopic: 'Register availability with /availability | Manage events with /event | Powered by Knot',
        alreadySetTitle: 'Already configured',
        alreadySetDesc: (channelId: string) =>
            `Knot's dedicated channel is already set.\n\n📌 Channel: <#${channelId}>\n\n` +
            `To change it, run \`/setup channel channel:#channel-name\`.\n` +
            `To remove the restriction, run \`/setup reset\`.`,
        createFailed: 'Channel creation failed',
        createFailedDesc:
            'Failed to create the channel automatically.\n\n**How to fix:**\n' +
            '1. Grant the bot "Manage Channels" permission\n' +
            '2. Or specify an existing channel:\n   `/setup channel channel:#channel-name`',
        welcomeTitle: '👋 Welcome to Knot!',
        welcomeDesc:
            'This is the dedicated channel for Knot Bot.\n\n**What you can do:**\n' +
            '📅 `/availability register` — Register your available dates\n' +
            '📊 `/availability status` — Check everyone\'s availability\n' +
            '🎉 `/event create` — Create an event\n' +
            '📋 `/event list` — List all events\n' +
            '⚙️ `/event manage` — Manage events\n' +
            '📖 `/help` — See detailed instructions',
        doneTitle: 'Setup complete',
        doneDesc: (channelId: string) =>
            `Dedicated channel set to <#${channelId}>!\n\nKnot commands can only be used in <#${channelId}> from now on.`,
        resetTitle: 'Channel restriction removed',
        resetDesc: 'Knot commands can now be used from any channel.',
        wrongChannel: (channelId: string) => `Knot commands can only be used in <#${channelId}>.`,
        wrongChannelTitle: 'Wrong channel',
        languageSetTitle: 'Language updated',
        languageSetDesc: (lang: string) => `Server language set to **${lang === 'en' ? 'English' : '日本語'}**.`,
        languagePlaceholder: '言語を選択 / Select language',
    },

    // === /help ===
    help: {
        title: '📖 Knot - Help',
        description: 'Knot is a Discord Bot that **automatically suggests optimal dates** based on members\' availability.',
        availabilityField: {
            name: '📅 `/availability`',
            value: 'Register or update your available dates for next month using a calendar picker.',
        },
        eventCreateField: {
            name: '🎉 `/event create`',
            value: 'Create an event and auto-extract optimal dates.\n• `title` - Event name (required)\n• `min` - Minimum participants\n• `max` - Max capacity\n• `required1–3` - Required members\n• `dayfilter` - Weekdays only / Weekends only',
        },
        eventListField: {
            name: '📋 `/event list`',
            value: 'Display current event list.',
        },
        eventManageField: {
            name: '⚙️ `/event manage`',
            value: 'Open the event management panel.\nAvailable actions for selected event:\n• 📋 **Join** - View details & join\n• ✏️ **Edit** - Change name or capacity\n• 🗑️ **Delete** - Delete event\n• 🗑️ **Delete all** - Bulk delete events',
        },
        autoField: {
            name: '🤖 Automatic features',
            value: '• Sends a reminder at month-end to register next month\'s availability\n• Automatically archives completed events at month-end',
        },
        setupField: {
            name: '⚙️ `/setup`',
            value: 'Configure the dedicated channel or change language (Admin only).\n• `/setup channel` - Set dedicated channel\n• `/setup language` - Change display language (日本語 / English)\n• `/setup reset` - Remove channel restriction',
        },
        footer: 'Knot v1.2.0 | Discord Scheduling Bot',
    },

    // === Participant ===
    participant: {
        joinTitle: 'Joined',
        cancelTitle: 'Cancelled',
        promotedMsg: (userId: string) => `🎉 <@${userId}> has been moved from the waitlist to confirmed!`,
    },

    // === Scheduler tags ===
    schedulerTags: {
        allAvailable: '🏆 Everyone available',
        manyParticipants: '👥 Many participants',
        requiredAll: '✅ All required members available',
        weekday: '📅 Weekday',
        weekend: '🏖️ Weekend',
    },

    // === /premium ===
    premium: {
        activateTitle: 'Premium Activated',
        activateMonthly: (guildName: string, expires: string) =>
            `Premium plan (monthly) applied to **${guildName}**.\nValid until: **${expires}**`,
        activateYearly: (guildName: string, expires: string) =>
            `Premium plan (yearly) applied to **${guildName}**.\nValid until: **${expires}**`,
        invalidCode: 'The code is invalid or has already been used.',
        invalidCodeTitle: 'Invalid code',
        alreadyPremium: (expires: string) => `This server already has an active premium plan.\nValid until: **${expires}**`,
        alreadyPremiumTitle: 'Already Premium',
        statusTitle: '💰 Plan status',
        statusPremium: (expires: string, remaining: string) =>
            `✨ **Premium plan**\nValid until: **${expires}**\n\n🎉 Event creation: **Unlimited**\n📞 Priority support: Active\n\n${remaining}`,
        statusFree: (used: number) =>
            `📦 **Free plan**\n\n📅 Events created this month: **${used}/3**\n\n💰 Upgrade to Premium:\n[Buy on BOOTH](https://booth.pm) → \`/premium activate <code>\``,
        limitTitle: 'Event creation limit reached',
        limitDesc: 'The free plan allows up to 3 event creations per month.\n\n💰 [Buy Premium on BOOTH](https://booth.pm) → `/premium activate <code>` for unlimited events!',
        daysLeft: (days: number) => `📆 **${days}** days remaining`,
    },
} as const;

export type { Locale } from './ja.js';
