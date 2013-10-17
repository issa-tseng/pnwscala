util = require('janus').util
DomView = require('janus').DomView
Templater = require('janus').Templater
Varying = require('janus').varying.Varying

class LiteralTemplate extends Templater
  _dom: -> $('<span/>').addClass('literal')

  _binding: ->
    binding = super()
    binding.find('span').text().fromVarying(Varying.ly)

class LiteralView extends DomView
  templateClass: LiteralTemplate

util.extend(module.exports,
  LiteralTemplate: LiteralTemplate
  LiteralView: LiteralView

  registerWith: (library) ->
    library.register(Number, LiteralView, context: 'default')
    library.register(Boolean, LiteralView, context: 'default')
    library.register(String, LiteralView, context: 'default')
)

