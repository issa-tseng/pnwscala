{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide13 extends Slide
  subject: 'Difficulties'
  stages: 0

class Slide13Template extends SlideTemplate
  _number: 13

class Slide13View extends DomView
  templateClass: Slide13Template

util.extend(module.exports,
  Model: Slide13

  registerWith: (library) ->
    library.register(Slide13, Slide13View)
)

