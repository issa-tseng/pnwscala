(function() {
  var DomView, Slide, Slide17, Slide17Template, Slide17View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide17 = (function(_super) {
    __extends(Slide17, _super);

    function Slide17() {
      _ref1 = Slide17.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide17.prototype.subject = 'Difficulties';

    Slide17.prototype.stages = 0;

    return Slide17;

  })(Slide);

  Slide17Template = (function(_super) {
    __extends(Slide17Template, _super);

    function Slide17Template() {
      _ref2 = Slide17Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide17Template.prototype._number = 17;

    return Slide17Template;

  })(SlideTemplate);

  Slide17View = (function(_super) {
    __extends(Slide17View, _super);

    function Slide17View() {
      _ref3 = Slide17View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide17View.prototype.templateClass = Slide17Template;

    return Slide17View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide17,
    registerWith: function(library) {
      return library.register(Slide17, Slide17View);
    }
  });

}).call(this);
