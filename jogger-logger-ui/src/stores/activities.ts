import { defineStore } from 'pinia';
import type { Activity } from './activities/types';
import { getAuthCookie } from './auth';
import type { VueCookies } from 'vue-cookies';
import axios from 'axios';

export interface State {
  activities: Activity[] | null;
  error: string | null;
}

function formatActivities(activities: Activity[]) {
  return activities.map((activity) => ({
    ...activity,
    start_date: new Date(activity.start_date),
    start_date_local: new Date(activity.start_date_local),
  }));
}

function fetchActivities(cookies: VueCookies, args: { before?: number } = {}) {
  const token = getAuthCookie(cookies);
  return axios
    .get<Activity[]>(
      `https://www.strava.com/api/v3/athlete/activities?before=${args.before || Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      return { ...response, data: formatActivities(response.data) };
    });
}

export const useActivitiesStore = defineStore('activity', {
  state(): State {
    return { activities: null, error: null };
  },

  actions: {
    async fetchInitialActivities(cookies: VueCookies) {
      try {
        const { data } = await fetchActivities(cookies);
        this.activities = data;
        return data;
      } catch (error) {
        this.error = `${error}`;
        return null;
      }
    },

    async fetchNextActivities(cookies: VueCookies) {
      if (!this.activities) {
        return this.fetchInitialActivities(cookies);
      }

      try {
        const lastActivityStart = this.activities.reduce(
          (lastStart, activity) => Math.min(activity.start_date.valueOf(), lastStart),
          Date.now(),
        );
        const { data } = await fetchActivities(cookies, { before: lastActivityStart / 1000 });
        this.activities.push(...data);
        return data;
      } catch (error) {
        this.error = `${error}`;
      }
    },
  },
});
