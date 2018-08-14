const glob = require('glob')
const path = require('path')
const fs = require('fs')
const profile = require('./profiler')

module.exports = (input = './data/resources/*.txt', output = './data/languageProfiles.json') => {
  const profiles = {}
  glob(input, (er, files) => {
    files.forEach(file => {
      const lang = path.basename(file, '.txt')
      const text = fs.readFileSync(file, 'utf8')
      profiles[lang] = profile(text)
    })
    fs.writeFileSync(output, JSON.stringify(profiles))
  })
}
