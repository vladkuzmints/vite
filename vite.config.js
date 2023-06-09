import { defineConfig } from 'vite';
import  project from './project.config.js';
import { resolve } from 'path';

// Tasks
import { inputs, templates, getContent } from './tasks/templates.js';

// Plugins
import handlebars from 'vite-plugin-handlebars';
import FullReload from 'vite-plugin-full-reload'
import DesignSystemPlugin from './tasks/plugins/design-system-plugin';
import copy from 'rollup-plugin-copy'


export default defineConfig( async () => {

    const pages = await templates()
    const content = await getContent()

    return {
        server: {
            port: 3000,
        },
        root: './src/',
        build: {
            outDir: '../dist/',
            emptyOutDir: true,
            rollupOptions: {
                input: await inputs(),
                output: {   
                    assetFileNames: (assetInfo) => {
                        let extType = assetInfo.name.split('.')[1]
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = 'img'
                            return `${project.output.assetsDir}/${extType}/[name][extname]`
                        }
                        return `${project.output.assetsDir}/${extType}/[name]-[hash][extname]`
                    },
                    chunkFileNames: `${project.output.assetsDir}/js/[name]-[hash].js`,
                    entryFileNames: `${project.output.assetsDir}/js/[name]-[hash].js`
                }
            }
        },
        plugins: [
            DesignSystemPlugin(),
            handlebars({
                helpers: {
                    json: (obj) => JSON.stringify(obj),
                },
                context: {
                    pages,
                    content
                },
                partialDirectory: [
                    resolve(__dirname, 'src'),
                    resolve(__dirname, 'src/design-system/helpers')
                ]
            }),
            copy({
                targets: [
                    // TODO: implement with umbraco
                //   { src: 'dist/static/', dest: 'wwwroot/' }
                ]
            }),
            FullReload([
                '**/design-system/**/*.html',
                '**/_partials/**/*.html'
            ])
        ],
    }
})