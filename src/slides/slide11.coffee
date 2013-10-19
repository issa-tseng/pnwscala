{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide11 extends Slide
  subject: 'Consequences'
  stages: 33

class Slide11Template extends SlideTemplate
  _number: 11

  _binding: ->
    binding = super()

    binding.find('.highlight.constr').classed('active').from('stage').flatMap((stage) -> stage is 3)
    binding.find('.highlight.map').classed('active').from('stage').flatMap((stage) -> stage is 4)
    binding.find('.highlight.setVal').classed('active').from('stage').flatMap((stage) -> stage is 5)

class Slide11View extends DomView
  templateClass: Slide11Template

util.extend(module.exports,
  Model: Slide11

  registerWith: (library) -> library.register(Slide11, Slide11View)
)

