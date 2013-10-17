(function() {
  var Deck, Slides, slide, slides, util;

  util = require('janus').util;

  Deck = require('../models/deck').Deck;

  Slides = require('../models/slide').Slides;

  slides = require('./slides');

  module.exports = new Deck({
    slides: new Slides((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = slides.length; _i < _len; _i++) {
        slide = slides[_i];
        _results.push(new slide.Model());
      }
      return _results;
    })())
  });

}).call(this);
