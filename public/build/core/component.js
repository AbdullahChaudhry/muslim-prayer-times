export function Component(options) {
  return function decorator(cls) {
    Reflect.defineMetadata("component", options, cls);
  };
}