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
    secondary: '#BB8BB0',
    error: '#CC2936',
    info: '#4D9BDC',
    success: '#7CA574',
    warning: '#E9DA76',
  },
};

// https://coolors.co/1c1c22-f3fffc-bb8bb0-1e4844-972820-e6ba2a-3d68dd-1b8a3a
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1C1C22', // Raisin black
    surface: '#1C1C22', // Raisin black
    'on-background': '#F3FFFC', // Mint Cream
    'on-surface': '#F3FFFC', // Mint Cream
    primary: '#BB8BB0', // African Violet
    secondary: '#1E4844', // Dark Slate Gray
    error: '#972820', // Burnt Umber
    warning: '#E6BA2A', // Saffron
    info: '#3D68DD', // Royal Blue (web-color)
    success: '#1B8A3A', // Forest Green
  },
};

export const themes = { light, dark };
