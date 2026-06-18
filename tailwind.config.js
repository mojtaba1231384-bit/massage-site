/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',     // 320 - 374
      's': '375px',      // 375 - 424
      'm': '425px',      // 425 - 767
      'md': '768px',     // 768 - 1023
      'lg': '1024px',    // 1024 - 1439
      'xl': '1440px',    // 1440 به بالا
    },
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