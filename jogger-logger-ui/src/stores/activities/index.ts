import axios from 'axios';
import { defineStore } from 'pinia';
import type { VueCookies } from 'vue-cookies';
import type { Activity } from './types';
import { getAuthCookie } from '../auth';

function formatActivities(activities: Activity[]) {
  return activities.map((activity) => ({
    ...activity,
    start_date: new Date(activity.start_date),
    start_date_local: new Date(activity.start_date_local),
  }));
}

interface FetchActivityArgs {
  before?: number;
}

function fetchActivities(cookies: VueCookies, args: FetchActivityArgs = {}) {
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

interface Loading {
  args: FetchActivityArgs;
  promise: Promise<Activity[]>;
}

export interface State {
  activities: Activity[] | null;
  loading: Loading | null;
  error: string | null;
}

export const useActivitiesStore = defineStore('activity', {
  state(): State {
    return { activities: null, error: null, loading: null };
  },

  actions: {
    async fetchInitialActivities(cookies: VueCookies) {
      if (this.loading) {
        return this.loading.promise;
      }

      this.loading = { args: {}, promise: fetchActivities(cookies).then(({ data }) => data) };
      try {
        const data = await this.loading.promise;
        this.loading = null;
        this.activities = data;
        return data;
      } catch (error) {
        this.error = `${error}`;
        this.loading = null;
        return null;
      }
    },

    async fetchNextActivities(cookies: VueCookies) {
      if (!this.activities) {
        return this.fetchInitialActivities(cookies);
      }

      if (this.loading) {
        return this.loading.promise;
      }

      try {
        const lastActivityStart = this.activities.reduce(
          (lastStart, activity) => Math.min(activity.start_date.valueOf(), lastStart),
          Date.now(),
        );
        const args = { before: lastActivityStart / 1000 };
        this.loading = { args, promise: fetchActivities(cookies, args).then(({ data }) => data) };
        const data = await this.loading.promise;
        this.activities.push(...data);
        this.loading = null;
        return data;
      } catch (error) {
        this.loading = null;
        this.error = `${error}`;
      }
    },
  },
});
