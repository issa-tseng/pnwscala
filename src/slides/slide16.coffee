{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide16 extends Slide
  subject: 'Difficulties'
  stages: 0

class Slide16Template extends SlideTemplate
  _number: 16

class Slide16View extends DomView
  templateClass: Slide16Template

util.extend(module.exports,
  Model: Slide16

  registerWith: (library) ->
    library.register(Slide16, Slide16View)
)

