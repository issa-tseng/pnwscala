util = require('janus').util
VaryingView = require('janus').application.VaryingView
Templater = require('janus').Templater
Varying = require('janus').varying.Varying

class VaryingViewTemplate extends Templater
  _dom: -> $('<div/>')

class VaryingViewImpl extends VaryingView
  templateClass: VaryingViewTemplate

util.extend(module.exports,
  VaryingView: VaryingViewImpl

  registerWith: (library) -> library.register(Varying, VaryingViewImpl, context: 'default')
)

