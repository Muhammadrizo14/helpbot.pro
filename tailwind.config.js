module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts}'
  ],
  corePlugins: {
    preflight: false, // Disables Tailwind's Preflight reset
  },
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-01': '#7958DB',
        'primary-02': '#9677F3',
        'primary-03': '#A488F7',
        'primary-04': '#F0EDF9',
        'primary-05': '#E3DCF8',
        'primary-06': '#D3C9F3',
        'primary-07': '#6847CA',
        'primary-08': '#5737B5',

        // Additional Colors
        yellow: '#FAD143',
        red: '#F5546B',
        green: '#48B8AC',

        // Grey Colors
        'grey-01': '#14182C',
        'grey-02': '#747783',
        'grey-03': '#B2B2B2',
        'grey-04': '#C4C7D3',
        'grey-05': '#ECECEF',
        'grey-06': '#E7E8EF',
        'grey-07': '#F6F6F9',
        'grey-08': 'rgba(246, 246, 249, 0.7)',
        'grey-09': '#FFFFFF',
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
