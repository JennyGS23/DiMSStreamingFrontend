/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",  // Esto buscará todos los archivos HTML en la raíz
    "./**/*.html" // Esto buscará archivos HTML en cualquier subcarpeta
  ],
  theme: {
    extend: {
      colors: {
        'color-components': '#0CBABA',
        'color-bar-nav': '#9984D4',
        'color-principal': '#000505',
        'color-secondary': '#282B28',
      },
      backgroundImage: theme => ({
        'recommendations-fond': "url('../img/recommendations.png')"
      }),
    },
  },
  plugins: [],
}
