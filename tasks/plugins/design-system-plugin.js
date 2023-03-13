import project from '../../project.config'

const DesignSystemPlugin = () => {
    return {
      name: 'design-system-plugin',
      transformIndexHtml: {
        enforce: 'pre',
        transform(html) {
          let markup = `{{> html/_partials/master/_head }}${html}{{> html/_partials/master/_script }}${project.story ? '{{> design-system/core}}' : '' }{{> html/_partials/master/_foot }}`
          return html = markup
        }
      },
    }
  }

  export default DesignSystemPlugin