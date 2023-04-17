export const navigation = (content: object) => {
  return `
    <div class="ds-close"/></div>
    <div class="ds-aside">
      <a href="/">Homepage</a>
      ${Object.keys(content)
        .map(
          (key, id) => {
            
            const path = window.location.pathname
            const isOpen = content[key].some(item => item.url === path)

             return `
              <div class="ds-nav-category">
                  <input id="cat-${id}" type="checkbox" ${isOpen ? 'checked' : ''}/>
                  <label for="cat-${id}">${key}</label>
                  <ul>
                      ${content[key]
                        .map(
                          (item) => `
                          <li ${item.url === path ? 'class="is-active"' : ''}><a href="${item.url}">${item.title}</a></li>
                      `
                        )
                        .join("")}
                  </ul>
              </div>
            `
      })
        .join("")}
    </div>`;
};
