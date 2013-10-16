{ util, Library, application: { App } } = require('janus')

# set up libraries.
viewLibrary = new Library()
storeLibrary = new Library()

# set up our application.
app = new App(
  views: viewLibrary
  stores: storeLibrary
)

# register standardlib items.

# register janus console items.

# register pnwscala items.

# init application.

