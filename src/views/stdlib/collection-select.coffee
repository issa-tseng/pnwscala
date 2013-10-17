{ util, DomView, templater, Templater, collection: { OrderedCollection }, Base } = require('janus')

CollectionView = require('./collection').CollectionView

itemMarkup = require('./collection-select-item.html')

class CollectionSelectView extends CollectionView
  _initialize: ->
    super()
    this.options.childOpts = util.extendNew(this.options.childOpts, {
      aux:
        context: this.options.itemContext
        view: this.options.itemView
        list: this.subject
        attr: this.options.aux.attr
    })
    this.options.itemView = this.options.selectWrapperView ? undefined
    this.options.itemContext = this.options.selectWrapperContext ? 'select-wrapper'


class CollectionSelectItemTemplate extends Templater
  _dom: -> $(itemMarkup)
  _binding: ->
    binding = super()

    binding.find('> li > .selectControls .selectButton').text()
      .fromSelf()
      .andVarying((_, aux) -> aux.attr.watchValue())
      .flatMap((subject, currentValue) -> if subject is currentValue then 'Selected' else 'Select')

    binding.find('> li > .selectControls .selectButton').classed('ss-check selected')
      .fromSelf()
      .andVarying((_, aux) -> aux.attr.watchValue())
      .flatMap((subject, currentValue) -> subject is currentValue)

    binding.find('.selectItem').render(this.options.app)
      .fromSelf()
      .andAux('view')
      .andAux('context')
      .flatMap (item, viewClass, context) =>
        if viewClass?
          view = new viewClass(item, options: { app: this.options.app })
          new templater.WithView(view)
        else
          new templater.WithOptions(item, context: context ? 'default')

    binding

class CollectionSelectItemView extends DomView
  templateClass: CollectionSelectItemTemplate

  _wireEvents: ->
    dom = this.artifact()

    dom.find('> .selectControls .selectButton').on 'click', (event) =>
      event.preventDefault()
      this.options.aux.attr.setValue(this.subject)


util.extend(module.exports,
  CollectionSelectView: CollectionSelectView

  CollectionSelectItemTemplate: CollectionSelectItemTemplate
  CollectionSelectItemView: CollectionSelectItemView

  registerWith: (library) ->
    library.register(OrderedCollection, CollectionSelectView, context: 'select')
    library.register(Base, CollectionSelectItemView, context: 'select-wrapper')

    library.register(String, CollectionSelectItemView, context: 'select-wrapper')
    library.register(Boolean, CollectionSelectItemView, context: 'select-wrapper')
    library.register(Number, CollectionSelectItemView, context: 'select-wrapper')
)

