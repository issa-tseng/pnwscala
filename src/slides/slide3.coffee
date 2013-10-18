{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide3 extends Slide
  subject: 'Definition'
  stages: 1

class Slide3Template extends SlideTemplate
  _number: 3
class Slide3View extends DomView
  templateClass: Slide3Template

util.extend(module.exports,
  Model: Slide3

  registerWith: (library) -> library.register(Slide3, Slide3View)
)

