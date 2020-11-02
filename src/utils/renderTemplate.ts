export function renderTemplate(template: string, context: any) {
  return template.replace(/{{(.*)}}/g, function(x) {
    let str = x.replace("{{", "").replace("}}", "")
    if (str.includes(".")) {
      return str.split(".").reduce((prev: any, next: any) => prev[next], context)
    } else {
      return context[str]
    }
  })
}