{ util, Model, Issue, attribute, collection: { List } } = require('janus')

class Person extends Model
  @attribute 'age', class extends attribute.NumberAttribute
    _issues: -> new List([
      new Issue(
        active: this.watchValue().map((age) -> age < 0)
        message: this.watchValue().map((age) -> "#{age} is not a valid age; it is less than zero!")
      )
    ])
  @attribute 'name.first', class extends attribute.TextAttribute
    _issues: -> new List([
      new Issue(
        active: this.watchValue().map((name) -> name? and /[0-9]/.test(name))
        message: 'First name cannot contain numbers! What kind of name is that?'
      )
    ])
  @attribute('name.last', attribute.TextAttribute)

util.extend(module.exports,
  Person: Person
)

