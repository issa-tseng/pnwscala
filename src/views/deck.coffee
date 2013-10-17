{ util, Templater, DomView } = require('janus')

Deck = require('../models/deck').Deck
markup = require('./deck.html')

class DeckTemplate extends Templater
  _dom: -> $(markup)
  _binding: ->
    binding = super()

    binding.find('.deck').classGroup('slide-').from('slide')
    binding.find('.slides').render(this.options.app).from('slides')

    binding.find('.byLine').classed('active').from('slide').flatMap((slide) -> slide > 0)
    binding.find('.subject').text().from('subject')

keys =
  left: 37
  up: 38
  right: 39
  down: 40

class DeckView extends DomView
  templateClass: DeckTemplate

  _wireEvents: ->
    $(document).on 'keydown', (event) =>
      return if event.isDefaultPrevented()

      if event.which is keys.left
        this.subject.previous()
      else if event.which is keys.up
        this.subject.previousSlide()
      else if event.which is keys.right
        this.subject.advance()
      else if event.which is keys.down
        this.subject.advanceSlide()

util.extend(module.exports,
  DeckTemplate: DeckTemplate
  DeckView: DeckView

  registerWith: (library) -> library.register(Deck, DeckView)
)

