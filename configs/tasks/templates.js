import path from "path";
import glob from "glob";
import fs from "fs";

const templatesList = () => {
  const pages = {};
  const folders = fs
    .readdirSync("src/html")
    .filter(
      (folder) => path.extname(folder) == "" && folder.indexOf("_") !== 0
    );
  folders.map((folder) => {
    pages[folder] = [];
    fs.readdirSync(`src/html/${folder}`).map((file) => {
      const name = file.replace(/-/g, " ").split(".")[0];

      pages[folder].push({
        url: `/html/${folder}/${file}`,
        title: name,
      });
    });
  });

  return pages;
};

export const templates = async () => await templatesList();

export const inputs = async () => {
  const files = await glob("**/*.html", {
    ignore: [
      "node_modules/**",
      "dist/**",
      "**/design-system/**",
      "**/_partials/**",
    ],
  });
  return { ...files };
};

export const getContent = () => {
  const root = "./src/data";
  let output = {};
  const files = fs
    .readdirSync(root)
    .filter((file) => path.extname(file) === ".json");

  files.forEach((filename) => {
    const contents = JSON.parse(fs.readFileSync(root + "/" + filename, "utf8"));
    Object.assign(output, contents);
  });

  return output;
};
