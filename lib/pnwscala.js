(function() {
  var App, Library, app, storeLibrary, util, viewLibrary, _ref, _ref1;

  _ref = require('janus'), util = _ref.util, Library = _ref.Library, (_ref1 = _ref.application, App = _ref1.App);

  viewLibrary = new Library();

  storeLibrary = new Library();

  app = new App({
    views: viewLibrary,
    stores: storeLibrary
  });

}).call(this);
