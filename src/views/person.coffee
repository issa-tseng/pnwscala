{ util, DomView, attribute, collection: { List }, Templater, varying: { Varying } } = require('janus')

Person = require('../models/person').Person

markup = require('./person.html')

class PersonTemplate extends Templater
  _dom: -> $(markup).find('.view')
  _binding: ->
    binding = super()
    binding.find('.first').from('name.first')
    binding.find('.last').from('name.last')
    binding.find('.age').from('age')
    binding.find('.ageLabel').classed('hide').from('age').flatMap((age) -> !util.isNumber(age))

class PersonView extends DomView
  templateClass: PersonTemplate

class PersonEditTemplate extends Templater
  _dom: -> $(markup).find('.edit')
  _binding: ->
    binding = super()
    binding.find('.issues').render(this.options.app).fromVarying((person) -> Varying.ly(person.issues()))
    binding.find('.first').render(this.options.app, context: 'edit').fromAttribute('name.first').fallback('(person)')
    binding.find('.last').render(this.options.app, context: 'edit').fromAttribute('name.last').fallback('(name)')
    binding.find('.age').render(this.options.app, context: 'edit').fromAttribute('age').fallback('some')

class PersonEditView extends DomView
  templateClass: PersonEditTemplate

util.extend(module.exports,
  registerWith: (library) ->
    library.register(Person, PersonView)
    library.register(Person, PersonEditView, context: 'edit')
)

