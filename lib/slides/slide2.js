(function() {
  var DomView, Slide, Slide2, Slide2Template, Slide2View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide2 = (function(_super) {
    __extends(Slide2, _super);

    function Slide2() {
      _ref1 = Slide2.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide2.prototype.subject = 'Overview';

    Slide2.prototype.stages = 0;

    return Slide2;

  })(Slide);

  Slide2Template = (function(_super) {
    __extends(Slide2Template, _super);

    function Slide2Template() {
      _ref2 = Slide2Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide2Template.prototype._number = 2;

    return Slide2Template;

  })(SlideTemplate);

  Slide2View = (function(_super) {
    __extends(Slide2View, _super);

    function Slide2View() {
      _ref3 = Slide2View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide2View.prototype.templateClass = Slide2Template;

    return Slide2View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide2,
    registerWith: function(library) {
      return library.register(Slide2, Slide2View);
    }
  });

}).call(this);
