(function() {
  var DomView, Slide, Slide11, Slide11Template, Slide11View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide11 = (function(_super) {
    __extends(Slide11, _super);

    function Slide11() {
      _ref1 = Slide11.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide11.prototype.subject = 'Consequences';

    Slide11.prototype.stages = 33;

    return Slide11;

  })(Slide);

  Slide11Template = (function(_super) {
    __extends(Slide11Template, _super);

    function Slide11Template() {
      _ref2 = Slide11Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide11Template.prototype._number = 11;

    Slide11Template.prototype._binding = function() {
      var binding;
      binding = Slide11Template.__super__._binding.call(this);
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

    return Slide11Template;

  })(SlideTemplate);

  Slide11View = (function(_super) {
    __extends(Slide11View, _super);

    function Slide11View() {
      _ref3 = Slide11View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide11View.prototype.templateClass = Slide11Template;

    return Slide11View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide11,
    registerWith: function(library) {
      return library.register(Slide11, Slide11View);
    }
  });

}).call(this);
