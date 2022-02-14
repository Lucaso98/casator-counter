module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
