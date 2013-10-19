{ util, Templater, DomView, Issue } = require('janus')

markup = require('./issue.html')

class IssueTemplate extends Templater
  _dom: -> $(markup)
  _binding: ->
    binding = super()

    binding.find('.issue').classed('valid').fromVarying((issue) -> issue.active)
    binding.find('.message').text().fromVarying((issue) -> issue.message)

class IssueView extends DomView
  templateClass: IssueTemplate

util.extend(module.exports,
  IssueView: IssueView

  registerWith: (library) -> library.register(Issue, IssueView)
)

