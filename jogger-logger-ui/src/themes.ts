import type { ThemeDefinition } from 'vuetify';

// https://coolors.co/1c1c22-d0ddd9-5d8a7a-4a6d61-846887-9a809d-4d9bdc-7ca574-e9da76-cc2936

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#D0DDD9',
    surface: '#B8CCC6',
    'on-background': '#1C1C22',
    'on-surface': '#1C1C22',
    primary: '#5D8A7A',
    'primary-darken-1': '#4A6D61',
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
    background: '#1C1C22',
    surface: '#2E2E38',
    primary: '#5D8A7A',
    'primary-darken-1': '#4A6D61',
    secondary: '#BB8BB0',
    'secondary-darken-1': '#9A809D',
    error: '#CC2936',
    info: '#4D9BDC',
    success: '#7CA574',
    warning: '#E9DA76',
  },
};

export const themes = { light, dark };
