{ util } = require('janus')

Deck = require('../models/deck').Deck
Slides = require('../models/slide').Slides
slides = require('./slides')

module.exports = new Deck(
  slides: new Slides( new slide.Model() for slide in slides )
)

