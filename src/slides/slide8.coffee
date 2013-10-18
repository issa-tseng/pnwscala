{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide8 extends Slide
  subject: 'Origins'
  stages: 1

class Slide8Template extends SlideTemplate
  _number: 8

class Slide8View extends DomView
  templateClass: Slide8Template

util.extend(module.exports,
  Model: Slide8

  registerWith: (library) -> library.register(Slide8, Slide8View)
)

