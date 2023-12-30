import { getMondayBefore, ONE_WEEK } from '@/utils/dates';
import type { Activity } from './types';
import { TrainingWeek } from './TrainingWeek';

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
  do {
    const currentWeek = new TrainingWeek(currentWeekStart);
    trainingWeeks.push(currentWeek);
    while (
      activityIndex < activities.length &&
      currentWeek.isActivityInWeek(activities[activityIndex])
    ) {
      currentWeek.addActivity(activities[activityIndex]);
      activityIndex++;
    }

    currentWeekStart = new Date(currentWeekStart.valueOf() - ONE_WEEK);
  } while (currentWeekStart.valueOf() >= earliestDateValue);

  return trainingWeeks;
}
