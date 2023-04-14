import "../scss/styles.scss";

import hl from 'highlight.js'
import 'highlight.js/styles/github.css';

//
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
  hl.highlightElement(component.parentNode.querySelector('pre'))
});
