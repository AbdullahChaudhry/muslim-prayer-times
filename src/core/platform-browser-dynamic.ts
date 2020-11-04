import { compileTemplate } from "../utils";

function render(instance: any): Promise<any> {
  const { selector, template } = Reflect.getMetadata("component", instance.constructor);
  const compiled = compileTemplate(template, instance);
  const appElem: HTMLElement = <HTMLElement>document.getElementById(selector);

  appElem.innerHTML = compiled;
  return Promise.resolve(1)
}

function bootstrapComponent(component: any) {
  const instance = new component();

  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      render(instance).then(() => {
        instance.init().then(() => render(instance))
      })
    }
  };    
}

export function platformBrowserDynamic() {
  return {
    bootstrapComponent
  }
}