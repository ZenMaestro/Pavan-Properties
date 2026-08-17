/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact Brand Color Palette from user image:
        // Dark Gunmetal: #142334
        // Rodeo Dust: #c9ad98
        // Platinum: #eae3e0
        // Spring Wood: #f9f6ee
        // White: #ffffff
        gunmetal: {
          DEFAULT: '#142334',
          50: '#f4f6f9',
          100: '#e5ebf1',
          200: '#ced9e4',
          300: '#a7bdd2',
          400: '#799bb9',
          500: '#567ca1',
          600: '#416386',
          700: '#344f6d',
          800: '#23374e',
          900: '#142334',
          950: '#0c1622',
        },
        rodeo: {
          DEFAULT: '#c9ad98',
          50: '#faf8f6',
          100: '#f4f0eb',
          200: '#e8ded4',
          300: '#dac7b8',
          400: '#c9ad98',
          500: '#b8947c',
          600: '#a67d64',
          700: '#8a654f',
          800: '#715343',
          900: '#5c4438',
          950: '#32231c',
        },
        platinum: {
          DEFAULT: '#eae3e0',
          50: '#faf9f8',
          100: '#f4f0ef',
          200: '#eae3e0',
          300: '#dad0cb',
          400: '#c5b5ad',
          500: '#ae9990',
        },
        springwood: {
          DEFAULT: '#f9f6ee',
          50: '#ffffff',
          100: '#fdfcf8',
          200: '#f9f6ee',
          300: '#f2ecdc',
          400: '#e4dac0',
        },
        navy: {
          800: '#23374e',
          900: '#142334',
          950: '#0c1622',
          luxury: '#101d2c',
          deep: '#080f18',
        },
        obsidian: {
          900: '#142334',
          950: '#0c1622',
        },
        gold: {
          300: '#e8ded4',
          400: '#dac7b8',
          500: '#c9ad98',
          600: '#b8947c',
          metallic: '#c9ad98',
          champagne: '#dac7b8',
          bronze: '#a67d64',
          light: '#eae3e0',
        },
        brand: {
          50: '#f4f0eb',
          100: '#e8ded4',
          200: '#dac7b8',
          500: '#c9ad98',
          600: '#b8947c',
          700: '#a67d64',
          800: '#8a654f',
          900: '#142334',
          950: '#0c1622',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
};
