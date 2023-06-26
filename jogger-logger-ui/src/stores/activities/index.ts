import axios from 'axios';
import { defineStore } from 'pinia';
import type { VueCookies } from 'vue-cookies';
import type { Activity, SportType } from './types';
import { getAuthCookie } from '../auth';
import { formatActivity } from './formatActivity';

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
      return { ...response, data: response.data.map(formatActivity) };
    });
}

function fetchActivity(cookies: VueCookies, id: string) {
  const token = getAuthCookie(cookies);
  return axios
    .get<Activity>(`https://www.strava.com/api/v3/activities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return { ...response, data: formatActivity(response.data) };
    });
}

interface Loading {
  args: FetchActivityArgs;
  promise: Promise<Activity[]>;
}

export interface Filters {
  sportTypes: SportType[] | null;
}

export interface State {
  activities: Activity[] | null;
  filters: Filters;
  loading: Loading | null;
  error: string | null;
  currentActivity: Activity | null;
}

export const useActivitiesStore = defineStore('activity', {
  state(): State {
    return {
      activities: null,
      filters: { sportTypes: null },
      error: null,
      loading: null,
      currentActivity: null,
    };
  },

  getters: {
    copyFilters(): State['filters'] {
      const sportTypes = this.filters.sportTypes;
      return { sportTypes: sportTypes && [...sportTypes] };
    },
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

    async fetchActivity(cookies: VueCookies, id: string) {
      const { data } = await fetchActivity(cookies, id);
      this.currentActivity = data;
      return data;
    },

    setFilters(filters: Filters) {
      this.filters = filters;
    },
  },
});
