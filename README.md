# Language Detector

This package aids the detection of the language of a given text.

End goal is to detect any text, no matter how short or obscure (think messages from Twitter, WhatsApp, Instagram, SMS, etc) and return an object describing the language that best matches it.

```
{
  language: 'en',
  country: 'gb'
}
```

This is obtained with a combination of "reducing" and "matching". Given a piece of text we can reduce it to a set of potential languages by checking for common patterns (see `src/utils/reducers.js`), additionally we can match the n-grams of sed text to a set of pre-compiled language profiles generated through "learning" (processing known samples).


## Usage

### With built in language detection

Usage:

```
const detect = require('@chattylabs/language-detection')
const result = detect('some text to detect')
const language = result.language
```

### With custom language profiles

```
const detect = require('@chattylabs/language-detection')
const customLanguageProfiles = require('../path/to/data/languageProfiles.json')

const result = detect(text, {
  languageProfiles: customLanguageProfiles,
  reducers: customReducers
})
const language = result.language
```

NOTE: the languages you provide will be the set used, you could additionally merge them with our base:

```
const combinedProfiles = {
  ...require('@chattylabs/language-detection').languageProfiles,
  ...customLanguageProfiles
}
```

#### Generating your own language profiles

You will need to build a "training" script, which analysis all your sample data and generates the language profiles object. 

Your sample data should be a set of txt files containing as much text as possible and similar to the text you will be detecting. Do this per locale or language. e.g. `data/samples/en.txt`, `data/samples/fr.txt`, `data/samples/cn.txt` or `data/samples/en_GB.txt` (for country indentifier locale code must use underscore _ separator)

```
// bin/train.js
const train = require('@chattylabs/language-detection').train
train('./path/to/custom/samples/*.txt', './path/to/custom/export/languageProfiles.json')
```

then execute it via the cli `node bin/training.js` or via an npm script.

NOTE: filenames determine the language, but using filename such as en_GB will result in the response splitting this out into language and country.


### With custom reducers

```
const detect = require('@chattylabs/language-detection')
const customLanguageProfiles = require('../path/to/data/languageProfiles.json')
const customReducers = require('../path/to/your/reducers')

const result = detect(text, {
  languageProfiles: customLanguageProfiles,
  reducers: customReducers
})
const language = result.language
```

#### Writing reducers

Reducers are a collection of objects which map a regex to an array of languages. They help reduce the amount of languages we need to run the n-gram matching on, by finding intersections of known patterns.

So for example, imagine we provide the following reducers:

```
# /path/to/data/languageProfiles.json
module.exports = [
  {
    regex: /[ñ]+/i,
    languages: ['es', 'gn', 'gl']
  },
  {
    regex: /[á|é|í|ó|ú]+/i,
    languages: ['fr', 'es', 'it', 'cn', 'nl', 'fo', 'is', 'pt', 'vi', 'cy', 'el', 'gl']
  }
]
```

From the above, we would reduce the words "Alimentación de niño" to the languages ['es', 'gl'], and only run n-gram matching on those. If the reducer were to just return 1 language, that would be our result.

NOTE: providing your own reducers will override the base ones. If you chose not to use them, but do use your own language profiles, languages not in your profiles will not be taken into account.

You can also combine your own reducers with the base ones:

```
const combinedProfiles = {
  ...require('@chattylabs/language-detection').reducers,
  ...customReducers
}
```


## References 

- https://blog.twitter.com/engineering/en_us/a/2015/evaluating-language-identification-performance.html
- https://shuyo.wordpress.com/2012/02/21/language-detection-for-twitter-with-99-1-accuracy/
- http://cloudmark.github.io/Language-Detection/
