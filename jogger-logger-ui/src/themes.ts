import type { ThemeDefinition } from 'vuetify';

// https://coolors.co/f3fffc-1c1c22-5d8a7a-bb8bb0-b93127-e7c34b-4c6dc7-3f7d3a
const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F3FFFC', // Mint Cream
    surface: '#F3FFFC', // Mint Cream
    'on-background': '#1C1C22', // Raisin Black
    'on-surface': '#1C1C22', // Raisin Black
    primary: '#5D8A7A', // Viridian
    secondary: '#BB8BB0', // African Violet
    error: '#B93127', // Fire Brick
    warning: '#E7C34B', // Saffron
    info: '#4C6DC7', // Royal Blue (web-color)
    success: '#3F7D3A', // Fern Green
  },
};

// https://coolors.co/1c1c22-f3fffc-bb8bb0-1e4844-972820-e6ba2a-3d68dd-1b8a3a
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1C1C22', // Raisin Black
    surface: '#1C1C22', // Raisin Black
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
