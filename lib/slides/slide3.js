(function() {
  var DomView, Slide, Slide3, Slide3Template, Slide3View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide3 = (function(_super) {
    __extends(Slide3, _super);

    function Slide3() {
      _ref1 = Slide3.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide3.prototype.subject = 'Definition';

    Slide3.prototype.stages = 1;

    return Slide3;

  })(Slide);

  Slide3Template = (function(_super) {
    __extends(Slide3Template, _super);

    function Slide3Template() {
      _ref2 = Slide3Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide3Template.prototype._number = 3;

    return Slide3Template;

  })(SlideTemplate);

  Slide3View = (function(_super) {
    __extends(Slide3View, _super);

    function Slide3View() {
      _ref3 = Slide3View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide3View.prototype.templateClass = Slide3Template;

    return Slide3View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide3,
    registerWith: function(library) {
      return library.register(Slide3, Slide3View);
    }
  });

}).call(this);
