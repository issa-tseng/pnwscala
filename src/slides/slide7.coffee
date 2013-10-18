{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide7 extends Slide
  subject: 'Origins'
  stages: 2

class Slide7Template extends SlideTemplate
  _number: 7
  _binding: ->
    binding = super()

    binding.find('.highlight.class').classed('active').from('stage').flatMap((stage) -> stage > 0)
    binding.find('.highlight.text').classed('active').from('stage').flatMap((stage) -> stage > 1)

class Slide7View extends DomView
  templateClass: Slide7Template

util.extend(module.exports,
  Model: Slide7

  registerWith: (library) -> library.register(Slide7, Slide7View)
)

