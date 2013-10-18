(function() {
  var DomView, Slide, Slide4, Slide4Template, Slide4View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide4 = (function(_super) {
    __extends(Slide4, _super);

    function Slide4() {
      _ref1 = Slide4.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide4.prototype.subject = 'Justification';

    Slide4.prototype.stages = 3;

    return Slide4;

  })(Slide);

  Slide4Template = (function(_super) {
    __extends(Slide4Template, _super);

    function Slide4Template() {
      _ref2 = Slide4Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide4Template.prototype._number = 4;

    return Slide4Template;

  })(SlideTemplate);

  Slide4View = (function(_super) {
    __extends(Slide4View, _super);

    function Slide4View() {
      _ref3 = Slide4View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide4View.prototype.templateClass = Slide4Template;

    return Slide4View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide4,
    registerWith: function(library) {
      return library.register(Slide4, Slide4View);
    }
  });

}).call(this);
