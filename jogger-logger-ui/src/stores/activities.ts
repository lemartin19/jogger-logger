import { defineStore } from 'pinia';
import type { Activity } from './activities/types';

export interface State {
  activities: Activity[] | null;
}

export const useActivitiesStore = defineStore('activity', {
  state(): State {
    return { activities: null };
  },
});
