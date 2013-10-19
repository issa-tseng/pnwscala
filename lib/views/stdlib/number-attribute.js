(function() {
  var NumberAttributeView, TextAttributeView, attribute, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, attribute = _ref.attribute;

  TextAttributeView = require('./text-attribute').TextAttributeView;

  NumberAttributeView = (function(_super) {
    __extends(NumberAttributeView, _super);

    function NumberAttributeView() {
      _ref1 = NumberAttributeView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    NumberAttributeView.prototype._handle = function(x) {
      return this.subject.setValue(parseFloat(x));
    };

    return NumberAttributeView;

  })(TextAttributeView);

  util.extend(module.exports, {
    NumberAttributeView: NumberAttributeView,
    registerWith: function(library) {
      return library.register(attribute.NumberAttribute, NumberAttributeView, {
        context: 'edit'
      });
    }
  });

}).call(this);
