{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide5 extends Slide
  subject: 'Origins'
  stages: 3

class Slide5Template extends SlideTemplate
  _number: 5
class Slide5View extends DomView
  templateClass: Slide5Template

util.extend(module.exports,
  Model: Slide5

  registerWith: (library) -> library.register(Slide5, Slide5View)
)

