export function renderTemplate(template: string, context: any) {
  return template.replace(/{{(.*)}}/g, function(x) {
    let newStr = x.replace("{{", "").replace("}}", "")
    return context[newStr]
  })
}