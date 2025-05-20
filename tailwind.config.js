module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./*.{js,jsx,ts,tsx,html}",
    "./public/**/*.{html,js,jsx}",
    "./views/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'cascadia': ['"Cascadia Code"', 'monospace'],
      },
      colors: {
        primary: {
          cream: '#F5E6D3',
          brown: '#A47551',
        },
        secondary: {
          cream: '#FFF1E6',
          brown: '#C4A484',
        }
      }
    },
  },
  plugins: [],
}
