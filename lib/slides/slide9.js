(function() {
  var DomView, Slide, Slide9, Slide9Template, Slide9View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide9 = (function(_super) {
    __extends(Slide9, _super);

    function Slide9() {
      _ref1 = Slide9.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide9.prototype.subject = 'Origins';

    Slide9.prototype.stages = 2;

    return Slide9;

  })(Slide);

  Slide9Template = (function(_super) {
    __extends(Slide9Template, _super);

    function Slide9Template() {
      _ref2 = Slide9Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide9Template.prototype._number = 9;

    Slide9Template.prototype._binding = function() {
      var binding;
      binding = Slide9Template.__super__._binding.call(this);
      return binding.find('.highlight.flatMap').classed('active').from('stage').flatMap(function(stage) {
        return stage === 2;
      });
    };

    return Slide9Template;

  })(SlideTemplate);

  Slide9View = (function(_super) {
    __extends(Slide9View, _super);

    function Slide9View() {
      _ref3 = Slide9View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide9View.prototype.templateClass = Slide9Template;

    return Slide9View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide9,
    registerWith: function(library) {
      return library.register(Slide9, Slide9View);
    }
  });

}).call(this);
