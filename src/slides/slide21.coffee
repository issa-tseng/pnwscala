{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide21 extends Slide
  stages: 0

class Slide21Template extends SlideTemplate
  _number: 21

class Slide21View extends DomView
  templateClass: Slide21Template

util.extend(module.exports,
  Model: Slide21

  registerWith: (library) ->
    library.register(Slide21, Slide21View)
)

