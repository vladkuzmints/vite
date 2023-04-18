# Frontend Boilerplate

## Welcome

Welcome to the twentysix interface boilerplate.

This is in essence a base build for 'new' interface projects.
This boilerplate is is configured towards larger site builds and contains elements and examples that may not be relevant to smaller projects.

The boilerplate contains a number of example partials - markup in the example partials may not meet the specific project requirements and are for illustration purposes only. Please remove any unused files from production builds, and edit the existing files as appropriate.

## Tools, packages and settings

- Node > 18.0.0  
- Vite.js 4
- ReactJs 18
- VueJS 3
- SCSS
- Typescript
- Handlebars (HTML templating)

# Configs

**./project.config.js**  -- the main FE project settings file, including the BE assets folder paths.

## Setup

- npm install
- npm run dev
- npm run build
- npm run preview

## Conventions

- Keep SASS files free from IDs as this leads to specificity conflicts. Only use classes for styling.

- Use 'descriptive', hyphenated class names, but avoid unecessarily long names - be prudent.

- Use of BEM as the main class naming technics.

- DO lint your CSS and JavaScript.

- This directory structure and categorization of partials should be maintained.

- The workflow methodology should be maintained. Do not edit files in "dist" directly.


## Sass Folder Structure

- There are 6 sub-folders in the main /src/sass folder, referenced in styles.scss in the following order:

"utilities" - Generic utilities, variables and mixins and other hardly changed files
"base" - Generic utility styles, variables and mixins, unclassed HTML elements etc.
"layout" - Structural elements/areas, grids, columns
"components" - Objects and abstractions etc.

This directory structure and categorization of partials should be maintained.
All SASS partials in sub-folders are compiled in styles.scss.

- The \_variables.scss partial is where site variables such as colors and fonts are set.
  This file is imported at the start of styles.scss and gives access to these variables in all other partials.

- The \_temp-fixes (equivalent to Harry Roberts' shame.css) partial is for any quick/emergency fixes you may need to implement for live issues etc.
  Please use sparingly! Please try and tidy it up whenever you get a chance.

## Variable Names

- Use hyphens when naming mixins, extends, classes & variables. Not camelCase or underscores.
  Use the spelling 'color' not 'colour' in variable names.

- Group variables that share relationships and commonalities. Variable names should begin with the most common shared attribute
  and become more specific from left to right. Eg: \$color-link-active: #eee;

- Regarding colors, create variables named after the colors they refer to. Eg $orange: #f09800;
  Create subsequent variables referencing these color variables. Eg: $color-border: \$orange;

## Javascript

- As good practice, avoid heavy js frameworks and libraries in case where you can use simple vanilla js. 
- Use dynamic imports. The dynamic JS components can be defined by adding 'data-component="NameOfJSComponent"' on an HTML tag. The name of component should match with the name of js file. For example, 'Header.js': 

```<div data-compomnent="Header"></div>```

## Workflow

Source html(handlbars) partials are located in src/pages/_partials/. Page templates located in src/pages/ compile into pages in the root.
All source CSS/JS/Images/Fonts files are located in subfolders in /src, and are compiled to /dist.
The default "build" task creates concatanated and unminified css and js files in the /dist directory - these files should never be edited directly.
This workflow methodology should be maintained.

## Front-end and Back-end integration

The default BE assets folder is located here: src/{Project}.Web/wwwroot/static
The compiled FE assets (CSS/JS/Images/Fonts) from the dist/ directory are copied to the above folder using webpack settings. It works in development and production modes.

**IMPORTANT:** You can change the path to the BE assets folder in ./project.config.js file

### TODO
- Create a CLI for generating initial files via npm package.
- Improve linting for JS and CSS


## SVG icons

To generate sprites:

'npm run svg'