(function() {
  var DomView, Slide, Slide21, Slide21Template, Slide21View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide21 = (function(_super) {
    __extends(Slide21, _super);

    function Slide21() {
      _ref1 = Slide21.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide21.prototype.stages = 0;

    return Slide21;

  })(Slide);

  Slide21Template = (function(_super) {
    __extends(Slide21Template, _super);

    function Slide21Template() {
      _ref2 = Slide21Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide21Template.prototype._number = 21;

    return Slide21Template;

  })(SlideTemplate);

  Slide21View = (function(_super) {
    __extends(Slide21View, _super);

    function Slide21View() {
      _ref3 = Slide21View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide21View.prototype.templateClass = Slide21Template;

    return Slide21View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide21,
    registerWith: function(library) {
      return library.register(Slide21, Slide21View);
    }
  });

}).call(this);
