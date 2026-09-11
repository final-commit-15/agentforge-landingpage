/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'Outfit', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        logo: ['var(--font-outfit)', 'Outfit', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'var(--brand-primary)',
        accent: 'var(--brand-secondary)',
        surface: 'var(--bg-secondary)',
        ink: 'var(--text-primary)',
        // Theme-aware tokens backed by CSS vars (switchable dark / light)
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-body': 'var(--text-body)',
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        'brand-primary': 'var(--brand-primary)',
        'brand-secondary': 'var(--brand-secondary)',
      },
      borderRadius: {
        16: '16px',
        20: '20px',
        24: '24px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px -8px rgba(16, 24, 40, 0.08)',
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 20px 48px -24px rgba(37, 99, 235, 0.16)',
        cta: '0 1px 2px rgba(16, 24, 40, 0.08), 0 16px 32px -12px rgba(37, 99, 235, 0.4)',
        // Warm-white glows (robo + cards)
        'warm': '0 0 24px rgba(255, 245, 230, 0.18), 0 0 64px rgba(255, 245, 230, 0.12)',
        'warm-lg': '0 0 40px rgba(255, 245, 230, 0.22), 0 0 100px rgba(255, 245, 230, 0.14)',
        'warm-hover': '0 0 32px rgba(255, 245, 230, 0.28), 0 0 80px rgba(255, 237, 213, 0.18)',
        'glow-blue': '0 0 24px rgba(99, 102, 241, 0.35)',
        'glow-blue-hover': '0 0 36px rgba(99, 102, 241, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
