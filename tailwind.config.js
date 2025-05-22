/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        card: {
          bg: 'var(--card-bg)',
          border: 'var(--card-border)',
        },
        text: {
          muted: 'var(--text-muted)',
          dimmed: 'var(--text-dimmed)',
        },
        control: {
          bg: 'var(--control-bg)',
          border: 'var(--control-border)',
          hover: 'var(--control-hover)',
        },
        status: {
          success: 'var(--success)',
          warning: 'var(--warning)',
          error: 'var(--error)',
          info: 'var(--info)',
          'success-bg': 'var(--success-bg)',
          'warning-bg': 'var(--warning-bg)',
          'error-bg': 'var(--error-bg)',
          'info-bg': 'var(--info-bg)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
    },
  },
  plugins: [],
}