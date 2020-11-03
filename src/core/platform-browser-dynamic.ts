import { compileTemplate } from "../utils";

export function platformBrowserDynamic() {
  function bootstrapComponent(component: any) {
  
    function render(instance: any) {
      const metadata = Reflect.getMetadata("component", instance.constructor);
  
      const selector = metadata.selector;
      const template = metadata.template;
      const HTMLMarkup = compileTemplate(template, instance);
      const appElem: HTMLElement = <HTMLElement>document.getElementById(selector);
      appElem.innerHTML = HTMLMarkup;
    }
  
    function initComponent(component: any) {
      const instance = new component();
      instance.init().then(() => render(instance));
    }
  
    function init(component: any) {
      document.onreadystatechange = function () {
        if (document.readyState === "complete") {
          initComponent(component);
        }
      };
    }
  
    init(component)
  }
  
  return {
    bootstrapComponent
  }
}