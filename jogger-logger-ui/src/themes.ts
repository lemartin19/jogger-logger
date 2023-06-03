import type { ThemeDefinition } from 'vuetify';

// https://coolors.co/1e1e24-d0ddd9-5d8a7a-53796b-846887-bb8bb0-4d9bdc-7ca574-e9da76-cc2936

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#D0DDD9',
    surface: '#B8CCC6',
    'on-background': '#1E1E24',
    'on-surface': '#1E1E24',
    primary: '#5D8A7A',
    'primary-darken-1': '#53796B',
    secondary: '#BB8BB0',
    'secondary-lighten-1': '#9A809D',
    error: '#CC2936',
    info: '#4D9BDC',
    success: '#7CA574',
    warning: '#E9DA76',
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1E1E24',
    surface: '#383843',
    // 'on-background': '#D0DDD9',
    // 'on-surface': '#D0DDD9',
    primary: '#5D8A7A',
    'primary-darken-1': '#A1BAB3',
    secondary: '#BB8BB0',
    'secondary-darken-1': '#9A809D',
    error: '#CC2936',
    info: '#4D9BDC',
    success: '#7CA574',
    warning: '#E9DA76',
  },
};

export const themes = { light, dark };
