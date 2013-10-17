{ util, Model, collection: { List }, attribute, varying: { Varying } } = require('janus')

class Slide extends Model
  @attribute 'stage', class extends attribute.NumberAttribute
    default: -> 0

  @bind('complete')
    .from('stage')
    .andVarying(-> Varying.ly(this.stages))
    .flatMap((stage, stages) -> stage is stages)

  advance: -> this.set('stage', this.get('stage') + 1)
  previous: -> this.set('stage', this.get('stage') - 1) unless this.get('stage') is 0

class Slides extends List
  @modelClass: Slide

util.extend(module.exports,
  Slide: Slide
  Slides: Slides
)

