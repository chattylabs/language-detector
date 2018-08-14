const striptags = require('striptags')

module.exports = text => {
  return (
    striptags(text)
      // remove urls
      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
      // remove @ mentions
      .replace(/@([a-zA-Z0-9\_\.]+)/gi, '')
      // remove all numbers
      .replace(/[0-9]/g, ' ')
      // remove all punctuation except apostrophes
      .replace(/[!@#$%^&*()-=_+|;:",.<>?]/g, ' ')
      // remove duplicate spaces
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .trim()
  )
}
