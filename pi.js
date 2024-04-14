const fs = require('fs')
const dir = process.argv[2] ?? 'pi'

const styles = fs.readdirSync(dir).filter(name => {
  let result = name.endsWith('.svg')
  if (result) {
    let path = `${dir}/${name}`
    let content = fs.readFileSync(path, 'utf-8')
    if (content.includes('viewBox="0')) fs.writeFileSync(path, content.replace(
      'viewBox="0 0 20 20"',
      'viewBox="2 2 16 16"'
    ))
  }
  return result
}).map(name => {
  if (name.endsWith('Icon.svg')) {
    let name2 = name.slice(0, -8) + '.svg'
    fs.renameSync(`${dir}/${name}`, `${dir}/${name2}`)
    return name2
  }
  return name
}).map(name =>
`.pi-${name.slice(0, -4)}{--i: url(${name})}`)
fs.writeFileSync(dir + '/style.css', `/*!
* @shopify/polaris-icons 9.0.0 (https://polaris-icons.shopify.com)
* Copyright (c) 2017-present Shopify Inc.
* Licensed under MIT (https://unpkg.com/browse/@shopify/polaris-icons@9.0.0/LICENSE.md)
*/
.pi{
-webkit-mask-image: var(--i);
mask-image: var(--i);
-webkit-mask-position: center;
mask-position: center;
-webkit-mask-repeat: no-repeat;
mask-repeat: no-repeat;
display: inline-block;
}
.pi::before {
content: "\\25A2";
background: currentColor;
line-height: 1;
font-family: serif;
font-style: normal !important;
}
${styles.join('\n')}
`)
