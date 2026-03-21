/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Exact colors from yoi-website
        'yoi-black': '#1D1B34',
        'yoi-blue-1': '#00246B',
        'yoi-blue-2': '#04328D',
        'yoi-white': '#FFFAF6',
        'yoi-blue-3': '#057FBE',
        'yoi-blue-4': '#21A0D2',
        'yoi-blue-5': '#23BAD2',
        'tml-yellow': '#FFBD59',
        'tml-red': '#D80027',
        // shadcn/ui CSS var tokens (used by Payload template components)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [{ h1: { fontSize: '2.5rem' }, h2: { fontSize: '1.25rem', fontWeight: 600 } }],
        },
        md: {
          css: [{ h1: { fontSize: '3.5rem' }, h2: { fontSize: '1.5rem' } }],
        },
      }),
    },
  },
}

export default config
