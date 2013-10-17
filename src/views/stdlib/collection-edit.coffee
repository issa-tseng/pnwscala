util = require('janus').util
Base = require('janus').Base
{ ListEditView, ListEditItemTemplate, ListEditItem } = require('janus').application.listEdit
Templater = require('janus').Templater
OrderedCollection = require('janus').collection.OrderedCollection

itemMarkup = require('./collection-edit-item.html')

class CollectionEditViewTemplate extends Templater
  _dom: -> $('<ul/>')

class CollectionEditViewImpl extends ListEditView
  templateClass: CollectionEditViewTemplate

  _emptyDom: -> $('<li/>')

class CollectionEditItemTemplate extends ListEditItemTemplate
  _dom: -> $(itemMarkup)

class CollectionEditItemImpl extends ListEditItem
  templateClass: CollectionEditItemTemplate

util.extend(module.exports,
  CollectionEditViewTemplate: CollectionEditViewTemplate
  CollectionEditView: CollectionEditViewImpl

  CollectionEditItemTemplate: CollectionEditItemTemplate
  CollectionEditItemImpl: CollectionEditItemImpl

  registerWith: (library) ->
    library.register(OrderedCollection, CollectionEditViewImpl, context: 'edit')
    library.register(Base, CollectionEditItemImpl, context: 'edit-wrapper')
)

