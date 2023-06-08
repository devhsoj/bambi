module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}'
    ],
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
    daisyui: {
        logs: false,
        base: true,
        darkTheme: 'forest',
        themes: [
            'cupcake',
            'forest'
        ]
    }
};
  