import { compileTemplate } from "../utils/index.js";
let store = {};

function setUpBindings(template) {
  // key: propName, value: id
  let iterator = template.matchAll(/.*{{(.*)}}.*/g);
  let result = iterator.next();

  while (!result.done) {
    if (result.value) {
      let element = result.value[0];
      let propName = result.value[1];
      let idMatch = element.match(/id=["|'](.*)["|']/);
      let id = idMatch[1];

      if (!store[propName]) {
        store[propName] = document.getElementById(id);
      }

      result = iterator.next();
    }
  }
}

function update(instance) {
  Object.keys(store).forEach(key => {
    store[key].innerText = instance[key];
  });
}

function render(instance) {
  const {
    selector,
    template
  } = Reflect.getMetadata("component", instance.constructor);
  const compiled = compileTemplate(template, instance);
  const appElem = document.getElementById(selector);
  appElem.innerHTML = compiled;
  setUpBindings(template);
  return Promise.resolve(1);
}

function bootstrapComponent(component) {
  const instance = new component();

  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      render(instance).then(() => {
        instance.init().then(() => update(instance));
      });
    }
  };
}

export function platformBrowserDynamic() {
  return {
    bootstrapComponent
  };
}