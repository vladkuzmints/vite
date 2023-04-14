import fs from "fs";
import chalk from "chalk";

const args = process.argv.slice(2);
const TYPE = args[0];
const NAME = args[1];

if (TYPE === "block" || TYPE === "component") {
  // HTML
  fs.access(`./src/html/${TYPE}s/${NAME}.html`, (err) => {
    if (err) {
      console.log(chalk.yellow(`File doesn't exist`));
    } else {
      fs.unlink(`./src/html/${TYPE}s/${NAME}.html`, (err) => {
        if (err) console.log(chalk.red("Failed"));
        console.log(
          chalk.green(`HTML File ${NAME}.html is deleted successfully.`)
        );
      });
    }
  });

  fs.access(`./src/html/_partials/${TYPE}s/${NAME}.html`, (err) => {
    if (err) {
      console.log(chalk.yellow(`File doesn't exist`));
    } else {
      fs.unlink(`./src/html/_partials/${TYPE}s/${NAME}.html`, (err) => {
        if (err) console.log(chalk.red("Failed"));
        console.log(
          chalk.green(`HTML File ${NAME}.html is deleted successfully.`)
        );
      });
    }
  });

  // SCSS
  fs.access(`./src/scss/${TYPE}s/_${NAME}.scss`, (err) => {
    if (err) {
      console.log(chalk.yellow(`File doesn't exist`));
    } else {
      fs.unlink(`./src/scss/${TYPE}s/_${NAME}.scss`, (err) => {
        if (err) console.log(chalk.red("Failed"));
        console.log(chalk.green(`File ${NAME}.scss is deleted successfully.`));
      });
    }
  });
}
