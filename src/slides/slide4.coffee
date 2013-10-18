{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide4 extends Slide
  subject: 'Justification'
  stages: 3

class Slide4Template extends SlideTemplate
  _number: 4
class Slide4View extends DomView
  templateClass: Slide4Template

util.extend(module.exports,
  Model: Slide4

  registerWith: (library) -> library.register(Slide4, Slide4View)
)

