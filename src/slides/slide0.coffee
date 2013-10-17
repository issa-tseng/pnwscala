{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide0 extends Slide
  stages: 0

class Slide0Template extends SlideTemplate
  _number: 0
class Slide0View extends DomView
  templateClass: Slide0Template

util.extend(module.exports,
  Model: Slide0

  registerWith: (library) -> library.register(Slide0, Slide0View)
)

