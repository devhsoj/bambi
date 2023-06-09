module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}'
    ],
    plugins: [
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
  