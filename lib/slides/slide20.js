(function() {
  var DomView, Slide, Slide20, Slide20Template, Slide20View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide20 = (function(_super) {
    __extends(Slide20, _super);

    function Slide20() {
      _ref1 = Slide20.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide20.prototype.subject = 'Lessons';

    Slide20.prototype.stages = 0;

    return Slide20;

  })(Slide);

  Slide20Template = (function(_super) {
    __extends(Slide20Template, _super);

    function Slide20Template() {
      _ref2 = Slide20Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide20Template.prototype._number = 20;

    return Slide20Template;

  })(SlideTemplate);

  Slide20View = (function(_super) {
    __extends(Slide20View, _super);

    function Slide20View() {
      _ref3 = Slide20View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide20View.prototype.templateClass = Slide20Template;

    return Slide20View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide20,
    registerWith: function(library) {
      return library.register(Slide20, Slide20View);
    }
  });

}).call(this);
