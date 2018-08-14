const reducer = require('./reducer')
const profiler = require('./profiler')
const defaultLanguageProfiles = require('../data/languageProfiles.json')

module.exports = (text, opts) => {
  const { languageProfiles = defaultLanguageProfiles, reducers } = opts
  const allLanguages = Object.keys(languageProfiles)
  const reducedLanguages = reducer(text, reducers)

  if (reducedLanguages.length === 1) {
    return {
      language: reducedLanguages[0]
    }
  }

  const languagesIntersection = () => allLanguages.filter(lang => -1 !== reducedLanguages.indexOf(lang))
  const languages = reducedLanguages.length > 1 ? languagesIntersection : allLanguages;
  const inputProfile = profiler(text)
  const scores = {}
  inputProfile.forEach((ngram, index) => {
    languages.forEach(language => {
      const found = languageProfiles[language].findIndex(entry => entry.token === ngram.token)
      const penalty = found ? Math.abs(found - index) : 1000
      language in scores ? (scores[language] -= penalty) : (scores[language] = 0 - penalty)
    })
  })

  const sorted = Object.keys(scores)
    .map(language => ({ language: language, score: scores[language] }))
    .sort((first, second) => first.score - second.score)

  const bestMatchParts = sorted[0].language.split('_');
  return {
    language: bestMatchParts[0],
    country: bestMatchParts[1] ? bestMatchParts[1] : ''
  }
}
