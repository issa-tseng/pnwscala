(function() {
  var DomView, Person, Slide, Slide12, Slide12Template, Slide12View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Person = require('../models/person').Person;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide12 = (function(_super) {
    __extends(Slide12, _super);

    function Slide12() {
      _ref1 = Slide12.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide12.prototype.subject = 'Consequences';

    Slide12.prototype.stages = 0;

    return Slide12;

  })(Slide);

  Slide12Template = (function(_super) {
    __extends(Slide12Template, _super);

    function Slide12Template() {
      _ref2 = Slide12Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide12Template.prototype._number = 12;

    Slide12Template.prototype._binding = function() {
      var binding;
      binding = Slide12Template.__super__._binding.call(this);
      binding.find('.personEdit').render(this.options.app, {
        context: 'edit'
      }).fromAux('person');
      return binding.find('.personView').render(this.options.app).fromAux('person');
    };

    return Slide12Template;

  })(SlideTemplate);

  Slide12View = (function(_super) {
    __extends(Slide12View, _super);

    function Slide12View() {
      _ref3 = Slide12View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide12View.prototype.templateClass = Slide12Template;

    Slide12View.prototype._initialize = function() {
      return this.person = new Person();
    };

    Slide12View.prototype._auxData = function() {
      return {
        person: this.person
      };
    };

    return Slide12View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide12,
    registerWith: function(library) {
      return library.register(Slide12, Slide12View);
    }
  });

}).call(this);
