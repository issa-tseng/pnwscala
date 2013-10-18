(function() {
  var DomView, Slide, Slide10, Slide10Template, Slide10View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide10 = (function(_super) {
    __extends(Slide10, _super);

    function Slide10() {
      _ref1 = Slide10.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide10.prototype.subject = 'Origins';

    Slide10.prototype.stages = 5;

    return Slide10;

  })(Slide);

  Slide10Template = (function(_super) {
    __extends(Slide10Template, _super);

    function Slide10Template() {
      _ref2 = Slide10Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide10Template.prototype._number = 10;

    Slide10Template.prototype._binding = function() {
      var binding;
      binding = Slide10Template.__super__._binding.call(this);
      binding.find('.highlight.constr').classed('active').from('stage').flatMap(function(stage) {
        return stage === 3;
      });
      binding.find('.highlight.map').classed('active').from('stage').flatMap(function(stage) {
        return stage === 4;
      });
      return binding.find('.highlight.setVal').classed('active').from('stage').flatMap(function(stage) {
        return stage === 5;
      });
    };

    return Slide10Template;

  })(SlideTemplate);

  Slide10View = (function(_super) {
    __extends(Slide10View, _super);

    function Slide10View() {
      _ref3 = Slide10View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide10View.prototype.templateClass = Slide10Template;

    return Slide10View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide10,
    registerWith: function(library) {
      return library.register(Slide10, Slide10View);
    }
  });

}).call(this);
