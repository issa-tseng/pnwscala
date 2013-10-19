(function() {
  var DomView, Issue, IssueTemplate, IssueView, Templater, markup, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, DomView = _ref.DomView, Issue = _ref.Issue;

  markup = require('./issue.html');

  IssueTemplate = (function(_super) {
    __extends(IssueTemplate, _super);

    function IssueTemplate() {
      _ref1 = IssueTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    IssueTemplate.prototype._dom = function() {
      return $(markup);
    };

    IssueTemplate.prototype._binding = function() {
      var binding;
      binding = IssueTemplate.__super__._binding.call(this);
      binding.find('.issue').classed('valid').fromVarying(function(issue) {
        return issue.active;
      });
      return binding.find('.message').text().fromVarying(function(issue) {
        return issue.message;
      });
    };

    return IssueTemplate;

  })(Templater);

  IssueView = (function(_super) {
    __extends(IssueView, _super);

    function IssueView() {
      _ref2 = IssueView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    IssueView.prototype.templateClass = IssueTemplate;

    return IssueView;

  })(DomView);

  util.extend(module.exports, {
    IssueView: IssueView,
    registerWith: function(library) {
      return library.register(Issue, IssueView);
    }
  });

}).call(this);
