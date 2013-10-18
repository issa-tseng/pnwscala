{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide10 extends Slide
  subject: 'Origins'
  stages: 5

class Slide10Template extends SlideTemplate
  _number: 10

  _binding: ->
    binding = super()

    binding.find('.highlight.constr').classed('active').from('stage').flatMap((stage) -> stage is 3)
    binding.find('.highlight.map').classed('active').from('stage').flatMap((stage) -> stage is 4)
    binding.find('.highlight.setVal').classed('active').from('stage').flatMap((stage) -> stage is 5)

class Slide10View extends DomView
  templateClass: Slide10Template

util.extend(module.exports,
  Model: Slide10

  registerWith: (library) -> library.register(Slide10, Slide10View)
)

