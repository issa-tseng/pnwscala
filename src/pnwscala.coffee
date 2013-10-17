{ util, Library, application: { App } } = require('janus')

# set up libraries.
viewLibrary = new Library()
storeLibrary = new Library()

# set up our application.
app = new App(
  views: viewLibrary
  stores: storeLibrary
)
window.app = app

# register standardlib items.
stdlib = require('./views/stdlib/stdlib')
lib.registerWith(viewLibrary) for lib in stdlib

# register janus console items.
jConsole = require('janus-console')
jConsole.views.registerWith(viewLibrary)
jConsole.actions.registerWith(storeLibrary, 'local')
jConsole.setHook(app)

# register deck view.
require('./views/deck').registerWith(viewLibrary)

# register pnwscala slides.
slides = require('./slides/slides')
slide.registerWith(viewLibrary) for slide in slides

# init application.
deck = require('./slides/deck')
deckView = app.getView(deck)
$('.main').append(deckView.artifact())
deckView.wireEvents()

