const fs = require('fs')
const dir = process.argv[2] ?? 'polaris-icons@9'
const pi = process.argv[3] ?? 'pi'

const styles = fs.readdirSync(dir).filter(name => name.endsWith('.svg')).map(name =>
`.${pi}${name.slice(0, -8).replace(/([A-Z])/g, "-$1").toLowerCase()}{
-webkit-mask-image: url(${name});
mask-image: url(${name});
}`)
fs.writeFileSync(dir + '/style.css', `.${pi}{
-webkit-mask-position: center;
mask-position: center;
line-height: 1;
font-family: serif;
}
.${pi}::before {
content: "\\25A2";
background: currentColor;
}
${styles.join('\n')}
`)
