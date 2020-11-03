export function Component(options: any) {
  return function decorator(klass: any) {
    Reflect.defineMetadata("component", options, klass);
  };
}