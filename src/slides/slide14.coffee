{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide14 extends Slide
  subject: 'Difficulties'
  stages: 1

class Slide14Template extends SlideTemplate
  _number: 14

class Slide14View extends DomView
  templateClass: Slide14Template

util.extend(module.exports,
  Model: Slide14

  registerWith: (library) ->
    library.register(Slide14, Slide14View)
)

