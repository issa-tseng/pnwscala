(function() {
  var DomView, Slide, Slide19, Slide19Template, Slide19View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide19 = (function(_super) {
    __extends(Slide19, _super);

    function Slide19() {
      _ref1 = Slide19.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide19.prototype.subject = 'Difficulties';

    Slide19.prototype.stages = 0;

    return Slide19;

  })(Slide);

  Slide19Template = (function(_super) {
    __extends(Slide19Template, _super);

    function Slide19Template() {
      _ref2 = Slide19Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide19Template.prototype._number = 19;

    return Slide19Template;

  })(SlideTemplate);

  Slide19View = (function(_super) {
    __extends(Slide19View, _super);

    function Slide19View() {
      _ref3 = Slide19View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide19View.prototype.templateClass = Slide19Template;

    return Slide19View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide19,
    registerWith: function(library) {
      return library.register(Slide19, Slide19View);
    }
  });

}).call(this);
