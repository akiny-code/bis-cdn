const { generateFonts, FontAssetType, OtherAssetType } = require('@twbs/fantasticon')

generateFonts({
  inputDir: 'pi',
  outputDir: 'pi/font',
  name: 'polaris-icons',
  fontTypes: [FontAssetType.WOFF2, FontAssetType.WOFF],
  assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML],
  templates: {
    css: './pif.hbs',
  },
  prefix: 'pi',
}).then(() => {
  require('fs').renameSync('pi/font/polaris-icons.css', 'pi/font/style.css')
})
