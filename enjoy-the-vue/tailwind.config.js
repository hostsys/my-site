/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/App.vue',
        './src/index.css',
        './src/components/MusicPlayer.vue',
        './src/components/NavMenu.vue'
    ],
    theme: {
        fontFamily: {
            hack: ['hack'],
            pixel: ['Birch Leaf']
        },
        fontSize: {
            sm: '1rem',
            base: '1.2rem',
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem'
        },
        container: {
            // center: true,
        },
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
                scene: 'rgb(var(--color-scene) / <alpha-value>)'
            },
            cursor: {
                pixel: 'url(/cursor/cursor-placeholder.png), default'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
