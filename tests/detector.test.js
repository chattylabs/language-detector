const detect = require('../src')
const languageProfilesMock = require('./__mocks__/languageProfiles.json')

test('allows to pass custom profiled data', () => {
  expect(detect('hello worldy world', {
    languageProfiles: languageProfilesMock,
    reducers: []
  })).toEqual({
    language: 'en',
    country: 'GB'
  })
})

test('detects english', () => {
  expect(detect("what's up dude")).toEqual({
    language: 'en',
    country: ''
  })
})

test('detects spanish', () => {
  expect(detect("que pasa tío")).toEqual({
    language: 'es',
    country: ''
  })
})
