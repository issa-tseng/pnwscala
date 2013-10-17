(function() {
  var DomView, Slide, Slide1, Slide1Template, Slide1View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide1 = (function(_super) {
    __extends(Slide1, _super);

    function Slide1() {
      _ref1 = Slide1.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide1.prototype.stages = 1;

    return Slide1;

  })(Slide);

  Slide1Template = (function(_super) {
    __extends(Slide1Template, _super);

    function Slide1Template() {
      _ref2 = Slide1Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide1Template.prototype._number = 1;

    return Slide1Template;

  })(SlideTemplate);

  Slide1View = (function(_super) {
    __extends(Slide1View, _super);

    function Slide1View() {
      _ref3 = Slide1View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide1View.prototype.templateClass = Slide1Template;

    return Slide1View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide1,
    registerWith: function(library) {
      return library.register(Slide1, Slide1View);
    }
  });

}).call(this);
