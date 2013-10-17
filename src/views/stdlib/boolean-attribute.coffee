util = require('janus').util
Templater = require('janus').Templater
DomView = require('janus').DomView
BooleanAttribute = require('janus').attribute.BooleanAttribute

class BooleanToggleButtonView extends DomView
  _render: ->
    this._button = $('<a/>')
    this._button.addClass('button')
    this._button.addClass(this.options.className ? '')
    this._button.attr('id', this.options.inputId ? '')

    this._handleState()
    this.subject.watchValue().on('changed', => this._handleState())

    this._button

  _handleState: ->
    this._button.text(
      this.subject.getValue()
    )

    this._button.toggleClass('checked', this.subject.getValue() is true)

  _wireEvents: ->
    this._button.on 'click', (event) =>
      event.preventDefault()
      this.subject.setValue(!this._button.hasClass('checked'))

class BooleanCheckboxView extends DomView
  _render: ->
    this._check = $('<input/>')
    this._check.attr('type', 'text')
    this._check.attr('id', this.options.inputId)

    this._handleState()
    this.subject.watchValue().on('changed', => this._handleState())

    this._check

  _handleState: ->
    this._check.prop('checked', this.subject.getValue())

  _wireEvents: ->
    this._check.on 'change input', (event) =>
      event.preventDefault()
      this.subject.setValue(this._check.prop('checked'))


util.extend(module.exports,
  BooleanCheckboxView: BooleanCheckboxView
  BooleanToggleButtonView: BooleanToggleButtonView

  registerWith: (library) ->
    library.register(BooleanAttribute, BooleanCheckboxView, context: 'edit')
    library.register(BooleanAttribute, BooleanToggleButtonView, context: 'edit', attributes: { style: 'button' })
)

