const fs = require('fs')
const parse = require('csv-parse')
const request = require('sync-request')
const cheerio = require('cheerio')
const sanitize = require('../src/utils/sanitizer')

const links = []
fs.createReadStream('./data/resources/twitter/data.tsv')
  .pipe(
    parse({
      delimiter: '\t',
    })
  )
  .on('data', row => {
    const lang = row[0]
    const twitterId = row[1]
    const url = `https://twitter.com/user/status/${twitterId}`
    links.push({
      url,
      lang
    })
  })
  .on('end', () => {
    let contents = {}
    links.forEach(link => {
      const { url, lang } = link
      // we do it synchronously to avoid tweeter blocking us
      const res = request('GET', url);
      if (res.statusCode === 200) {
        const html = res.getBody('utf8')
        const $ = cheerio.load(html)
        const tweet = sanitize($('.tweet .js-tweet-text-container').text())
        const content = lang in contents ? `${contents[lang]} ${tweet}` : tweet
        contents[lang] = content
      }
    })

    Object.keys(contents).forEach(lang => {
      const file = `./data/resources/${lang}.txt`
      // @NOTE switch between fs.writeFile and fs.appendFileSync as needed
      fs.appendFileSync(file, ` ${contents[lang]}`)
    })
  })
