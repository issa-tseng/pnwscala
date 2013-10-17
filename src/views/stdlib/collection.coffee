util = require('janus').util
ListView = require('janus').application.ListView
Templater = require('janus').Templater
OrderedCollection = require('janus').collection.OrderedCollection

class CollectionViewTemplater extends Templater
  _dom: -> $('<ul/>')

class CollectionViewImpl extends ListView
  templateClass: CollectionViewTemplater
  _emptyDom: -> $('<li/>')

util.extend(module.exports,
  CollectionViewTemplater: CollectionViewTemplater
  CollectionView: CollectionViewImpl

  registerWith: (library) -> library.register(OrderedCollection, CollectionViewImpl, context: 'default')
)

