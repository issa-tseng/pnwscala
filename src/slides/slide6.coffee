{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide6 extends Slide
  subject: 'Origins'
  stages: 3

class Slide6Template extends SlideTemplate
  _number: 6
class Slide6View extends DomView
  templateClass: Slide6Template

util.extend(module.exports,
  Model: Slide6

  registerWith: (library) -> library.register(Slide6, Slide6View)
)

