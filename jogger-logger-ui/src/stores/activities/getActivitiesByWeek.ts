import type { Activity } from './types';

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = 7 * ONE_DAY;
const MONDAY = 1;

function weeksBetween(endDate: Date, startDate: Date) {
  const dateDiff = Math.abs(endDate.valueOf() - startDate.valueOf());
  return Math.round(dateDiff / ONE_WEEK);
}

function getMondayBefore(date = new Date()) {
  const dateDay = date.getDay() || 7;
  const mondayDate = new Date(date.valueOf() - ONE_DAY * (dateDay - MONDAY));
  mondayDate.setHours(0);
  mondayDate.setMinutes(0);
  mondayDate.setSeconds(0);
  mondayDate.setMilliseconds(0);
  return mondayDate;
}

function buildIsActivityInRange(startDate: Date, endDate: Date) {
  return function (activity: Activity) {
    return (
      startDate.valueOf() < activity.start_date.valueOf() &&
      activity.start_date.valueOf() <= endDate.valueOf()
    );
  };
}

export interface TrainingWeek {
  startDate: Date;
  activities: Activity[];
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
    ? startDate.valueOf()
    : Math.min(...activities.map((activity) => activity.start_date.valueOf()));
  let currentWeekStart = getMondayBefore(endDate);

  const trainingWeeks: TrainingWeek[] = [];
  while (currentWeekStart.valueOf() > earliestDate) {
    const startOfNextWeek = new Date(currentWeekStart.valueOf() - ONE_WEEK);
    trainingWeeks.push({
      startDate: currentWeekStart,
      activities: activities.filter(buildIsActivityInRange(startOfNextWeek, currentWeekStart)),
    });

    currentWeekStart = startOfNextWeek;
  }

  return trainingWeeks;
}
