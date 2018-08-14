const reduce = require('../src/reducer')

test('reduces texts with vowel accents', () => {
  expect(reduce('some accént')).toEqual(['fr', 'es', 'it', 'cn', 'nl', 'fo', 'is', 'pt', 'vi', 'cy', 'el'])
})

test('reduces texts with ñ ignoring case', () => {
  expect(reduce('bua niÑo')).toEqual(['es', 'gn', 'gl'])
})

test('returns the smallest intersection set of matches', () => {
  expect(reduce('buá niño', [
    {
      regex: /[ñ]+/i,
      languages: ['es', 'gn', 'gl']
    },
    {
      regex: /[á]+/i,
      languages: ['es']
    }
  ])).toEqual(['es'])
})
