(function() {
  var DomView, MultilineTextAttributeView, TextAttribute, TextAttributeView, eventMap, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  DomView = require('janus').DomView;

  TextAttribute = require('janus').attribute.TextAttribute;

  eventMap = {
    "default": 'change input',
    change: 'change'
  };

  TextAttributeView = (function(_super) {
    __extends(TextAttributeView, _super);

    function TextAttributeView() {
      _ref = TextAttributeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TextAttributeView.prototype._render = function() {
      var input, _ref1, _ref2;
      input = this._baseTag().attr('id', (_ref2 = this.options.inputId) != null ? _ref2 : '').val((_ref1 = this.subject.getValue()) != null ? _ref1 : '');
      this._bindInput(input);
      return input;
    };

    TextAttributeView.prototype._baseTag = function() {
      return $('<input/>').attr('type', 'text');
    };

    TextAttributeView.prototype._bind = function(input) {
      return this._bindInput(input);
    };

    TextAttributeView.prototype._bindInput = function(input) {
      var _this = this;
      return this.subject.watchValue().on('changed', function(newValue) {
        if (!input.hasClass('focus')) {
          return input.val(newValue);
        }
      });
    };

    TextAttributeView.prototype._wireEvents = function() {
      var input, _ref1,
        _this = this;
      input = this.artifact();
      input.on('focus', function() {
        return input.addClass('focus');
      });
      input.on('blur', function() {
        return input.removeClass('focus');
      });
      return input.on(eventMap[(_ref1 = this.options.commit) != null ? _ref1 : 'default'], function() {
        return _this._handle(input.val());
      });
    };

    TextAttributeView.prototype._handle = function(x) {
      return this.subject.setValue(x);
    };

    return TextAttributeView;

  })(DomView);

  MultilineTextAttributeView = (function(_super) {
    __extends(MultilineTextAttributeView, _super);

    function MultilineTextAttributeView() {
      _ref1 = MultilineTextAttributeView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    MultilineTextAttributeView.prototype._baseTag = function() {
      return $('<textarea/>');
    };

    return MultilineTextAttributeView;

  })(TextAttributeView);

  util.extend(module.exports, {
    TextAttributeView: TextAttributeView,
    registerWith: function(library) {
      library.register(TextAttribute, TextAttributeView, {
        context: 'edit'
      });
      return library.register(TextAttribute, MultilineTextAttributeView, {
        context: 'edit',
        attributes: {
          style: 'multiline'
        }
      });
    }
  });

}).call(this);
