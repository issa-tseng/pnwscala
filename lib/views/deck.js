(function() {
  var Deck, DeckTemplate, DeckView, DomView, Templater, keys, markup, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, DomView = _ref.DomView;

  Deck = require('../models/deck').Deck;

  markup = require('./deck.html');

  DeckTemplate = (function(_super) {
    __extends(DeckTemplate, _super);

    function DeckTemplate() {
      _ref1 = DeckTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    DeckTemplate.prototype._dom = function() {
      return $(markup);
    };

    DeckTemplate.prototype._binding = function() {
      var binding;
      binding = DeckTemplate.__super__._binding.call(this);
      binding.find('.deck').classGroup('slide-').from('slide');
      binding.find('.slides').render(this.options.app).from('slides');
      binding.find('.byLine').classed('active').from('slide').flatMap(function(slide) {
        return slide > 0;
      });
      return binding.find('.subject').text().from('subject');
    };

    return DeckTemplate;

  })(Templater);

  keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  DeckView = (function(_super) {
    __extends(DeckView, _super);

    function DeckView() {
      _ref2 = DeckView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    DeckView.prototype.templateClass = DeckTemplate;

    DeckView.prototype._wireEvents = function() {
      var _this = this;
      return $(document).on('keydown', function(event) {
        if (event.isDefaultPrevented()) {
          return;
        }
        if (event.which === keys.left) {
          return _this.subject.previous();
        } else if (event.which === keys.up) {
          return _this.subject.previousSlide();
        } else if (event.which === keys.right) {
          return _this.subject.advance();
        } else if (event.which === keys.down) {
          return _this.subject.advanceSlide();
        }
      });
    };

    return DeckView;

  })(DomView);

  util.extend(module.exports, {
    DeckTemplate: DeckTemplate,
    DeckView: DeckView,
    registerWith: function(library) {
      return library.register(Deck, DeckView);
    }
  });

}).call(this);
