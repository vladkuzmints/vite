import "../scss/styles.scss";

// TODO: Implement highlight library
// import hl from 'highlight.js'
// Theme link: https://github.com/highlightjs/highlight.js/tree/55f68f72be2cb69d14561353ad851d6b2242dfcc/src/styles
// import 'highlight.js/styles/atom-one-dark-reasonable.css'


import { navigation } from "./components/navigation";
import { htmlToString } from "./helpers/html-to-string";

const body = document.querySelector<HTMLElement>("body");
const el = document.querySelector<HTMLElement>("#ds-app");
if (body) {
  body.className = "ds-body";
}

// data-context
const data = JSON.parse(`${el?.dataset.context}`);
if (el) {
  el.innerHTML = navigation(data);
}

// Gets component's code
const components: NodeListOf<HTMLElement> =
  document.querySelectorAll(".ds-component-box");
components.forEach((component: HTMLElement) => {
  const datestamp = Math.floor(
    Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9)
  );
  component.insertAdjacentHTML(
    "afterend",
    `
        <div class="ds-component-code">
            <input type="checkbox" id="${datestamp}"/>
            <label for="${datestamp}"><span>Show</span><span>Hide</span> code</label> 
            <pre>
                <code>${htmlToString(component?.innerHTML).trim()}</code>
            </pre>
        </div>
    `
  );

  // TODO: Highlight library
  // const parent = component.parentNode as HTMLElement
  // if (parent) {
  //   hl.highlightElement(parent.querySelector('pre') as HTMLElement)
  // }

});
