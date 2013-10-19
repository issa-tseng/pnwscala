(function() {
  var DomView, Slide, Slide15, Slide15Template, Slide15View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide15 = (function(_super) {
    __extends(Slide15, _super);

    function Slide15() {
      _ref1 = Slide15.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide15.prototype.subject = 'Difficulties';

    Slide15.prototype.stages = 0;

    return Slide15;

  })(Slide);

  Slide15Template = (function(_super) {
    __extends(Slide15Template, _super);

    function Slide15Template() {
      _ref2 = Slide15Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide15Template.prototype._number = 15;

    return Slide15Template;

  })(SlideTemplate);

  Slide15View = (function(_super) {
    __extends(Slide15View, _super);

    function Slide15View() {
      _ref3 = Slide15View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide15View.prototype.templateClass = Slide15Template;

    return Slide15View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide15,
    registerWith: function(library) {
      return library.register(Slide15, Slide15View);
    }
  });

}).call(this);
