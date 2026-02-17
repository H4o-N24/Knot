/**
 * 日付操作ユーティリティ
 */

/** 翌月の年・月・日数を返す */
export function getNextMonthInfo(): { year: number; month: number; daysInMonth: number } {
    const now = new Date();
    const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const month = (now.getMonth() + 1) % 12 + 1; // 1-indexed
    const daysInMonth = new Date(year, month, 0).getDate();
    return { year, month, daysInMonth };
}

/** 翌月の全日付を YYYY-MM-DD 形式で返す */
export function getNextMonthDates(): string[] {
    const now = new Date();
    const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const month = (now.getMonth() + 1) % 12 + 1; // 1-indexed
    // getMonth() が 11(12月) → 翌年1月, それ以外 → 同年の翌月
    const actualYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const actualMonth = now.getMonth() + 2; // 翌月 (1-indexed)

    const daysInMonth = new Date(actualYear, actualMonth, 0).getDate();
    const dates: string[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
        const mm = String(actualMonth).padStart(2, '0');
        const dd = String(d).padStart(2, '0');
        dates.push(`${actualYear}-${mm}-${dd}`);
    }
    return dates;
}

/** YYYY-MM-DD を日本語の曜日付き文字列にフォーマット */
export function formatDateJP(dateStr: string): string {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const date = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = days[date.getDay()];
    const [y, m, d] = dateStr.split('-');
    return `${y}年${Number(m)}月${Number(d)}日(${dayOfWeek})`;
}

/** 曜日フィルター: 指定された曜日のみを抽出 */
export function filterByDayOfWeek(dates: string[], allowedDays: number[]): string[] {
    return dates.filter((dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        return allowedDays.includes(date.getDay());
    });
}

/** 日付を曜日番号に変換 (0=日, 1=月, ..., 6=土) */
export function getDayOfWeek(dateStr: string): number {
    return new Date(dateStr + 'T00:00:00').getDay();
}

/** 「平日のみ」フィルター */
export function filterWeekdaysOnly(dates: string[]): string[] {
    return filterByDayOfWeek(dates, [1, 2, 3, 4, 5]);
}

/** 「週末のみ」フィルター */
export function filterWeekendsOnly(dates: string[]): string[] {
    return filterByDayOfWeek(dates, [0, 6]);
}
