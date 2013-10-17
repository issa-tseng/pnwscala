
util = require('janus').util
Base = require('janus').Base
{ List, OrderedCollection } = require('janus').collection
DomView = require('janus').DomView
EnumAttribute = require('janus').attribute.EnumAttribute
Templater = require('janus').Templater
templater = require('janus').templater
Varying = require('janus').varying.Varying

textItemMarkup = require('./enum-text-item.html')

CollectionViewTemplater = require('./collection').CollectionViewTemplater
CollectionViewImpl = require('./collection').CollectionView

class EnumAttributeView extends DomView
  _initialize: ->
    this._idToOption = {}
    this._idToValue = {}

  _render: ->
    this._select = $('<select/>')
    this._select.attr('id', this.options.inputId)
    this._handleOptions()

    # this is an unfortunate quirk; domino doesn't correctly handle the
    # select.value case, so we have to manually find the option and set it if
    # we find we're on zepto+domino.
    if $.fn.jquery?
      this._select.val(this.subject.getValue())
    else
      this._select.children("[value=#{this.subject.getValue()}]").attr('selected', true)

    this.subject.watchValue().on('changed', (newValue) => this._select.val(this._idForChoice(newValue)))

    this._select

  _handleOptions: ->
    options = this.subject.values()
    if options instanceof OrderedCollection
      this._renderOptions(options)
    else if util.isArray(options)
      this._renderOptions(new List(options))
    else if options instanceof Varying
      handleVarying = (value) =>
        if value instanceof OrderedCollection
          this._renderOptions(value)
        else
          this._renderOptions(new List())

      options.on('changed', handleVarying)
      handleVarying(options.value)

  _renderOptions: (options) ->
    # clear out options
    this._select.empty()

    # using a base class instance as a disposable listener
    this._listListener?.destroy()
    this._listListener = new Base()

    # if we're nullable, add a first option
    this._select.append(this._renderOption(null)) if this.subject.nullable is true

    # add existing elements
    this._select.append(this._renderOption(choice)) for choice in options.list

    # listen to changes
    this._listListener.listenTo options, 'added', (option, idx) =>
      if idx is 0
        this._select.prepend(this._renderOption(option))
      else
        this._select.find("> :nth-child(#{idx})").after(this._renderOption(option))

    this._listListener.listenTo options, 'removed', (choice) =>
      option = this._idToOption[this._idForChoice(choice)]

      if option.attr('selected') is 'selected'
        option.remove()
        this.subject.setValue(this._select.val())
      else
        option.remove()

      delete this._idToOption[this._idForChoice(choice)]

    null

  _renderOption: (choice) ->
    id = this._idForChoice(choice)

    option = $('<option/>')
    option.attr('value', id)

    if choice is null
      Varying.ly(this._uiString(null)).reactNow((text) -> option.text(text?.toString() ? ''))
    else if util.isPrimitive(choice)
      Varying.ly(this._uiString(choice)).reactNow((text) -> option.text(text?.toString() ? ''))
    else if choice instanceof Varying
      choice.reactNow((text) -> option.text(text))
    else
      view = this.options.app.getView(choice, context: 'text')
      if view?
        textVary = view.artifact()
        update = (value) -> option.text(value)

        textVary.on('changed', update)
        update(textVary.value)
      else
        option.text('')

    this._idToValue[id] = choice
    this._idToOption[id] = option # returns <option>!

  _idForChoice: (choice) ->
    if !choice?
      null
    else if util.isString(choice) or util.isNumber(choice)
      choice
    else if choice instanceof Base
      choice._id
    else
      choice.toString()

  _uiString: (choice) ->
    if !choice?
      ''
    else
      choice.toString()

  _wireEvents: ->
    select = this._select

    select.on('focus', -> select.addClass('focus'))
    select.on('blur', -> select.removeClass('focus'))

    select.on('change input', => this.subject.setValue(this._idToValue[select.val()]))

class EnumAttributeListTemplate extends Templater
  # TODO: fix wrapping
  _dom: -> $('<div><div class="listEnum"/></div>')
  _binding: ->
    binding = super()

    binding.find('.listEnum')
      .render(this.options.app,
        context: 'select'
        constructorOpts:
          selectWrapperView: this.options.selectWrapperView
          selectWrapperContext: this.options.selectWrapperContext
          itemView: this.options.itemView
          itemContext: this.options.itemContext
      )
      .fromSelf()
      .fromVarying((attr) -> Varying.ly(attr.values()))
      .flatMap((self, list) =>
        if list instanceof OrderedCollection
          new templater.WithAux(list, attr: self)
        else if util.isArray(list)
          new templater.WithAux(new List(list), attr: self)
        else
          list
      )

class EnumAttributeListView extends DomView
  templateClass: EnumAttributeListTemplate
  _templaterOptions: -> {
    selectWrapperView: this.options.selectWrapperView
    selectWrapperContext: this.options.selectWrapperContext
    itemView: this.options.itemView
    itemContext: this.options.itemContext
  }


util.extend(module.exports,
  EnumAttributeView: EnumAttributeView
  EnumAttributeListView: EnumAttributeListView

  registerWith: (library) ->
    library.register(EnumAttribute, EnumAttributeView, context: 'edit')
    library.register(EnumAttribute, EnumAttributeListView, context: 'edit', attributes: { style: 'list' })
)

