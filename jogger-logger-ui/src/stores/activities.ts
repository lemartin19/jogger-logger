import { defineStore } from 'pinia';
import type { Activity } from './activities/types';
import { getAuthCookie } from './auth';
import type { VueCookies } from 'vue-cookies';
import axios from 'axios';

export interface State {
  activities: Activity[] | null;
  error: string | null;
}

export const useActivitiesStore = defineStore('activity', {
  state(): State {
    return { activities: null, error: null };
  },

  actions: {
    async fetchActivities(cookies: VueCookies) {
      const token = getAuthCookie(cookies);
      try {
        const response = await axios.get<Activity[]>(
          'https://www.strava.com/api/v3/athlete/activities',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newActivities = response.data.map((activity) => ({
          ...activity,
          start_date: new Date(activity.start_date),
          start_date_local: new Date(activity.start_date_local),
        }));
        this.activities = this.activities ? this.activities.concat(newActivities) : newActivities;
      } catch (error) {
        this.error = `${error}`;
      }
    },
  },
});
