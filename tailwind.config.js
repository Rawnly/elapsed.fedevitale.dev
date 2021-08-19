const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors');

delete colors.lightBlue;

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      fontFamily: {
        colus: ['Colus', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      transform: ['active'],
      translate: ['active'],
      scale: ['active'],
      opacity: ['active', 'disabled'],
      cursor: ['disabled'],
      transform: ['disabled'],
      translateY: ['disabled'],
      translateX: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addComponents, theme }) {
      const buttons = {
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: `${theme('spacing.1')}`,
          textAlign: 'center',
          cursor: 'pointer',
          color: theme('colors.gray.800'),
          backgroundColor: theme('colors.gray.200'),
          transition: 'all .15s ease-in-out',
          '&:hover': {
            backgroundColor: theme('colors.gray.300'),
          }
        }
      }

      addComponents(buttons)
    })
  ],
}
