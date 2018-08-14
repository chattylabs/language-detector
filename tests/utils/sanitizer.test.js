const sanitize = require('../../src/utils/sanitizer')

test('does not manipulate valid strings', () => {
  expect(sanitize('hello world')).toEqual('hello world')
})

test('lower cases text', () => {
  expect(sanitize('Hello World')).toEqual('hello world')
})

test('trims and removes spaces', () => {
  expect(sanitize(' hello  world   spaced  ')).toEqual('hello world spaced')
})

test('removes numbers', () => {
  expect(sanitize('Hello1 World23 56')).toEqual('hello world')
})

test('remove all punctuation except apostrophes', () => {
  expect(sanitize("Hello;. |_, World's!?")).toEqual("hello world's")
})

test('remove @ mentions', () => {
  expect(sanitize("@dan hey dude")).toEqual("hey dude")
})

test('removes html', () => {
  expect(sanitize("<i class='test'>hey dude</a>")).toEqual("hey dude")
})

test('removes hyperlinks', () => {
  expect(sanitize("hello https://google.com/test world")).toEqual("hello world")
})

test('does not remove foreign chars', () => {
  expect(sanitize("فيه فرق بين اهل")).toEqual("فيه فرق بين اهل")
})

