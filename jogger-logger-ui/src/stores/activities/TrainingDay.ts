import type { State } from '.';
import type { Activity } from './types';

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
