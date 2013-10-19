(function() {
  var App, Library, app, deck, deckView, jConsole, lib, person, slide, slides, stdlib, storeLibrary, util, viewLibrary, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;

  _ref = require('janus'), util = _ref.util, Library = _ref.Library, (_ref1 = _ref.application, App = _ref1.App);

  viewLibrary = new Library();

  storeLibrary = new Library();

  app = new App({
    views: viewLibrary,
    stores: storeLibrary
  });

  window.app = app;

  stdlib = require('./views/stdlib/stdlib');

  for (_i = 0, _len = stdlib.length; _i < _len; _i++) {
    lib = stdlib[_i];
    lib.registerWith(viewLibrary);
  }

  jConsole = require('janus-console');

  jConsole.views.registerWith(viewLibrary);

  jConsole.actions.registerWith(storeLibrary, 'local');

  jConsole.setHook(app);

  require('./views/deck').registerWith(viewLibrary);

  slides = require('./slides/slides');

  for (_j = 0, _len1 = slides.length; _j < _len1; _j++) {
    slide = slides[_j];
    slide.registerWith(viewLibrary);
  }

  person = require('./views/person');

  for (_k = 0, _len2 = slides.length; _k < _len2; _k++) {
    slide = slides[_k];
    person.registerWith(viewLibrary);
  }

  deck = require('./slides/deck');

  deckView = app.getView(deck);

  $('.main').append(deckView.artifact());

  deckView.wireEvents();

}).call(this);
