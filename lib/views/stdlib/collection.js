(function() {
  var CollectionViewImpl, CollectionViewTemplater, ListView, OrderedCollection, Templater, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  ListView = require('janus').application.ListView;

  Templater = require('janus').Templater;

  OrderedCollection = require('janus').collection.OrderedCollection;

  CollectionViewTemplater = (function(_super) {
    __extends(CollectionViewTemplater, _super);

    function CollectionViewTemplater() {
      _ref = CollectionViewTemplater.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CollectionViewTemplater.prototype._dom = function() {
      return $('<ul/>');
    };

    return CollectionViewTemplater;

  })(Templater);

  CollectionViewImpl = (function(_super) {
    __extends(CollectionViewImpl, _super);

    function CollectionViewImpl() {
      _ref1 = CollectionViewImpl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CollectionViewImpl.prototype.templateClass = CollectionViewTemplater;

    CollectionViewImpl.prototype._emptyDom = function() {
      return $('<li/>');
    };

    return CollectionViewImpl;

  })(ListView);

  util.extend(module.exports, {
    CollectionViewTemplater: CollectionViewTemplater,
    CollectionView: CollectionViewImpl,
    registerWith: function(library) {
      return library.register(OrderedCollection, CollectionViewImpl, {
        context: 'default'
      });
    }
  });

}).call(this);
