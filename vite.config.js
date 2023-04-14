import { defineConfig } from "vite";
import project from "./project.config.js";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";

// Tasks
import { inputs, templates, getContent } from "./configs/tasks/templates.js";

// Plugins
import handlebars from "vite-plugin-handlebars";
import FullReload from "vite-plugin-full-reload";
import copy from "rollup-plugin-copy";

export default defineConfig(async ({ mode }) => {
  // if (mode === 'development') {

  // }

  const pages = await templates();
  const content = await getContent();
  const inputsFiles = await inputs();

  // Entry points
  const entryPoints = {
    app: project.entryPoint,
    ...inputsFiles,
  };

  if (project.designSystem?.entryPoint) {
    entryPoints["design-system"] = project.designSystem.entryPoint;
  }
  // END: entry points

  const configs = {
    server: {
      port: 3000,
      watch: {
        ignored: project.ignoreWatch,
      },
    },
    root: project.root,
    build: {
      outDir: project.outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: entryPoints,
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".")[1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
              return `${project.assetsDir}/${extType}/[name][extname]`;
            }
            return `${project.assetsDir}/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: `${project.assetsDir}/js/chunks/[name]-[hash].js`,
          entryFileNames: (info) => {
            if (info.name === "design-system") {
              return `${project.assetsDir}/js/design-system/[name]-[hash].js`;
            } else {
              return `${project.assetsDir}/js/[name]-[hash].js`;
            }
          },
        },
      },
    },
    plugins: [
      eslintPlugin(),
      handlebars({
        helpers: {
          json: (obj) => JSON.stringify(obj),
          block: function (name) {
            var blocks = this._blocks,
              content = blocks && blocks[name];

            return content ? content.join("\n") : null;
          },
          contentFor: function (name, options) {
            var blocks = this._blocks || (this._blocks = {}),
              block = blocks[name] || (blocks[name] = []);

            block.push(options.fn(this));
          },
        },
        context: {
          // If design system is set in config
          designSystem: project.designSystem ? true : false,
          pages,
          ...content,
        },
        partialDirectory: [
          resolve(__dirname, ""),
          resolve(__dirname, "src"),
          resolve(__dirname, "src/html/_partials/master"),
          resolve(__dirname, "src/design-system/helpers"),
        ],
      }),
      copy({
        targets: [
          // TODO: implement with optimizely
          //   { src: 'dist/static/', dest: 'wwwroot/' }
        ],
      }),
      FullReload(["design-system/**/*", "**/_partials/**/*.html"]),
    ],
    resolve: {
      alias: {
        "@scss": resolve(__dirname, `${project.root}/scss`),
        "@script": resolve(__dirname, `${project.root}/js`),
      },
    },
  };

  return configs;
});
