(function() {
  var DomView, Slide, Slide18, Slide18Template, Slide18View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide18 = (function(_super) {
    __extends(Slide18, _super);

    function Slide18() {
      _ref1 = Slide18.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide18.prototype.subject = 'Difficulties';

    Slide18.prototype.stages = 0;

    return Slide18;

  })(Slide);

  Slide18Template = (function(_super) {
    __extends(Slide18Template, _super);

    function Slide18Template() {
      _ref2 = Slide18Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide18Template.prototype._number = 18;

    return Slide18Template;

  })(SlideTemplate);

  Slide18View = (function(_super) {
    __extends(Slide18View, _super);

    function Slide18View() {
      _ref3 = Slide18View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide18View.prototype.templateClass = Slide18Template;

    return Slide18View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide18,
    registerWith: function(library) {
      return library.register(Slide18, Slide18View);
    }
  });

}).call(this);
