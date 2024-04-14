const fs = require('fs')
const dir = process.argv[2] ?? 'pi'

const styles = fs.readdirSync(dir).filter(name => {
  let result = name.endsWith('.svg')
  if (result) {
    let path = `${dir}/${name}`
    fs.writeFileSync(path, fs.readFileSync(path, 'utf-8').replace(
      'viewBox="0 0 20 20"',
      'viewBox="2 2 16 16"'
    ))
  }
  return result
}).map(name =>
`.pi${name.slice(0, -8).replace(/([A-Z])/g, "-$1").toLowerCase()}{
-webkit-mask-image: url(${name});
mask-image: url(${name});
}`)
fs.writeFileSync(dir + '/style.css', `/*!
* @shopify/polaris-icons 9.0.0 (https://polaris-icons.shopify.com)
* Copyright (c) 2017-present Shopify Inc.
* Licensed under MIT (https://unpkg.com/browse/@shopify/polaris-icons@9.0.0/LICENSE.md)
*/
.pi{
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
