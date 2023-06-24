export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_WEEK = 7 * ONE_DAY;
export const MONDAY = 1;
export const WEEKDAYS: Weekday[] = [MONDAY, 2, 3, 4, 5, 6, 0];

export function getMondayBefore(date = new Date()) {
  const dateDay = date.getDay() || 7;
  const mondayDate = new Date(date.valueOf() - ONE_DAY * (dateDay - MONDAY));
  return new Date(mondayDate.toDateString());
}

export function dateToLocaleDateString(date: Date) {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
