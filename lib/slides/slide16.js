(function() {
  var DomView, Slide, Slide16, Slide16Template, Slide16View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide16 = (function(_super) {
    __extends(Slide16, _super);

    function Slide16() {
      _ref1 = Slide16.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide16.prototype.subject = 'Difficulties';

    Slide16.prototype.stages = 0;

    return Slide16;

  })(Slide);

  Slide16Template = (function(_super) {
    __extends(Slide16Template, _super);

    function Slide16Template() {
      _ref2 = Slide16Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide16Template.prototype._number = 16;

    return Slide16Template;

  })(SlideTemplate);

  Slide16View = (function(_super) {
    __extends(Slide16View, _super);

    function Slide16View() {
      _ref3 = Slide16View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide16View.prototype.templateClass = Slide16Template;

    return Slide16View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide16,
    registerWith: function(library) {
      return library.register(Slide16, Slide16View);
    }
  });

}).call(this);
