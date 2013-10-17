{ util, DomView } = require('janus')

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide1 extends Slide
  stages: 1

class Slide1Template extends SlideTemplate
  _number: 1
class Slide1View extends DomView
  templateClass: Slide1Template

util.extend(module.exports,
  Model: Slide1

  registerWith: (library) -> library.register(Slide1, Slide1View)
)

