export const navigation = (content: any) => {
    return `
        <a href="/">Homepage</a>
        ${Object.keys(content).map((key) => `
            <h3>${key}</h3>
            <ul>
                ${content[key].map((item: any) => `
                    <li><a href="${item.url}">${item.title}</a></li>
                `).join('')}
            </ul>
        `).join('')}
        <div class="ds-close"></div>
    `
}