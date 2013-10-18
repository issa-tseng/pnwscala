(function() {
  var DomView, Slide, Slide8, Slide8Template, Slide8View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide8 = (function(_super) {
    __extends(Slide8, _super);

    function Slide8() {
      _ref1 = Slide8.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide8.prototype.subject = 'Origins';

    Slide8.prototype.stages = 1;

    return Slide8;

  })(Slide);

  Slide8Template = (function(_super) {
    __extends(Slide8Template, _super);

    function Slide8Template() {
      _ref2 = Slide8Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide8Template.prototype._number = 8;

    return Slide8Template;

  })(SlideTemplate);

  Slide8View = (function(_super) {
    __extends(Slide8View, _super);

    function Slide8View() {
      _ref3 = Slide8View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide8View.prototype.templateClass = Slide8Template;

    return Slide8View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide8,
    registerWith: function(library) {
      return library.register(Slide8, Slide8View);
    }
  });

}).call(this);
