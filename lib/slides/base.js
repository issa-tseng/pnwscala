(function() {
  var SlideTemplate, Templater, markup, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater;

  markup = require('./markup.html');

  SlideTemplate = (function(_super) {
    __extends(SlideTemplate, _super);

    function SlideTemplate() {
      _ref1 = SlideTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    SlideTemplate.prototype._dom = function() {
      return $(markup).find(".slide" + this._number);
    };

    SlideTemplate.prototype._number = 0;

    SlideTemplate.prototype._binding = function() {
      var binding;
      binding = SlideTemplate.__super__._binding.call(this);
      binding.find('.slide').classGroup('stage-').from('stage');
      return binding;
    };

    return SlideTemplate;

  })(Templater);

  util.extend(module.exports, {
    SlideTemplate: SlideTemplate
  });

}).call(this);
