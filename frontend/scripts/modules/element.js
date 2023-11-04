// from https://github.com/JaimeObregon/gobiernovasco.marketing/blob/main/httpdocs/modules/element.js

// Véase https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings
const identity = (strings, ...values) => {
  return String.raw({ raw: strings }, ...values)
}

const html = identity
const css = identity

export { html, css }
