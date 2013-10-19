(function() {
  var DomView, Slide, Slide14, Slide14Template, Slide14View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide14 = (function(_super) {
    __extends(Slide14, _super);

    function Slide14() {
      _ref1 = Slide14.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide14.prototype.subject = 'Difficulties';

    Slide14.prototype.stages = 1;

    return Slide14;

  })(Slide);

  Slide14Template = (function(_super) {
    __extends(Slide14Template, _super);

    function Slide14Template() {
      _ref2 = Slide14Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide14Template.prototype._number = 14;

    return Slide14Template;

  })(SlideTemplate);

  Slide14View = (function(_super) {
    __extends(Slide14View, _super);

    function Slide14View() {
      _ref3 = Slide14View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide14View.prototype.templateClass = Slide14Template;

    return Slide14View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide14,
    registerWith: function(library) {
      return library.register(Slide14, Slide14View);
    }
  });

}).call(this);
