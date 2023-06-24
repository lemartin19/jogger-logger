import type { Activity } from './types';

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class TrainingDay {
  date: Date;
  activities: Activity[];

  constructor(date: Date) {
    this.date = date;
    this.activities = [];
  }

  hasActivities() {
    return Boolean(this.activities.length);
  }
}

export class TrainingWeek {
  startDate: Date;
  days: { [day in Weekday]: TrainingDay };

  constructor(startDate: Date) {
    this.startDate = startDate;

    const week = {} as TrainingWeek['days'];
    WEEKDAYS.forEach((dayOfWeek) => {
      week[dayOfWeek] = new TrainingDay(
        new Date(startDate.valueOf() + ONE_DAY * ((dayOfWeek || 7) - MONDAY)),
      );
    });
    this.days = week;
  }

  isActivityInWeek(activity: Activity) {
    const weekStartsBeforeActivity = this.startDate.valueOf() < activity.start_date.valueOf();
    const activityBeforeWeekEnds =
      activity.start_date.valueOf() <= this.startDate.valueOf() + ONE_WEEK;
    return weekStartsBeforeActivity && activityBeforeWeekEnds;
  }

  addActivity(activity: Activity) {
    const activityDay = activity.start_date.getDay() as Weekday;
    this.days[activityDay].activities.push(activity);
  }
}

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = 7 * ONE_DAY;
const MONDAY = 1;
export const WEEKDAYS: Weekday[] = [MONDAY, 2, 3, 4, 5, 6, 0];

export function getMondayBefore(date = new Date()) {
  const dateDay = date.getDay() || 7;
  const mondayDate = new Date(date.valueOf() - ONE_DAY * (dateDay - MONDAY));
  return new Date(mondayDate.toDateString());
}

// assumes activities are sorted newest to oldest
export function getActivitiesByWeek({
  activities,
  endDate = new Date(),
  startDate,
}: {
  activities: Activity[] | null;
  endDate?: Date;
  startDate?: Date;
}) {
  if (!activities) return null;

  const earliestDate = startDate
    ? startDate
    : activities[activities.length - 1]?.start_date || new Date();
  const earliestDateValue = earliestDate.valueOf();
  let currentWeekStart = getMondayBefore(endDate);

  let activityIndex = 0;

  const trainingWeeks: TrainingWeek[] = [];
  while (currentWeekStart.valueOf() >= earliestDateValue) {
    const startOfPreviousWeek = new Date(currentWeekStart.valueOf() - ONE_WEEK);
    const currentWeek = new TrainingWeek(currentWeekStart);
    trainingWeeks.push(currentWeek);

    while (
      activityIndex < activities.length &&
      currentWeek.isActivityInWeek(activities[activityIndex])
    ) {
      currentWeek.addActivity(activities[activityIndex]);
      activityIndex++;
    }

    currentWeekStart = startOfPreviousWeek;
  }

  return trainingWeeks;
}
