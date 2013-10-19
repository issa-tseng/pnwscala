{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide15 extends Slide
  subject: 'Difficulties'
  stages: 0

class Slide15Template extends SlideTemplate
  _number: 15

class Slide15View extends DomView
  templateClass: Slide15Template

util.extend(module.exports,
  Model: Slide15

  registerWith: (library) ->
    library.register(Slide15, Slide15View)
)

