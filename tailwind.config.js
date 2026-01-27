/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,ts}'];
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      kanban: {
        todo: '#3b82f6', // Blue-500
        inprogress: '#f59e0b', // Amber-500
        done: '#10b981', // Emerald-500
      }
    },
    fontFamily: {
      sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui'],
    },
  },
};
export const plugins = [];
