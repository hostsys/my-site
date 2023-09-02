/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/App.vue',
        './src/index.css',
        './src/components/MusicPlayer.vue',
        './src/components/NavMenu.vue'
    ],
    theme: {
        container: {
            // center: true,
        },
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
                scene: 'rgb(var(--color-scene) / <alpha-value>)'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
