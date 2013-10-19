(function() {
  var Issue, List, Model, Person, attribute, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, Issue = _ref.Issue, attribute = _ref.attribute, (_ref1 = _ref.collection, List = _ref1.List);

  Person = (function(_super) {
    var _ref3, _ref4;

    __extends(Person, _super);

    function Person() {
      _ref2 = Person.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Person.attribute('age', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref3 = _Class.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      _Class.prototype._issues = function() {
        return new List([
          new Issue({
            active: this.watchValue().map(function(age) {
              return age < 0;
            }),
            message: this.watchValue().map(function(age) {
              return "" + age + " is not a valid age; it is less than zero!";
            })
          })
        ]);
      };

      return _Class;

    })(attribute.NumberAttribute));

    Person.attribute('name.first', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref4 = _Class.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      _Class.prototype._issues = function() {
        return new List([
          new Issue({
            active: this.watchValue().map(function(name) {
              return (name != null) && /[0-9]/.test(name);
            }),
            message: 'First name cannot contain numbers! What kind of name is that?'
          })
        ]);
      };

      return _Class;

    })(attribute.TextAttribute));

    Person.attribute('name.last', attribute.TextAttribute);

    return Person;

  })(Model);

  util.extend(module.exports, {
    Person: Person
  });

}).call(this);
