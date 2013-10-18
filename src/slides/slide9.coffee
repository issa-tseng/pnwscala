{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide9 extends Slide
  subject: 'Origins'
  stages: 2

class Slide9Template extends SlideTemplate
  _number: 9

  _binding: ->
    binding = super()

    binding.find('.highlight.flatMap').classed('active').from('stage').flatMap((stage) -> stage is 2)

class Slide9View extends DomView
  templateClass: Slide9Template

util.extend(module.exports,
  Model: Slide9

  registerWith: (library) -> library.register(Slide9, Slide9View)
)

