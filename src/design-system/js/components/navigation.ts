export const navigation = (content: object) => {
  return `
        <a href="/">Homepage</a>
        ${Object.keys(content)
          .map(
            (key, id) => `
            <div class="ds-nav-category">
                <input id="cat-${id}" type="checkbox"/>
                <label for="cat-${id}">${key}</label>
                <ul>
                    ${content[key]
                      .map(
                        (item) => `
                        <li><a href="${item.url}">${item.title}</a></li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        `
          )
          .join("")}
        <div class="ds-close"></div>
    `;
};
