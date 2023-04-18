import { rimraf }  from 'rimraf'
import project from "../../project.config.js";
import chalk from "chalk";

console.log(
    chalk.green(`Cleaning...`)
);

[project.copyDir, project.outDir].forEach(path => {
    rimraf(path, {}, () => {
        console.log(`DELETED ${path}`)
    })
})