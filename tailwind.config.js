/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        modrinth: {
          green: 'var(--color-green)',
          dark: 'var(--bg-secondary)',
          darker: 'var(--bg-primary)',
          darkest: 'var(--bg-darker)',
          border: 'var(--border-color)',
        },
        gray: {
          400: 'var(--text-gray)',
          800: 'var(--border-color)',
        }
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
      }
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
  },
  plugins: [],
}

