/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        "yoi-blue-1": "#04328d",
        "yoi-blue-2": "#1a56db",
        "yoi-blue-3": "#3b82f6",
        "yoi-blue-4": "#bfdbfe",
        "yoi-blue-5": "#dbeafe",
        "yoi-white": "#ffffff",
        "yoi-black": "#0a0a0a",
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
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
