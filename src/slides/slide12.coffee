{ util, DomView } = require('janus')

Person = require('../models/person').Person

Slide = require('../models/slide').Slide
SlideTemplate = require('./base').SlideTemplate

class Slide12 extends Slide
  subject: 'Consequences'
  stages: 0

class Slide12Template extends SlideTemplate
  _number: 12

  _binding: ->
    binding = super()

    binding.find('.personEdit').render(this.options.app, context: 'edit').fromAux('person')
    binding.find('.personView').render(this.options.app).fromAux('person')

class Slide12View extends DomView
  templateClass: Slide12Template

  _initialize: -> this.person = new Person()
  _auxData: -> { person: this.person }

util.extend(module.exports,
  Model: Slide12

  registerWith: (library) ->
    library.register(Slide12, Slide12View)
)


