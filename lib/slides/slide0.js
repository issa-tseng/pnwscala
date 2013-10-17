(function() {
  var DomView, Slide, Slide0, Slide0Template, Slide0View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide0 = (function(_super) {
    __extends(Slide0, _super);

    function Slide0() {
      _ref1 = Slide0.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide0.prototype.stages = 0;

    return Slide0;

  })(Slide);

  Slide0Template = (function(_super) {
    __extends(Slide0Template, _super);

    function Slide0Template() {
      _ref2 = Slide0Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide0Template.prototype._number = 0;

    return Slide0Template;

  })(SlideTemplate);

  Slide0View = (function(_super) {
    __extends(Slide0View, _super);

    function Slide0View() {
      _ref3 = Slide0View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide0View.prototype.templateClass = Slide0Template;

    return Slide0View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide0,
    registerWith: function(library) {
      return library.register(Slide0, Slide0View);
    }
  });

}).call(this);
