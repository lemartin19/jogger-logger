import { getMondayBefore, ONE_WEEK } from '@/utils/dates';
import type { Activity } from './types';
import { TrainingWeek } from './TrainingWeek';

/**
 * Sorts activities into `TrainingWeek`s, from most recent start date to earliest start date, with activities grouped by day.
 *
 * @param #activities the activities to restructure into `TrainingWeek`s
 * @param #startDate the earliest date to include in the result
 * @returns an array of `TrainingWeek`s, from most recent start date to earliest start date, with activities grouped by day
 */
export function getActivitiesByWeek({
  activities,
  startDate,
}: {
  activities: Activity[] | null;
  startDate?: Date;
}) {
  if (!activities) return null;

  const earliestDate = startDate
    ? startDate
    : activities[activities.length - 1]?.start_date || new Date();
  const earliestDateValue = earliestDate.valueOf();
  let currentWeekStart = getMondayBefore(activities[0]?.start_date || new Date());

  let activityIndex = 0;

  const trainingWeeks: TrainingWeek[] = [];
  do {
    const currentWeek = new TrainingWeek(currentWeekStart);
    trainingWeeks.push(currentWeek);
    while (
      activityIndex < activities.length &&
      currentWeek.isActivityInWeek(activities[activityIndex])
    ) {
      // console.log('adding activity', activities[activityIndex]);
      currentWeek.addActivity(activities[activityIndex]);
      activityIndex++;
    }

    currentWeekStart = new Date(currentWeekStart.valueOf() - ONE_WEEK);
  } while (currentWeekStart.valueOf() >= earliestDateValue);

  return trainingWeeks;
}
