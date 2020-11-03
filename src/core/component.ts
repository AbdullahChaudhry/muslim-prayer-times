export function Component(options: any) {
  return function decorator(cls: any) {
    Reflect.defineMetadata("component", options, cls);
  };
}