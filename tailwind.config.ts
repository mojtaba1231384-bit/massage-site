import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#447F98',
        'secondary': '#629BB6',
        'accent': '#8908E1',
        'light-bg': '#DADEE1',
        'highlight': '#06EBF3',
      },
    },
  },
  plugins: [],
}

export default config