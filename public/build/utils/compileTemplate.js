export function compileTemplate(template, context) {
  return template.replace(/{{(.*)}}/g, function (x) {
    let str = x.replace("{{", "").replace("}}", "");

    if (str.includes(".")) {
      return str.split(".").reduce((prev, next) => prev[next], context);
    } else {
      return context[str];
    }
  });
}