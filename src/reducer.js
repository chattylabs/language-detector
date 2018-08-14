const defaultReducers = require('./utils/reducers')

module.exports = (text, reducers = defaultReducers) => {
  let reduced;
  reducers.forEach((current) => {
    if (!current.regex.test(text)) {
      return
    }
    const currentLanguages = new Set(current.languages)
    if (!reduced) {
      reduced = currentLanguages
    } else {
      reduced = new Set([...reduced].filter(lang => currentLanguages.has(lang)));
    }
  })

  return reduced ? Array.from(reduced) : []
}
