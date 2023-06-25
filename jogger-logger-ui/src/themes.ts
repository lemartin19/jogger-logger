import type { ThemeDefinition } from 'vuetify';

// https://coolors.co/f1f9f8-e2f3f1-1c1c22-1e4844-bb8bb0-b93127-e7c34b-4c6dc7
// accessibility: https://davidmathlogic.com/colorblind/#%23F1F9F8-%231C1C22-%231E4844-%23BB8BB0-%23B93127-%23E7C34B-%234C6DC7
const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F1F9F8', // Mint Cream
    'on-background': '#1C1C22', // Raisin Black
    surface: '#E2F3F1', // Azure (web)
    'on-surface': '#1C1C22', // Raisin Black
    primary: '#1E4844', // Dark Slate Gray
    'on-primary': '#F1F9F8', // Mint Cream
    secondary: '#BB8BB0', // African Violet
    error: '#B93127', // Fire Brick
    warning: '#E7C34B', // Saffron
    info: '#4C6DC7', // Royal Blue (web-color)
  },
};

// https://coolors.co/1c1c22-25252d-f1f9f8-bb8bb0-1e4844-972820-e6ba2a-3d68dd
// accessibility: https://davidmathlogic.com/colorblind/#%231C1C22-%23F1F9F8-%23BB8BB0-%231E4844-%23972820-%23E6BA2A-%233D68DD
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1C1C22', // Raisin Black
    'on-background': '#F1F9F8', // Mint Cream
    surface: '#25252D', // Raisin Black
    'on-surface': '#F1F9F8', // Mint Cream
    primary: '#BB8BB0', // African Violet
    'on-primary': '#1C1C22', // African Violet
    secondary: '#1E4844', // Dark Slate Gray
    error: '#972820', // Burnt Umber
    warning: '#E6BA2A', // Saffron
    info: '#3D68DD', // Royal Blue (web-color)
  },
};

export const themes = { light, dark };
