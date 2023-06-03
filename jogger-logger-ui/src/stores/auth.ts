import { defineStore } from 'pinia';
import type { VueCookies } from 'vue-cookies';

export function getAuthCookie(cookies: VueCookies): string | undefined {
  const { VITE_AUTH_COOKIE } = import.meta.env;
  return cookies.get(VITE_AUTH_COOKIE);
}

export interface AthleteProfile {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
}

export interface State {
  athleteProfile: AthleteProfile | null;
}

export const useAuthStore = defineStore('athlete-profile', {
  state(): State {
    return { athleteProfile: null };
  },
  getters: {
    hasProfile(state) {
      return Boolean(state.athleteProfile);
    },
    profileName(state) {
      const { athleteProfile } = state;
      return (
        athleteProfile &&
        (`${athleteProfile.firstname} ${athleteProfile.lastname}` || athleteProfile.username)
      );
    },
  },
});
