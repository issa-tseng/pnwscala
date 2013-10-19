{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide20 extends Slide
  subject: 'Lessons'
  stages: 0

class Slide20Template extends SlideTemplate
  _number: 20

class Slide20View extends DomView
  templateClass: Slide20Template

util.extend(module.exports,
  Model: Slide20

  registerWith: (library) ->
    library.register(Slide20, Slide20View)
)

