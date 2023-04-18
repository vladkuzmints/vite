import "../scss/styles.scss";

// TODO: Implement highlight library
// import hl from 'highlight.js'
// Theme link: https://github.com/highlightjs/highlight.js/tree/55f68f72be2cb69d14561353ad851d6b2242dfcc/src/styles
// import 'highlight.js/styles/atom-one-dark-reasonable.css'


import { navigation } from "./components/navigation";
import { htmlToString } from "./helpers/html-to-string";

const BREAKPOINT = 768
let isMobile = window.innerWidth < BREAKPOINT

const body = document.querySelector<HTMLElement>("body");
const el = document.querySelector<HTMLElement>("#ds-app");

let isFullWidth = sessionStorage.getItem('dsIsFullWidth') === 'true' ? true : false

if (body) {
  body.className = `ds-body ${isFullWidth ? 'is-aside-hidden' : ''}`;
}

// data-context
const data = JSON.parse(`${el?.dataset.context}`);
if (el) {
  el.innerHTML = navigation(data);
  const close = el.querySelector<HTMLElement>('.ds-close')
  close.addEventListener('click', () => {
    isFullWidth = !isFullWidth
    body.classList[isFullWidth ? 'add' : 'remove']('is-aside-hidden')
    sessionStorage.setItem("dsIsFullWidth", `${isFullWidth}`);
  })
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
                <code>${htmlToString(component?.innerHTML.trim())}</code>
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

// Resize
window.addEventListener('resize', () => {
  if (window.innerWidth < BREAKPOINT && !isMobile) {
    body.classList.add('is-aside-hidden')
    isMobile = true
  } else if (window.innerWidth >= BREAKPOINT && isMobile) {
    body.classList.remove('is-aside-hidden')
    isMobile = false
  }
})
