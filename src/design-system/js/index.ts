import '../scss/styles.scss'

//
import { navigation } from'./components/navigation'
import { htmlToString } from './helpers/html-to-string'

const body = document.querySelector<HTMLElement>('body')
const el = document.querySelector<HTMLElement>('#ds-app')
body!.className = 'ds-body'

// data-context
const data = JSON.parse(`${el?.dataset.context}`)
el!.innerHTML = navigation(data)

// Gets component's code
const components: NodeListOf<HTMLElement> = document.querySelectorAll('.ds-component-box')
components.forEach((component: HTMLElement) => {
    const datestamp = new Date().getTime()
    component.insertAdjacentHTML('afterend', `
        <div class="ds-component-code">
            <input type="checkbox" id="${datestamp}"/>
            <label for="${datestamp}"><span>Show</span><span>Hide</span> code</label> 
            <pre>
                <code>${htmlToString(component?.innerHTML).trim()}</code>
            </pre>
        </div>
    `)
})