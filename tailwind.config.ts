import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'google-blue': '#1a73e8',
        'google-green': '#34a853',
        'google-yellow': '#fbbc04',
        'google-red': '#ea4335',
        'play-green': '#01875f',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'play': '0 2px 8px rgba(0,0,0,0.1)',
        'play-hover': '0 4px 12px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
export default config