/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#07060A',
          900: '#0E0C12',
          800: '#15131C',
          700: '#1D1A27',
        },
        pearl: {
          50: '#FCFBFF',
          100: '#F2F0F8',
          200: '#E6E3F2',
        },
        gold: {
          50: '#FFF7DF',
          100: '#FFEAB5',
          200: '#FFD78A',
          300: '#F5C55A',
          400: '#E7B73C',
          500: '#C99619',
        },
        mint: {
          200: '#A7F3D0',
          300: '#6EE7B7',
        },
      },
      boxShadow: {
        soft: '0 26px 70px -30px rgba(0, 0, 0, 0.65)',
        ring: '0 0 0 1px rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
    },
  },
  plugins: [],
}

