import copy from "rollup-plugin-copy";
import project from "../project.config.js";


export default {
    plugins: [
        copy({
            targets: [
              { src: `dist/${project.assetsDir}`, dest: `${project.copyDir}/` }
            ]
        })
    ]
}