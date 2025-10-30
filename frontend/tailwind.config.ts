// nextjs/tailwind.config.ts
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
  },
};

export default config;