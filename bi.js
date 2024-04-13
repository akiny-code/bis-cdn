const fs = require('fs')
const dir = process.argv[2] ?? 'bootstrap-icons-111'

const styles = fs.readdirSync(dir).filter(name => {
  let result = name.endsWith('.svg')
  if (result) {
    let path = `${dir}/${name}`
    fs.writeFileSync(path, fs.readFileSync(path, 'utf-8').replace(
      ` width="16" height="16" fill="currentColor" class="bi bi-${name.slice(0, -4)}"`,
      ''
    ))
  }
  return result
}).map(name =>
`.bi-${name.slice(0, -4)}{
-webkit-mask-image: url(${name});
mask-image: url(${name});
}`)
fs.writeFileSync(dir + '/style.css', `.bi{
-webkit-mask-position: center;
mask-position: center;
-webkit-mask-repeat: no-repeat;
mask-repeat: no-repeat;
}
.bi::before {
content: "\\25A2";
background: currentColor;
line-height: 1;
font-family: serif;
font-style: normal;
}
${styles.join('\n')}
`)
