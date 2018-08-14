test('it exports detector as default', () => {
  const detect = require('../src')
  expect(detect).toBeDefined
  expect(typeof detect).toBe('function')
})

test('it exports the base language profiles', () => {
  const profiles = require('../src').languageProfiles
  expect(profiles).toBeDefined
  expect(typeof profiles).toBe('object')
})

test('it exports the base reducers', () => {
  const reducers = require('../src').reducers
  expect(reducers).toBeDefined
  expect(Array.isArray(reducers)).toBe(true)
})

test('it exports the reducer', () => {
  const reducer = require('../src').reducer
  expect(reducer).toBeDefined
  expect(typeof reducer).toBe('function')
})

test('it exports the profiler', () => {
  const profiler = require('../src').profiler
  expect(profiler).toBeDefined
  expect(typeof profiler).toBe('function')
})

test('it exports the trainer', () => {
  const trainer = require('../src').trainer
  expect(trainer).toBeDefined
  expect(typeof trainer).toBe('function')
})

