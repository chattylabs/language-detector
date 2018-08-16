const defaultReducers = require('./utils/reducers')

module.exports = (text, reducers = defaultReducers) => {
  let reduced = [];
  reducers.forEach((current) => {
    if (!current.regex.test(text)) {
      return
    }
    reduced = new Set([...reduced, ...current.languages])
  })

  return reduced ? Array.from(reduced) : []
}
