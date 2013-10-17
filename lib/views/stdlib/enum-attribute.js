(function() {
  var Base, CollectionViewImpl, CollectionViewTemplater, DomView, EnumAttribute, EnumAttributeListTemplate, EnumAttributeListView, EnumAttributeView, List, OrderedCollection, Templater, Varying, templater, textItemMarkup, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  Base = require('janus').Base;

  _ref = require('janus').collection, List = _ref.List, OrderedCollection = _ref.OrderedCollection;

  DomView = require('janus').DomView;

  EnumAttribute = require('janus').attribute.EnumAttribute;

  Templater = require('janus').Templater;

  templater = require('janus').templater;

  Varying = require('janus').varying.Varying;

  textItemMarkup = require('./enum-text-item.html');

  CollectionViewTemplater = require('./collection').CollectionViewTemplater;

  CollectionViewImpl = require('./collection').CollectionView;

  EnumAttributeView = (function(_super) {
    __extends(EnumAttributeView, _super);

    function EnumAttributeView() {
      _ref1 = EnumAttributeView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    EnumAttributeView.prototype._initialize = function() {
      this._idToOption = {};
      return this._idToValue = {};
    };

    EnumAttributeView.prototype._render = function() {
      var _this = this;
      this._select = $('<select/>');
      this._select.attr('id', this.options.inputId);
      this._handleOptions();
      if ($.fn.jquery != null) {
        this._select.val(this.subject.getValue());
      } else {
        this._select.children("[value=" + (this.subject.getValue()) + "]").attr('selected', true);
      }
      this.subject.watchValue().on('changed', function(newValue) {
        return _this._select.val(_this._idForChoice(newValue));
      });
      return this._select;
    };

    EnumAttributeView.prototype._handleOptions = function() {
      var handleVarying, options,
        _this = this;
      options = this.subject.values();
      if (options instanceof OrderedCollection) {
        return this._renderOptions(options);
      } else if (util.isArray(options)) {
        return this._renderOptions(new List(options));
      } else if (options instanceof Varying) {
        handleVarying = function(value) {
          if (value instanceof OrderedCollection) {
            return _this._renderOptions(value);
          } else {
            return _this._renderOptions(new List());
          }
        };
        options.on('changed', handleVarying);
        return handleVarying(options.value);
      }
    };

    EnumAttributeView.prototype._renderOptions = function(options) {
      var choice, _i, _len, _ref2, _ref3,
        _this = this;
      this._select.empty();
      if ((_ref2 = this._listListener) != null) {
        _ref2.destroy();
      }
      this._listListener = new Base();
      if (this.subject.nullable === true) {
        this._select.append(this._renderOption(null));
      }
      _ref3 = options.list;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        choice = _ref3[_i];
        this._select.append(this._renderOption(choice));
      }
      this._listListener.listenTo(options, 'added', function(option, idx) {
        if (idx === 0) {
          return _this._select.prepend(_this._renderOption(option));
        } else {
          return _this._select.find("> :nth-child(" + idx + ")").after(_this._renderOption(option));
        }
      });
      this._listListener.listenTo(options, 'removed', function(choice) {
        var option;
        option = _this._idToOption[_this._idForChoice(choice)];
        if (option.attr('selected') === 'selected') {
          option.remove();
          _this.subject.setValue(_this._select.val());
        } else {
          option.remove();
        }
        return delete _this._idToOption[_this._idForChoice(choice)];
      });
      return null;
    };

    EnumAttributeView.prototype._renderOption = function(choice) {
      var id, option, textVary, update, view;
      id = this._idForChoice(choice);
      option = $('<option/>');
      option.attr('value', id);
      if (choice === null) {
        Varying.ly(this._uiString(null)).reactNow(function(text) {
          var _ref2;
          return option.text((_ref2 = text != null ? text.toString() : void 0) != null ? _ref2 : '');
        });
      } else if (util.isPrimitive(choice)) {
        Varying.ly(this._uiString(choice)).reactNow(function(text) {
          var _ref2;
          return option.text((_ref2 = text != null ? text.toString() : void 0) != null ? _ref2 : '');
        });
      } else if (choice instanceof Varying) {
        choice.reactNow(function(text) {
          return option.text(text);
        });
      } else {
        view = this.options.app.getView(choice, {
          context: 'text'
        });
        if (view != null) {
          textVary = view.artifact();
          update = function(value) {
            return option.text(value);
          };
          textVary.on('changed', update);
          update(textVary.value);
        } else {
          option.text('');
        }
      }
      this._idToValue[id] = choice;
      return this._idToOption[id] = option;
    };

    EnumAttributeView.prototype._idForChoice = function(choice) {
      if (choice == null) {
        return null;
      } else if (util.isString(choice) || util.isNumber(choice)) {
        return choice;
      } else if (choice instanceof Base) {
        return choice._id;
      } else {
        return choice.toString();
      }
    };

    EnumAttributeView.prototype._uiString = function(choice) {
      if (choice == null) {
        return '';
      } else {
        return choice.toString();
      }
    };

    EnumAttributeView.prototype._wireEvents = function() {
      var select,
        _this = this;
      select = this._select;
      select.on('focus', function() {
        return select.addClass('focus');
      });
      select.on('blur', function() {
        return select.removeClass('focus');
      });
      return select.on('change input', function() {
        return _this.subject.setValue(_this._idToValue[select.val()]);
      });
    };

    return EnumAttributeView;

  })(DomView);

  EnumAttributeListTemplate = (function(_super) {
    __extends(EnumAttributeListTemplate, _super);

    function EnumAttributeListTemplate() {
      _ref2 = EnumAttributeListTemplate.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    EnumAttributeListTemplate.prototype._dom = function() {
      return $('<div><div class="listEnum"/></div>');
    };

    EnumAttributeListTemplate.prototype._binding = function() {
      var binding,
        _this = this;
      binding = EnumAttributeListTemplate.__super__._binding.call(this);
      return binding.find('.listEnum').render(this.options.app, {
        context: 'select',
        constructorOpts: {
          selectWrapperView: this.options.selectWrapperView,
          selectWrapperContext: this.options.selectWrapperContext,
          itemView: this.options.itemView,
          itemContext: this.options.itemContext
        }
      }).fromSelf().fromVarying(function(attr) {
        return Varying.ly(attr.values());
      }).flatMap(function(self, list) {
        if (list instanceof OrderedCollection) {
          return new templater.WithAux(list, {
            attr: self
          });
        } else if (util.isArray(list)) {
          return new templater.WithAux(new List(list), {
            attr: self
          });
        } else {
          return list;
        }
      });
    };

    return EnumAttributeListTemplate;

  })(Templater);

  EnumAttributeListView = (function(_super) {
    __extends(EnumAttributeListView, _super);

    function EnumAttributeListView() {
      _ref3 = EnumAttributeListView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EnumAttributeListView.prototype.templateClass = EnumAttributeListTemplate;

    EnumAttributeListView.prototype._templaterOptions = function() {
      return {
        selectWrapperView: this.options.selectWrapperView,
        selectWrapperContext: this.options.selectWrapperContext,
        itemView: this.options.itemView,
        itemContext: this.options.itemContext
      };
    };

    return EnumAttributeListView;

  })(DomView);

  util.extend(module.exports, {
    EnumAttributeView: EnumAttributeView,
    EnumAttributeListView: EnumAttributeListView,
    registerWith: function(library) {
      library.register(EnumAttribute, EnumAttributeView, {
        context: 'edit'
      });
      return library.register(EnumAttribute, EnumAttributeListView, {
        context: 'edit',
        attributes: {
          style: 'list'
        }
      });
    }
  });

}).call(this);
