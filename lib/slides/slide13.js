(function() {
  var DomView, Slide, Slide13, Slide13Template, Slide13View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide13 = (function(_super) {
    __extends(Slide13, _super);

    function Slide13() {
      _ref1 = Slide13.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide13.prototype.subject = 'Difficulties';

    Slide13.prototype.stages = 0;

    return Slide13;

  })(Slide);

  Slide13Template = (function(_super) {
    __extends(Slide13Template, _super);

    function Slide13Template() {
      _ref2 = Slide13Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide13Template.prototype._number = 13;

    return Slide13Template;

  })(SlideTemplate);

  Slide13View = (function(_super) {
    __extends(Slide13View, _super);

    function Slide13View() {
      _ref3 = Slide13View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide13View.prototype.templateClass = Slide13Template;

    return Slide13View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide13,
    registerWith: function(library) {
      return library.register(Slide13, Slide13View);
    }
  });

}).call(this);
