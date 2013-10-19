{ util, attribute } = require('janus')

TextAttributeView = require('./text-attribute').TextAttributeView

class NumberAttributeView extends TextAttributeView
  _handle: (x) -> this.subject.setValue(parseFloat(x))

util.extend(module.exports,
  NumberAttributeView: NumberAttributeView

  registerWith: (library) ->
    library.register(attribute.NumberAttribute, NumberAttributeView, context: 'edit')
)

