(function() {
  var DomView, Slide, Slide7, Slide7Template, Slide7View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide7 = (function(_super) {
    __extends(Slide7, _super);

    function Slide7() {
      _ref1 = Slide7.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide7.prototype.subject = 'Origins';

    Slide7.prototype.stages = 2;

    return Slide7;

  })(Slide);

  Slide7Template = (function(_super) {
    __extends(Slide7Template, _super);

    function Slide7Template() {
      _ref2 = Slide7Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide7Template.prototype._number = 7;

    Slide7Template.prototype._binding = function() {
      var binding;
      binding = Slide7Template.__super__._binding.call(this);
      binding.find('.highlight.class').classed('active').from('stage').flatMap(function(stage) {
        return stage > 0;
      });
      return binding.find('.highlight.text').classed('active').from('stage').flatMap(function(stage) {
        return stage > 1;
      });
    };

    return Slide7Template;

  })(SlideTemplate);

  Slide7View = (function(_super) {
    __extends(Slide7View, _super);

    function Slide7View() {
      _ref3 = Slide7View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide7View.prototype.templateClass = Slide7Template;

    return Slide7View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide7,
    registerWith: function(library) {
      return library.register(Slide7, Slide7View);
    }
  });

}).call(this);
