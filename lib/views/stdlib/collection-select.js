(function() {
  var Base, CollectionSelectItemTemplate, CollectionSelectItemView, CollectionSelectView, CollectionView, DomView, OrderedCollection, Templater, itemMarkup, templater, util, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, templater = _ref.templater, Templater = _ref.Templater, (_ref1 = _ref.collection, OrderedCollection = _ref1.OrderedCollection), Base = _ref.Base;

  CollectionView = require('./collection').CollectionView;

  itemMarkup = require('./collection-select-item.html');

  CollectionSelectView = (function(_super) {
    __extends(CollectionSelectView, _super);

    function CollectionSelectView() {
      _ref2 = CollectionSelectView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CollectionSelectView.prototype._initialize = function() {
      var _ref3, _ref4;
      CollectionSelectView.__super__._initialize.call(this);
      this.options.childOpts = util.extendNew(this.options.childOpts, {
        aux: {
          context: this.options.itemContext,
          view: this.options.itemView,
          list: this.subject,
          attr: this.options.aux.attr
        }
      });
      this.options.itemView = (_ref3 = this.options.selectWrapperView) != null ? _ref3 : void 0;
      return this.options.itemContext = (_ref4 = this.options.selectWrapperContext) != null ? _ref4 : 'select-wrapper';
    };

    return CollectionSelectView;

  })(CollectionView);

  CollectionSelectItemTemplate = (function(_super) {
    __extends(CollectionSelectItemTemplate, _super);

    function CollectionSelectItemTemplate() {
      _ref3 = CollectionSelectItemTemplate.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    CollectionSelectItemTemplate.prototype._dom = function() {
      return $(itemMarkup);
    };

    CollectionSelectItemTemplate.prototype._binding = function() {
      var binding,
        _this = this;
      binding = CollectionSelectItemTemplate.__super__._binding.call(this);
      binding.find('> li > .selectControls .selectButton').text().fromSelf().andVarying(function(_, aux) {
        return aux.attr.watchValue();
      }).flatMap(function(subject, currentValue) {
        if (subject === currentValue) {
          return 'Selected';
        } else {
          return 'Select';
        }
      });
      binding.find('> li > .selectControls .selectButton').classed('ss-check selected').fromSelf().andVarying(function(_, aux) {
        return aux.attr.watchValue();
      }).flatMap(function(subject, currentValue) {
        return subject === currentValue;
      });
      binding.find('.selectItem').render(this.options.app).fromSelf().andAux('view').andAux('context').flatMap(function(item, viewClass, context) {
        var view;
        if (viewClass != null) {
          view = new viewClass(item, {
            options: {
              app: _this.options.app
            }
          });
          return new templater.WithView(view);
        } else {
          return new templater.WithOptions(item, {
            context: context != null ? context : 'default'
          });
        }
      });
      return binding;
    };

    return CollectionSelectItemTemplate;

  })(Templater);

  CollectionSelectItemView = (function(_super) {
    __extends(CollectionSelectItemView, _super);

    function CollectionSelectItemView() {
      _ref4 = CollectionSelectItemView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    CollectionSelectItemView.prototype.templateClass = CollectionSelectItemTemplate;

    CollectionSelectItemView.prototype._wireEvents = function() {
      var dom,
        _this = this;
      dom = this.artifact();
      return dom.find('> .selectControls .selectButton').on('click', function(event) {
        event.preventDefault();
        return _this.options.aux.attr.setValue(_this.subject);
      });
    };

    return CollectionSelectItemView;

  })(DomView);

  util.extend(module.exports, {
    CollectionSelectView: CollectionSelectView,
    CollectionSelectItemTemplate: CollectionSelectItemTemplate,
    CollectionSelectItemView: CollectionSelectItemView,
    registerWith: function(library) {
      library.register(OrderedCollection, CollectionSelectView, {
        context: 'select'
      });
      library.register(Base, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
      library.register(String, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
      library.register(Boolean, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
      return library.register(Number, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
    }
  });

}).call(this);
