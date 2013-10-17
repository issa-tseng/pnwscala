{ util, Model, attribute, varying: { Varying } } = require('janus')

class Deck extends Model
  @attribute 'slide', class extends attribute.NumberAttribute
    default: -> 0

  @bind('current') .fromVarying ->
    Varying.combine([
      this.watch('slides')
      this.watch('slide')
    ], (slides, idx) -> slides?.watchAt(idx))

  @bind('subject')
    .from('current')
    .flatMap((current) -> current?.watch('subject'))

  advance: ->
    slide = this.get('current')
    if slide.get('complete') is true
      this.advanceSlide()
    else
      slide.advance()

  previous: ->
    slide = this.get('current')
    if slide.get('stage') is 0
      this.previousSlide()
    else
      slide.previous()

  advanceSlide: -> this.set('slide', this.get('slide') + 1)

  previousSlide: -> this.set('slide', this.get('slide') - 1) unless this.get('slide') is 0

util.extend(module.exports,
  Deck: Deck
)

