import type { Activity } from './types';

export function formatActivity(activity: Activity) {
  return {
    ...activity,
    start_date: new Date(activity.start_date),
    start_date_local: new Date(activity.start_date_local),
  };
}
