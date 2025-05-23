/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAE5F3',
          100: '#D5CAE7',
          200: '#B095CF',
          300: '#8B61B7',
          400: '#6B3EA6',
          500: '#4A148C', // Primary purple
          600: '#42127D',
          700: '#390F6E',
          800: '#310C5F',
          900: '#280A50',
        },
        secondary: {
          50: '#FFF9E0',
          100: '#FFF3C2',
          200: '#FFE884',
          300: '#FFDC47',
          400: '#FFD319',
          500: '#FFD700', // Gold
          600: '#E6C200',
          700: '#CCAC00',
          800: '#B39700',
          900: '#998200',
        },
        accent: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800', // Orange
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 4px 6px -1px rgba(74, 20, 140, 0.4)',
      },
      backgroundImage: {
        'parchment': "url('https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};