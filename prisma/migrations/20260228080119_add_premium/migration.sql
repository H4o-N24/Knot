-- CreateTable
CREATE TABLE "premium_codes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "plan_type" TEXT NOT NULL,
    "used_by_guild_id" TEXT,
    "used_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guild_id" TEXT NOT NULL,
    "bot_channel_id" TEXT,
    "plan_type" TEXT NOT NULL DEFAULT 'FREE',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Tokyo',
    "language" TEXT NOT NULL DEFAULT 'ja',
    "premium_expires_at" DATETIME,
    "event_count_this_month" INTEGER NOT NULL DEFAULT 0,
    "event_count_reset_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_guilds" ("bot_channel_id", "created_at", "guild_id", "id", "language", "plan_type", "timezone", "updated_at") SELECT "bot_channel_id", "created_at", "guild_id", "id", "language", "plan_type", "timezone", "updated_at" FROM "guilds";
DROP TABLE "guilds";
ALTER TABLE "new_guilds" RENAME TO "guilds";
CREATE UNIQUE INDEX "guilds_guild_id_key" ON "guilds"("guild_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "premium_codes_code_key" ON "premium_codes"("code");
