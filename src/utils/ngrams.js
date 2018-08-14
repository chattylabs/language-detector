const sanitize = require('./sanitizer')

module.exports = (text, size = 2) => {
  const ngrams = []
  const content = sanitize(text)
  const words = content.split(' ')

  const addToken = options => {
    const { word, start, length, size, pad, padChar = '_' } = options
    const slice = word.substring(start, length)
    const token = pad === 'start' ? slice.padStart(size, padChar) : slice.padEnd(size, padChar)
    const exiting = ngrams.find(obj => obj.token === token)
    if (exiting) {
      exiting.count++
    } else {
      ngrams.push({
        token,
        count: 1,
      })
    }
  }

  words.forEach(word => {
    // start of word ngrams
    const limit = size > word.length ? word.length + 1 : size
    for (let i = 1; i < limit; i++) {
      addToken({ word, start: 0, length: i, size, pad: 'start' })
    }
    // rest of word ngrams
    for (let i = 0; i < word.length; i++) {
      addToken({ word, start: i, length: i + size, size, pad: 'end' })
    }
  })

  return ngrams
}
