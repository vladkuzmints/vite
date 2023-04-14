import fs from 'fs';
import chalk from 'chalk';

const args = process.argv.slice(2)
const TYPE = args[0]
const NAME = args[1]

if (TYPE === 'block' || TYPE === 'component') {
    
    // HTML
    fs.access(`./src/html/${TYPE}s/${NAME}.html`, (err) => {
        if (err) {
            fs.writeFile(`./src/html/${TYPE}s/${NAME}.html`, `{{#> layout}}{{/layout}}`, (err) => {
                if (err) console.log(chalk.red('Failed'));
                console.log(chalk.green('HTML File is created successfully.'))
            })
        } else {
            console.log(chalk.yellow('File is already exist!'))
        }
    })
    // SCSS
    fs.access(`./src/scss/${TYPE}s/_${NAME}.scss`, (err) => {
        if (err) {
            fs.writeFile(`./src/scss/${TYPE}s/_${NAME}.scss`, `.${NAME} {}`, (err) => {
                if (err) console.log(chalk.red('Failed'));
                console.log(chalk.green('File is created successfully.'))
            })
        } else {
            console.log(chalk.yellow('SCSS File is already exist!'))
        }
    })

}
