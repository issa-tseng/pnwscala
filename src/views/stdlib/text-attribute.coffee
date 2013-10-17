util = require('janus').util
DomView = require('janus').DomView
TextAttribute = require('janus').attribute.TextAttribute

eventMap =
  default: 'change input'
  change: 'change'

class TextAttributeView extends DomView
  _render: ->
    input = this._baseTag()
      .attr('id', this.options.inputId ? '')
      .val(this.subject.getValue() ? '')

    this._bindInput(input)

    input

  _baseTag: -> $('<input/>').attr('type', 'text')

  _bind: (input) ->
    this._bindInput(input)

  _bindInput: (input) ->
    this.subject.watchValue().on 'changed', (newValue) =>
      input.val(newValue) unless input.hasClass('focus')

  _wireEvents: ->
    input = this.artifact()

    input.on('focus', -> input.addClass('focus'))
    input.on('blur', -> input.removeClass('focus'))

    input.on(eventMap[this.options.commit ? 'default'], => this._handle(input.val()))

  _handle: (x) -> this.subject.setValue(x)

class MultilineTextAttributeView extends TextAttributeView
  _baseTag: -> $('<textarea/>')

util.extend(module.exports,
  TextAttributeView: TextAttributeView

  registerWith: (library) ->
    library.register(TextAttribute, TextAttributeView, context: 'edit')
    library.register(TextAttribute, MultilineTextAttributeView, context: 'edit', attributes: { style: 'multiline' })
)

