
// tailwind.config.js
module.exports = {
content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
      require('tailwindcss-textshadow')

  ],
};
