/**
 * 最適日抽出アルゴリズムのユニットテスト
 */

import { describe, it, expect } from 'vitest';
import { findOptimalDatesFromData } from '../src/services/scheduler.js';

describe('findOptimalDatesFromData', () => {
    const baseData = [
        // 2026-03-01: ユーザーA, B, C が空き → 3人
        { date: '2026-03-01', userId: 'userA' },
        { date: '2026-03-01', userId: 'userB' },
        { date: '2026-03-01', userId: 'userC' },
        // 2026-03-02: ユーザーA, B が空き → 2人
        { date: '2026-03-02', userId: 'userA' },
        { date: '2026-03-02', userId: 'userB' },
        // 2026-03-03: ユーザーA のみ → 1人
        { date: '2026-03-03', userId: 'userA' },
        // 2026-03-05: ユーザーA, B, C, D が空き → 4人
        { date: '2026-03-05', userId: 'userA' },
        { date: '2026-03-05', userId: 'userB' },
        { date: '2026-03-05', userId: 'userC' },
        { date: '2026-03-05', userId: 'userD' },
        // 2026-03-07 (土): ユーザーA, B → 2人
        { date: '2026-03-07', userId: 'userA' },
        { date: '2026-03-07', userId: 'userB' },
    ];

    it('参加可能人数の降順でソートし上位3件を返す', () => {
        const result = findOptimalDatesFromData(baseData, {});
        expect(result).toHaveLength(3);
        expect(result[0].date).toBe('2026-03-05'); // 4人
        expect(result[0].count).toBe(4);
        expect(result[1].date).toBe('2026-03-01'); // 3人
        expect(result[1].count).toBe(3);
        expect(result[2].count).toBe(2); // 2人（03-02 or 03-07）
    });

    it('必須メンバーが不在の日を除外する', () => {
        const result = findOptimalDatesFromData(baseData, {
            requiredUserIds: ['userC'],
        });
        // userC がいるのは 03-01 と 03-05 のみ
        expect(result).toHaveLength(2);
        expect(result.every((c) => c.members.includes('userC'))).toBe(true);
    });

    it('複数の必須メンバーが全員必要', () => {
        const result = findOptimalDatesFromData(baseData, {
            requiredUserIds: ['userC', 'userD'],
        });
        // userC と userD が両方いるのは 03-05 のみ
        expect(result).toHaveLength(1);
        expect(result[0].date).toBe('2026-03-05');
    });

    it('最低人数未満の日を除外する', () => {
        const result = findOptimalDatesFromData(baseData, {
            minParticipants: 3,
        });
        // 3人以上: 03-05(4人), 03-01(3人)
        expect(result).toHaveLength(2);
        expect(result[0].count).toBeGreaterThanOrEqual(3);
        expect(result[1].count).toBeGreaterThanOrEqual(3);
    });

    it('候補日が0件の場合、空配列を返す', () => {
        const result = findOptimalDatesFromData(baseData, {
            requiredUserIds: ['userX'], // 存在しないユーザー
        });
        expect(result).toHaveLength(0);
    });

    it('曜日フィルター（平日のみ）を適用できる', () => {
        const result = findOptimalDatesFromData(baseData, {
            dayOfWeekFilter: [1, 2, 3, 4, 5], // 平日のみ
        });
        // 2026-03-07 は土曜なので除外されるべき
        for (const c of result) {
            const dow = new Date(c.date + 'T00:00:00').getDay();
            expect(dow).toBeGreaterThanOrEqual(1);
            expect(dow).toBeLessThanOrEqual(5);
        }
    });

    it('limit で返却件数を制限できる', () => {
        const result = findOptimalDatesFromData(baseData, { limit: 1 });
        expect(result).toHaveLength(1);
        expect(result[0].date).toBe('2026-03-05'); // 最多4人
    });

    it('必須メンバー + 最低人数 の複合条件', () => {
        const result = findOptimalDatesFromData(baseData, {
            requiredUserIds: ['userA'],
            minParticipants: 2,
        });
        // userA がいて2人以上: 03-05(4), 03-01(3), 03-02(2), 03-07(2)
        expect(result).toHaveLength(3); // limit=3
        expect(result.every((c) => c.members.includes('userA'))).toBe(true);
        expect(result.every((c) => c.count >= 2)).toBe(true);
    });
});
