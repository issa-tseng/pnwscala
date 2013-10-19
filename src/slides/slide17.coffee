{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide17 extends Slide
  subject: 'Difficulties'
  stages: 0

class Slide17Template extends SlideTemplate
  _number: 17

class Slide17View extends DomView
  templateClass: Slide17Template

util.extend(module.exports,
  Model: Slide17

  registerWith: (library) ->
    library.register(Slide17, Slide17View)
)

