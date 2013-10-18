(function() {
  var DomView, Slide, Slide6, Slide6Template, Slide6View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide6 = (function(_super) {
    __extends(Slide6, _super);

    function Slide6() {
      _ref1 = Slide6.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide6.prototype.subject = 'Origins';

    Slide6.prototype.stages = 3;

    return Slide6;

  })(Slide);

  Slide6Template = (function(_super) {
    __extends(Slide6Template, _super);

    function Slide6Template() {
      _ref2 = Slide6Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide6Template.prototype._number = 6;

    return Slide6Template;

  })(SlideTemplate);

  Slide6View = (function(_super) {
    __extends(Slide6View, _super);

    function Slide6View() {
      _ref3 = Slide6View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide6View.prototype.templateClass = Slide6Template;

    return Slide6View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide6,
    registerWith: function(library) {
      return library.register(Slide6, Slide6View);
    }
  });

}).call(this);
