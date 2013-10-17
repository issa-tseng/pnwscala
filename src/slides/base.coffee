{ util, Templater } = require('janus')
markup = require('./markup.html')

class SlideTemplate extends Templater
  _dom: -> $(markup).find(".slide#{this._number}")
  _number: 0

  _binding: ->
    binding = super()
    binding.find('.slide').classGroup('stage-').from('stage')
    binding

util.extend(module.exports,
  SlideTemplate: SlideTemplate
)

