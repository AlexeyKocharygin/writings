module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.tsx'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    blue: 'rgb(10, 132, 255)',
                    gray: {
                        DEFAULT: 'rgb(142, 142, 147)',
                        2: 'rgb(99, 99, 102)',
                        3: 'rgb(72, 72, 74)',
                        4: 'rgb(58, 58, 60)',
                        5: 'rgb(44, 44, 46)',
                        6: 'rgb(28, 28, 30)'
                    }
                },
                light: {
                    blue: 'rgb(0, 122, 255)',
                    gray: {
                        DEFAULT: 'rgb(142, 142, 147)',
                        2: 'rgb(174, 174, 178)',
                        3: 'rgb(199, 199, 204)',
                        4: 'rgb(209, 209, 214)',
                        5: 'rgb(229, 229, 234)',
                        6: 'rgb(242, 242, 247)'
                    }
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('@tailwindcss/line-clamp')],
    corePlugins: {
        preflight: false
    }
};
