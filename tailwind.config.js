/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {},
    },
    plugins: [],
    //DaisyUi theme
    daisyui: {
        themes: ["light", "dark", "cupcake", "black"],
    },
}