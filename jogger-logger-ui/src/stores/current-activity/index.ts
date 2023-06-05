import { defineStore } from 'pinia';
import type { Activity } from '../activities/types';

export interface State {
  currentActivity: Activity | null;
}

export const useCurrentActivityStore = defineStore('current-activity', {
  state(): State {
    return { currentActivity: null };
  },
});
