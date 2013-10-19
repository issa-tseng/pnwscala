{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide19 extends Slide
  subject: 'Difficulties'
  stages: 0

class Slide19Template extends SlideTemplate
  _number: 19

class Slide19View extends DomView
  templateClass: Slide19Template

util.extend(module.exports,
  Model: Slide19

  registerWith: (library) ->
    library.register(Slide19, Slide19View)
)

