import fs from "fs";
import chalk from "chalk";

const args = process.argv.slice(2);
const TYPE = args[0];
const NAMES = process.argv.slice(3);

if (TYPE === "block" || TYPE === "component") {
  NAMES.forEach((NAME) => {
    // HTML
    fs.access(`./src/pages/${TYPE}s/${NAME}.html`, (err) => {
      if (err) {
        fs.writeFile(
          `./src/pages/${TYPE}s/${NAME}.html`,
          `{{#> layout}}{{/layout}}`,
          (err) => {
            if (err) console.log(chalk.red("Failed"));
            console.log(
              chalk.green(`HTML File ${NAME}.html is created successfully.`)
            );
          }
        );
      } else {
        console.log(chalk.yellow(`File ${NAME}.scss is already exist!`));
      }
    });

    fs.access(`./src/pages/_partials/${TYPE}s/${NAME}.html`, (err) => {
      if (err) {
        fs.writeFile(
          `./src/pages/_partials/${TYPE}s/${NAME}.html`,
          `<!-- ${TYPE.toUpperCase()}: ${NAME} -->`,
          (err) => {
            if (err) console.log(chalk.red("Failed"));
            console.log(
              chalk.green(`HTML File ${NAME}.html is created successfully.`)
            );
          }
        );
      } else {
        console.log(chalk.yellow(`File ${NAME}.scss is already exist!`));
      }
    });
    // SCSS
    fs.access(`./src/scss/${TYPE}s/_${NAME}.scss`, (err) => {
      if (err) {
        fs.writeFile(
          `./src/scss/${TYPE}s/_${NAME}.scss`,
          `.${NAME} {}`,
          (err) => {
            if (err) console.log(chalk.red("Failed"));
            console.log(
              chalk.green(`File ${NAME}.scss is created successfully.`)
            );
          }
        );
      } else {
        console.log(chalk.yellow(`File ${NAME}.scss is already exist!`));
      }
    });
  });
}
