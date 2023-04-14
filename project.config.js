export default ({
    root: './src',
    outDir: '../dist',
    ignoreWatch: ['!**/node_modules/**/*'],
    entryPoint: './src/js/main.ts',
    assetsDir: 'static',
    designSystem: {
        entryPoint: '/design-system/js/index.ts'
    }
})