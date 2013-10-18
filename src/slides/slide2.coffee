{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide2 extends Slide
  subject: 'Overview'
  stages: 0

class Slide2Template extends SlideTemplate
  _number: 2
class Slide2View extends DomView
  templateClass: Slide2Template

util.extend(module.exports,
  Model: Slide2

  registerWith: (library) -> library.register(Slide2, Slide2View)
)

