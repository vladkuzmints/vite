export default {
  root: "src",
  outDir: "dist",
  ignoreWatch: ["!**/node_modules/**/*"],
  entryPoint: "./src/static/js/main.ts",
  assetsDir: "static",
  copyDir: "wwwroot",
  designSystem: {
    entryPoint: "/design-system/js/index.ts",
  }
};
