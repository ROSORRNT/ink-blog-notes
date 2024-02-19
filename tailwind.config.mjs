/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    colors : {
          gray: {
            '50': '#f4f2f2',
            '100': '#e4dddd',
            '200': '#cbbdbf',
            '300': '#ad9799',
            '400': '#96797e',
            '500': '#876b71',
            '600': '#735b62',
            '700': '#5e4a51',
            '800': '#514249',
            '900': '#493d43',
            '950': '#282024',
          },
          'mardi-gras': {
            '50': '#fef3ff',
            '100': '#fce7ff',
            '200': '#faceff',
            '300': '#f8a7ff',
            '400': '#f572ff',
            '500': '#ea3df8',
            '600': '#d11ddc',
            '700': '#b214b7',
            '800': '#921395',
            '900': '#79157a',
            '950': '#330033',
        },
        'milan': {
          '50': '#fefee8',
          '100': '#ffffa8',
          '200': '#fffb88',
          '300': '#fff244',
          '400': '#fee211',
          '500': '#eec904',
          '600': '#cd9c01',
          '700': '#a47004',
          '800': '#87570c',
          '900': '#734710',
          '950': '#432505',
      },
      'chinook': {
        '50': '#f0f9f4',
        '100': '#daf1e2',
        '200': '#a3dbb9',
        '300': '#88cda8',
        '400': '#56b183',
        '500': '#349567',
        '600': '#247751',
        '700': '#1d5f42',
        '800': '#194c37',
        '900': '#153f2e',
        '950': '#0b2319',
    },
    
      
        
        },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}