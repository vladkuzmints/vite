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
    const inputsFiles = await inputs()

    return {
        server: {
            port: 3000,
            watch: {
                ignored: ['!**/node_modules/**/*'],
            }
        },
        optimizeDeps: {
        },
        root: './src',
        build: {
            outDir: '../dist',
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    app: '/js/main.ts',
                    ds: '/design-system/js/index.ts',
                    ...inputsFiles
                },
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
                    entryFileNames: (info) => {
                        if (info.name === 'ds') {
                            return `${project.output.assetsDir}/js/ds/[name]-[hash].js`
                        } else {
                            return `${project.output.assetsDir}/js/[name]-[hash].js`
                        }
                    }
                }
            }
        },
        plugins: [
            // await DesignSystemPlugin(),
            handlebars({
                helpers: {
                    json: (obj) => JSON.stringify(obj),
                    block: function (name) {
                        var blocks  = this._blocks,
                            content = blocks && blocks[name];
            
                        return content ? content.join('\n') : null;
                    },
                    contentFor: function (name, options) {
                        var blocks = this._blocks || (this._blocks = {}),
                            block  = blocks[name] || (blocks[name] = []);
            
                        block.push(options.fn(this));
                    }
                },
                context: {
                    pages,
                    content
                },
                partialDirectory: [
                    resolve(__dirname, ''),
                    resolve(__dirname, 'src'),
                    resolve(__dirname, 'src/html/_partials/master'),
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
                'design-system/**/*',
                '**/_partials/**/*.html'
            ])
        ],
    }
})