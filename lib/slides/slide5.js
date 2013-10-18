(function() {
  var DomView, Slide, Slide5, Slide5Template, Slide5View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide5 = (function(_super) {
    __extends(Slide5, _super);

    function Slide5() {
      _ref1 = Slide5.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide5.prototype.subject = 'Origins';

    Slide5.prototype.stages = 3;

    return Slide5;

  })(Slide);

  Slide5Template = (function(_super) {
    __extends(Slide5Template, _super);

    function Slide5Template() {
      _ref2 = Slide5Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide5Template.prototype._number = 5;

    return Slide5Template;

  })(SlideTemplate);

  Slide5View = (function(_super) {
    __extends(Slide5View, _super);

    function Slide5View() {
      _ref3 = Slide5View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide5View.prototype.templateClass = Slide5Template;

    return Slide5View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide5,
    registerWith: function(library) {
      return library.register(Slide5, Slide5View);
    }
  });

}).call(this);
