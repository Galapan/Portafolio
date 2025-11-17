const { iconsPlugin, dynamicIconsPlugin } = require('@egoist/tailwindcss-icons')

module.exports = {
  plugins: [iconsPlugin(), dynamicIconsPlugin()]
}