const reduce = require('../src/reducer')

const assertTextReducesToLanguages = (text, expectedLanguages) => {
  return expect(reduce(text).sort()).toEqual(expectedLanguages.sort())
}

test('reduces texts with ñ ignoring case', () => {
  assertTextReducesToLanguages('bua niÑo', ['es', 'gn', 'gl'])
})

test('Dutch if there is ik', () => {
  assertTextReducesToLanguages('Ik kan er nooit tegen als mensen me negeren.', ['nl'])
  assertTextReducesToLanguages('kan ik er nooit tegen als mensen me negeren.', ['nl'])
  // note that it should not catch ik within a word
  assertTextReducesToLanguages('fik er nooit tegen als mensen me negeren.', [])
})

test('German if there is ich or a letter ß', () => {
  assertTextReducesToLanguages('Aha ich seh angeblich', ['de'])
  assertTextReducesToLanguages('Ich seh angeblich', ['de'])
  assertTextReducesToLanguages('bIch bich', [])
})

test('German if there is the letter ß', () => {
  assertTextReducesToLanguages('seh angeblich süß aus', ['de'])
})

test('Polish if there is czy', () => {
  assertTextReducesToLanguages('Czy mogłbym zasnąć w przedmieściach Twoich myśli?', ['pl'])
})

test('Polish if there is letters Ł, ń, ś or ź', () => {
  assertTextReducesToLanguages('mogłbym Ła', ['pl'])
  assertTextReducesToLanguages('ńa', ['pl'])
  assertTextReducesToLanguages('śa', ['pl'])
  assertTextReducesToLanguages('źa', ['pl'])
})

test('Scandinavian if there is a letter å', () => {
  assertTextReducesToLanguages('Så skal jeg bare finde ud', ['nb', 'nn', 'fo', 'is', 'da', 'sv'])
})

test('Danish if there is af', () => {
  assertTextReducesToLanguages('skal jeg bare finde ud af', ['da'])
})

test('Norwegian if there is nei', () => {
  assertTextReducesToLanguages('nei vi som har finale ', ['nb', 'nn'])
})

test('Swedish if there is och', () => {
  assertTextReducesToLanguages('fb och du tog', ['sv'])
})

test('Turkish if there is a letter ı (i without point) or ğ or ş', () => {
  assertTextReducesToLanguages('En büyük hatayı yaptım', ['tr'])
  assertTextReducesToLanguages('Çok doğru', ['tr'])
})

test('Romanian if there is a letter ă or ș or ț (although ă is also used in Vietnamese as ş is in Turkish)', () => {
  assertTextReducesToLanguages('Încântat de șa cunoștință', ['ro', 'tr', 'vi'])
})
