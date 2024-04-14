const fs = require('fs')
const dir = process.argv[2] ?? 'bi'

const styles = fs.readdirSync(dir).filter(name => {
  let result = name.endsWith('.svg')
  if (result) {
    let path = `${dir}/${name}`
    let content = fs.readFileSync(path, 'utf-8')
    if (content.includes('width="16" height="16"')) fs.writeFileSync(path, content.replace(
      ` width="16" height="16" fill="currentColor" class="bi bi-${name.slice(0, -4)}"`,
      ''
    ))
  }
  return result
}).map(name =>
`.bi-${name.slice(0, -4)}{--i: url(${name})}`)
fs.writeFileSync(dir + '/style.css', `/*!
* Bootstrap Icons v1.11.3 (https://icons.getbootstrap.com/)
* Copyright 2019-2024 The Bootstrap Authors
* Licensed under MIT (https://github.com/twbs/icons/blob/main/LICENSE)
*/
.bi{
-webkit-mask-image: var(--i);
mask-image: var(--i);
-webkit-mask-position: center;
mask-position: center;
-webkit-mask-repeat: no-repeat;
mask-repeat: no-repeat;
display: inline-block;
}
.bi::before {
content: "\\25A2";
background: currentColor;
line-height: 1;
font-family: serif;
font-style: normal !important;
}
${styles.join('\n')}
`)
