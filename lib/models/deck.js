(function() {
  var Deck, Model, Varying, attribute, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, (_ref1 = _ref.varying, Varying = _ref1.Varying);

  Deck = (function(_super) {
    var _ref3;

    __extends(Deck, _super);

    function Deck() {
      _ref2 = Deck.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Deck.attribute('slide', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref3 = _Class.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      _Class.prototype["default"] = function() {
        return 0;
      };

      return _Class;

    })(attribute.NumberAttribute));

    Deck.bind('current').fromVarying(function() {
      return Varying.combine([this.watch('slides'), this.watch('slide')], function(slides, idx) {
        return slides != null ? slides.watchAt(idx) : void 0;
      });
    });

    Deck.bind('subject').from('current').flatMap(function(current) {
      return current != null ? current.subject : void 0;
    });

    Deck.prototype.advance = function() {
      var slide;
      slide = this.get('current');
      if (slide.get('complete') === true) {
        return this.advanceSlide();
      } else {
        return slide.advance();
      }
    };

    Deck.prototype.previous = function() {
      var slide;
      slide = this.get('current');
      if (slide.get('stage') === 0) {
        return this.previousSlide();
      } else {
        return slide.previous();
      }
    };

    Deck.prototype.advanceSlide = function() {
      return this.set('slide', this.get('slide') + 1);
    };

    Deck.prototype.previousSlide = function() {
      if (this.get('slide') !== 0) {
        return this.set('slide', this.get('slide') - 1);
      }
    };

    return Deck;

  })(Model);

  util.extend(module.exports, {
    Deck: Deck
  });

}).call(this);
