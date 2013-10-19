{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide18 extends Slide
  subject: 'Difficulties'
  stages: 0

class Slide18Template extends SlideTemplate
  _number: 18

class Slide18View extends DomView
  templateClass: Slide18Template

util.extend(module.exports,
  Model: Slide18

  registerWith: (library) ->
    library.register(Slide18, Slide18View)
)

