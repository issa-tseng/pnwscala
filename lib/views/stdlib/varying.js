(function() {
  var Templater, Varying, VaryingView, VaryingViewImpl, VaryingViewTemplate, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  VaryingView = require('janus').application.VaryingView;

  Templater = require('janus').Templater;

  Varying = require('janus').varying.Varying;

  VaryingViewTemplate = (function(_super) {
    __extends(VaryingViewTemplate, _super);

    function VaryingViewTemplate() {
      _ref = VaryingViewTemplate.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VaryingViewTemplate.prototype._dom = function() {
      return $('<div/>');
    };

    return VaryingViewTemplate;

  })(Templater);

  VaryingViewImpl = (function(_super) {
    __extends(VaryingViewImpl, _super);

    function VaryingViewImpl() {
      _ref1 = VaryingViewImpl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    VaryingViewImpl.prototype.templateClass = VaryingViewTemplate;

    return VaryingViewImpl;

  })(VaryingView);

  util.extend(module.exports, {
    VaryingView: VaryingViewImpl,
    registerWith: function(library) {
      return library.register(Varying, VaryingViewImpl, {
        context: 'default'
      });
    }
  });

}).call(this);
