import { MONDAY, ONE_DAY, ONE_WEEK, WEEKDAYS, type Weekday } from '@/utils/dates';
import { TrainingDay } from './TrainingDay';
import type { Activity } from './types';
import type { State } from '.';

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
    const weekStartsBeforeActivity = this.startDate.valueOf() <= activity.start_date.valueOf();
    const activityBeforeWeekEnds =
      activity.start_date.valueOf() < this.startDate.valueOf() + ONE_WEEK;
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
