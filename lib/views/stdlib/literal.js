(function() {
  var DomView, LiteralTemplate, LiteralView, Templater, Varying, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  DomView = require('janus').DomView;

  Templater = require('janus').Templater;

  Varying = require('janus').varying.Varying;

  LiteralTemplate = (function(_super) {
    __extends(LiteralTemplate, _super);

    function LiteralTemplate() {
      _ref = LiteralTemplate.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LiteralTemplate.prototype._dom = function() {
      return $('<span/>').addClass('literal');
    };

    LiteralTemplate.prototype._binding = function() {
      var binding;
      binding = LiteralTemplate.__super__._binding.call(this);
      return binding.find('span').text().fromVarying(Varying.ly);
    };

    return LiteralTemplate;

  })(Templater);

  LiteralView = (function(_super) {
    __extends(LiteralView, _super);

    function LiteralView() {
      _ref1 = LiteralView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    LiteralView.prototype.templateClass = LiteralTemplate;

    return LiteralView;

  })(DomView);

  util.extend(module.exports, {
    LiteralTemplate: LiteralTemplate,
    LiteralView: LiteralView,
    registerWith: function(library) {
      library.register(Number, LiteralView, {
        context: 'default'
      });
      library.register(Boolean, LiteralView, {
        context: 'default'
      });
      return library.register(String, LiteralView, {
        context: 'default'
      });
    }
  });

}).call(this);
