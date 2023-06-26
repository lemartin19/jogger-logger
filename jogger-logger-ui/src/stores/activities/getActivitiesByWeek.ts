import { MONDAY, ONE_DAY, WEEKDAYS, getMondayBefore, type Weekday, ONE_WEEK } from '@/utils/dates';
import type { Activity } from './types';
import type { State } from '.';

// TODO: move this to a new file
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

  totalDistance(filters?: State['filters']) {
    const activitiesToCalculate = filters ? this.getFilteredActivities(filters) : this.activities;
    return activitiesToCalculate.reduce((acc, activity) => {
      return acc + activity.distance;
    }, 0);
  }

  // TODO: make this a Filter object
  getFilteredActivities(filters: State['filters']) {
    return this.activities.filter((activity) => {
      return !filters.sportTypes || filters.sportTypes.includes(activity.sport_type);
    });
  }
}

// TODO: move this to a new file
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

  totalDistance(filters?: State['filters']) {
    return WEEKDAYS.reduce<number>((acc, day) => {
      const trainingDay = this.days[day];
      return acc + trainingDay.totalDistance(filters);
    }, 0);
  }
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
