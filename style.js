const fs = require('fs')
const dir = process.argv[2] ?? 'polaris-icons@9'
const pi = process.argv[3] ?? 'pi'

const styles = fs.readdirSync(dir).filter(name => {
  let result = name.endsWith('.svg')
  if (result && pi === 'pi') {
    let path = `${dir}/${name}`
    fs.writeFileSync(path, fs.readFileSync(path, 'utf-8').replace(
      'viewBox="0 0 20 20"',
      'viewBox="2.5 2.5 15 15"'
    ))
  }
  return result
}).map(name =>
`.${pi}${name.slice(0, -8).replace(/([A-Z])/g, "-$1").toLowerCase()}{
-webkit-mask-image: url(${name});
mask-image: url(${name});
}`)
fs.writeFileSync(dir + '/style.css', `.${pi}{
-webkit-mask-position: center;
mask-position: center;
}
.${pi}::before {
content: "\\25A2";
background: currentColor;
line-height: 1;
font-family: serif;
font-style: normal;
}
${styles.join('\n')}
`)
