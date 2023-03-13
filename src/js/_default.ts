// Dynamically imported components
// This is a common function to import scripts dynamically based on data attrubite
// Example: <div data-module="{{ A component name that matches the component file name from js/Components folder }}">

export const components: NodeListOf<HTMLElement> =
  document.querySelectorAll('[data-module]');

for (let i = 0; i < components.length; i++) {
  const el = components[i];
  const value = el?.dataset.module;
  const modules = value?.split(" ").map((item) => item.trim());
  if (modules) {
    for (let name = 0; name < modules.length; name++) {
      import(`./modules/${modules[name]}.ts`)
        .then((Module) => {
          Module.default(el);
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  }
}
