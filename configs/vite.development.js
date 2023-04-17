import FullReload from "vite-plugin-full-reload";

export default {
    plugins: [
        FullReload(["design-system/**/*", "**/_partials/**/*.html"])
    ]
}