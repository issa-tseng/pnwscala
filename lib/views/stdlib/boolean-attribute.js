(function() {
  var BooleanAttribute, BooleanCheckboxView, BooleanToggleButtonView, DomView, Templater, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  Templater = require('janus').Templater;

  DomView = require('janus').DomView;

  BooleanAttribute = require('janus').attribute.BooleanAttribute;

  BooleanToggleButtonView = (function(_super) {
    __extends(BooleanToggleButtonView, _super);

    function BooleanToggleButtonView() {
      _ref = BooleanToggleButtonView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BooleanToggleButtonView.prototype._render = function() {
      var _ref1, _ref2,
        _this = this;
      this._button = $('<a/>');
      this._button.addClass('button');
      this._button.addClass((_ref1 = this.options.className) != null ? _ref1 : '');
      this._button.attr('id', (_ref2 = this.options.inputId) != null ? _ref2 : '');
      this._handleState();
      this.subject.watchValue().on('changed', function() {
        return _this._handleState();
      });
      return this._button;
    };

    BooleanToggleButtonView.prototype._handleState = function() {
      this._button.text(this.subject.getValue());
      return this._button.toggleClass('checked', this.subject.getValue() === true);
    };

    BooleanToggleButtonView.prototype._wireEvents = function() {
      var _this = this;
      return this._button.on('click', function(event) {
        event.preventDefault();
        return _this.subject.setValue(!_this._button.hasClass('checked'));
      });
    };

    return BooleanToggleButtonView;

  })(DomView);

  BooleanCheckboxView = (function(_super) {
    __extends(BooleanCheckboxView, _super);

    function BooleanCheckboxView() {
      _ref1 = BooleanCheckboxView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    BooleanCheckboxView.prototype._render = function() {
      var _this = this;
      this._check = $('<input/>');
      this._check.attr('type', 'text');
      this._check.attr('id', this.options.inputId);
      this._handleState();
      this.subject.watchValue().on('changed', function() {
        return _this._handleState();
      });
      return this._check;
    };

    BooleanCheckboxView.prototype._handleState = function() {
      return this._check.prop('checked', this.subject.getValue());
    };

    BooleanCheckboxView.prototype._wireEvents = function() {
      var _this = this;
      return this._check.on('change input', function(event) {
        event.preventDefault();
        return _this.subject.setValue(_this._check.prop('checked'));
      });
    };

    return BooleanCheckboxView;

  })(DomView);

  util.extend(module.exports, {
    BooleanCheckboxView: BooleanCheckboxView,
    BooleanToggleButtonView: BooleanToggleButtonView,
    registerWith: function(library) {
      library.register(BooleanAttribute, BooleanCheckboxView, {
        context: 'edit'
      });
      return library.register(BooleanAttribute, BooleanToggleButtonView, {
        context: 'edit',
        attributes: {
          style: 'button'
        }
      });
    }
  });

}).call(this);
