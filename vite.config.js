import { defineConfig } from "vite";
import project from "./project.config.js";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";
import handlebars from "vite-plugin-handlebars";

// Configs
import Production from './configs/vite.production.js'
import Development from './configs/vite.development.js'

// Tasks
import { inputs, templates, getContent } from "./configs/tasks/templates.js";

export default defineConfig(async ({ mode }) => {

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


  // Plugins:
  let plugins = [
    eslintPlugin(),
    handlebars({
      helpers: {
        json: (obj) => JSON.stringify(obj)
      },
      context: {
        // If design system is set in config
        designSystem: project.designSystem ? true : false,
        pages,
        ...content,
      },
      partialDirectory: [
        resolve(__dirname, "src"),
        resolve(__dirname, "src/pages/_partials"),
        resolve(__dirname, "src/pages/_partials/master"),
        resolve(__dirname, "src/design-system/helpers"),
      ],
    })
  ]

  if (mode === 'production') {
    plugins = [...plugins, ...Production.plugins]
  } else {
    plugins = [...plugins, ...Development.plugins]
  }
  // END: plugins

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
              return `design-system/[name]-[hash].js`;
            } else {
              return `${project.assetsDir}/js/[name]-[hash].js`;
            }
          },
        },
      },
    },
    plugins,
    resolve: {
      alias: {
        "@scss": resolve(__dirname, `${project.root}/static/scss`),
        "@script": resolve(__dirname, `${project.root}/static/js`),
      },
    },
  };

  return configs;
});
