(function() {
  var List, Model, Slide, Slides, Varying, attribute, util, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, (_ref1 = _ref.collection, List = _ref1.List), attribute = _ref.attribute, (_ref2 = _ref.varying, Varying = _ref2.Varying);

  Slide = (function(_super) {
    var _ref4;

    __extends(Slide, _super);

    function Slide() {
      _ref3 = Slide.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide.attribute('stage', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref4 = _Class.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      _Class.prototype["default"] = function() {
        return 0;
      };

      return _Class;

    })(attribute.NumberAttribute));

    Slide.bind('complete').from('stage').andVarying(function() {
      return Varying.ly(this.stages);
    }).flatMap(function(stage, stages) {
      return stage === stages;
    });

    Slide.prototype.advance = function() {
      return this.set('stage', this.get('stage') + 1);
    };

    Slide.prototype.previous = function() {
      if (this.get('stage') !== 0) {
        return this.set('stage', this.get('stage') - 1);
      }
    };

    return Slide;

  })(Model);

  Slides = (function(_super) {
    __extends(Slides, _super);

    function Slides() {
      _ref4 = Slides.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Slides.modelClass = Slide;

    return Slides;

  })(List);

  util.extend(module.exports, {
    Slide: Slide,
    Slides: Slides
  });

}).call(this);
