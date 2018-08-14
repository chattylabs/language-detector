const ngrams = require('../../src/utils/ngrams')

test('overlapping bi-grams', () => {
  expect(ngrams('hello worldy world')).toEqual([
    { token: '_h', count: 1 },
    { token: 'he', count: 1 },
    { token: 'el', count: 1 },
    { token: 'll', count: 1 },
    { token: 'lo', count: 1 },
    { token: 'o_', count: 1 },
    { token: '_w', count: 2 },
    { token: 'wo', count: 2 },
    { token: 'or', count: 2 },
    { token: 'rl', count: 2 },
    { token: 'ld', count: 2 },
    { token: 'dy', count: 1 },
    { token: 'y_', count: 1 },
    { token: 'd_', count: 1 },
  ])
})

test('overlapping tri-grams', () => {
  expect(ngrams('hello worldy world', 3)).toEqual([
    { token: '__h', count: 1 },
    { token: '_he', count: 1 },
    { token: 'hel', count: 1 },
    { token: 'ell', count: 1 },
    { token: 'llo', count: 1 },
    { token: 'lo_', count: 1 },
    { token: 'o__', count: 1 },
    { token: '__w', count: 2 },
    { token: '_wo', count: 2 },
    { token: 'wor', count: 2 },
    { token: 'orl', count: 2 },
    { token: 'rld', count: 2 },
    { token: 'ldy', count: 1 },
    { token: 'dy_', count: 1 },
    { token: 'y__', count: 1 },
    { token: 'ld_', count: 1 },
    { token: 'd__', count: 1 },
  ])
})

test('overlapping quad-grams', () => {
  expect(ngrams('hello worldy world', 4)).toEqual([
    { token: '___h', count: 1 },
    { token: '__he', count: 1 },
    { token: '_hel', count: 1 },
    { token: 'hell', count: 1 },
    { token: 'ello', count: 1 },
    { token: 'llo_', count: 1 },
    { token: 'lo__', count: 1 },
    { token: 'o___', count: 1 },
    { token: '___w', count: 2 },
    { token: '__wo', count: 2 },
    { token: '_wor', count: 2 },
    { token: 'worl', count: 2 },
    { token: 'orld', count: 2 },
    { token: 'rldy', count: 1 },
    { token: 'ldy_', count: 1 },
    { token: 'dy__', count: 1 },
    { token: 'y___', count: 1 },
    { token: 'rld_', count: 1 },
    { token: 'ld__', count: 1 },
    { token: 'd___', count: 1 },
  ])
})

test('handles words shorter than ngram length', () => {
  expect(ngrams('hi', 4)).toEqual([
    { token: '___h', count: 1 },
    { token: '__hi', count: 1 },
    { token: 'hi__', count: 1 },
    { token: 'i___', count: 1 },
  ])
  expect(ngrams('u', 4)).toEqual([{ token: '___u', count: 1 }, { token: 'u___', count: 1 }])
})

test('ignores punctuation', () => {
  expect(ngrams('hi?!', 4)).toEqual([
    { token: '___h', count: 1 },
    { token: '__hi', count: 1 },
    { token: 'hi__', count: 1 },
    { token: 'i___', count: 1 },
  ])
})
