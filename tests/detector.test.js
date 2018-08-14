const detect = require('../src')
const languageProfilesMock = require('./__mocks__/languageProfiles.json')

test('detects english', () => {
  expect(detect('hello worldy world', {
    languageProfiles: languageProfilesMock,
    reducers: []
  })).toEqual({
    language: 'en',
    country: 'GB'
  })
})

test('detects spanish', () => {
  expect(detect('q tal tío', {
    languageProfiles: languageProfilesMock,
    reducers: []
  })).toEqual({
    language: 'es',
    country: ''
  })
})
