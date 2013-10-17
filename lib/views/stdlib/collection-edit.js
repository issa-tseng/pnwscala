(function() {
  var Base, CollectionEditItemImpl, CollectionEditItemTemplate, CollectionEditViewImpl, CollectionEditViewTemplate, ListEditItem, ListEditItemTemplate, ListEditView, OrderedCollection, Templater, itemMarkup, util, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  Base = require('janus').Base;

  _ref = require('janus').application.listEdit, ListEditView = _ref.ListEditView, ListEditItemTemplate = _ref.ListEditItemTemplate, ListEditItem = _ref.ListEditItem;

  Templater = require('janus').Templater;

  OrderedCollection = require('janus').collection.OrderedCollection;

  itemMarkup = require('./collection-edit-item.html');

  CollectionEditViewTemplate = (function(_super) {
    __extends(CollectionEditViewTemplate, _super);

    function CollectionEditViewTemplate() {
      _ref1 = CollectionEditViewTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CollectionEditViewTemplate.prototype._dom = function() {
      return $('<ul/>');
    };

    return CollectionEditViewTemplate;

  })(Templater);

  CollectionEditViewImpl = (function(_super) {
    __extends(CollectionEditViewImpl, _super);

    function CollectionEditViewImpl() {
      _ref2 = CollectionEditViewImpl.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CollectionEditViewImpl.prototype.templateClass = CollectionEditViewTemplate;

    CollectionEditViewImpl.prototype._emptyDom = function() {
      return $('<li/>');
    };

    return CollectionEditViewImpl;

  })(ListEditView);

  CollectionEditItemTemplate = (function(_super) {
    __extends(CollectionEditItemTemplate, _super);

    function CollectionEditItemTemplate() {
      _ref3 = CollectionEditItemTemplate.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    CollectionEditItemTemplate.prototype._dom = function() {
      return $(itemMarkup);
    };

    return CollectionEditItemTemplate;

  })(ListEditItemTemplate);

  CollectionEditItemImpl = (function(_super) {
    __extends(CollectionEditItemImpl, _super);

    function CollectionEditItemImpl() {
      _ref4 = CollectionEditItemImpl.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    CollectionEditItemImpl.prototype.templateClass = CollectionEditItemTemplate;

    return CollectionEditItemImpl;

  })(ListEditItem);

  util.extend(module.exports, {
    CollectionEditViewTemplate: CollectionEditViewTemplate,
    CollectionEditView: CollectionEditViewImpl,
    CollectionEditItemTemplate: CollectionEditItemTemplate,
    CollectionEditItemImpl: CollectionEditItemImpl,
    registerWith: function(library) {
      library.register(OrderedCollection, CollectionEditViewImpl, {
        context: 'edit'
      });
      return library.register(Base, CollectionEditItemImpl, {
        context: 'edit-wrapper'
      });
    }
  });

}).call(this);
