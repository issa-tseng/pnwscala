(function() {
  var DomView, List, Person, PersonEditTemplate, PersonEditView, PersonTemplate, PersonView, Templater, Varying, attribute, markup, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, attribute = _ref.attribute, (_ref1 = _ref.collection, List = _ref1.List), Templater = _ref.Templater, (_ref2 = _ref.varying, Varying = _ref2.Varying);

  Person = require('../models/person').Person;

  markup = require('./person.html');

  PersonTemplate = (function(_super) {
    __extends(PersonTemplate, _super);

    function PersonTemplate() {
      _ref3 = PersonTemplate.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    PersonTemplate.prototype._dom = function() {
      return $(markup).find('.view');
    };

    PersonTemplate.prototype._binding = function() {
      var binding;
      binding = PersonTemplate.__super__._binding.call(this);
      binding.find('.first').from('name.first');
      binding.find('.last').from('name.last');
      binding.find('.age').from('age');
      return binding.find('.ageLabel').classed('hide').from('age').flatMap(function(age) {
        return !util.isNumber(age);
      });
    };

    return PersonTemplate;

  })(Templater);

  PersonView = (function(_super) {
    __extends(PersonView, _super);

    function PersonView() {
      _ref4 = PersonView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    PersonView.prototype.templateClass = PersonTemplate;

    return PersonView;

  })(DomView);

  PersonEditTemplate = (function(_super) {
    __extends(PersonEditTemplate, _super);

    function PersonEditTemplate() {
      _ref5 = PersonEditTemplate.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    PersonEditTemplate.prototype._dom = function() {
      return $(markup).find('.edit');
    };

    PersonEditTemplate.prototype._binding = function() {
      var binding;
      binding = PersonEditTemplate.__super__._binding.call(this);
      binding.find('.issues').render(this.options.app).fromVarying(function(person) {
        return Varying.ly(person.issues());
      });
      binding.find('.first').render(this.options.app, {
        context: 'edit'
      }).fromAttribute('name.first').fallback('(person)');
      binding.find('.last').render(this.options.app, {
        context: 'edit'
      }).fromAttribute('name.last').fallback('(name)');
      return binding.find('.age').render(this.options.app, {
        context: 'edit'
      }).fromAttribute('age').fallback('some');
    };

    return PersonEditTemplate;

  })(Templater);

  PersonEditView = (function(_super) {
    __extends(PersonEditView, _super);

    function PersonEditView() {
      _ref6 = PersonEditView.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    PersonEditView.prototype.templateClass = PersonEditTemplate;

    return PersonEditView;

  })(DomView);

  util.extend(module.exports, {
    registerWith: function(library) {
      library.register(Person, PersonView);
      return library.register(Person, PersonEditView, {
        context: 'edit'
      });
    }
  });

}).call(this);
