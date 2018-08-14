const profile = require('../src/profiler')

test('profile text', () => {
  expect(profile('hello worldy world', 12)).toEqual([
    { token: '__w', count: 2 },
    { token: '_wo', count: 2 },
    { token: 'orl', count: 2 },
    { token: 'rld', count: 2 },
    { token: 'wor', count: 2 },
    { token: '_w', count: 2 },
    { token: 'ld', count: 2 },
    { token: 'or', count: 2 },
    { token: 'rl', count: 2 },
    { token: 'wo', count: 2 },
    { token: '__h', count: 1 },
    { token: '_he', count: 1 },
  ])
})
