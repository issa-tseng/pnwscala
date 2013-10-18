;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
  var Deck, Model, Varying, attribute, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, (_ref1 = _ref.varying, Varying = _ref1.Varying);

  Deck = (function(_super) {
    var _ref3;

    __extends(Deck, _super);

    function Deck() {
      _ref2 = Deck.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Deck.attribute('slide', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref3 = _Class.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      _Class.prototype["default"] = function() {
        return 0;
      };

      return _Class;

    })(attribute.NumberAttribute));

    Deck.bind('current').fromVarying(function() {
      return Varying.combine([this.watch('slides'), this.watch('slide')], function(slides, idx) {
        return slides != null ? slides.watchAt(idx) : void 0;
      });
    });

    Deck.bind('subject').from('current').flatMap(function(current) {
      return current != null ? current.subject : void 0;
    });

    Deck.prototype.advance = function() {
      var slide;
      slide = this.get('current');
      if (slide.get('complete') === true) {
        return this.advanceSlide();
      } else {
        return slide.advance();
      }
    };

    Deck.prototype.previous = function() {
      var slide;
      slide = this.get('current');
      if (slide.get('stage') === 0) {
        return this.previousSlide();
      } else {
        return slide.previous();
      }
    };

    Deck.prototype.advanceSlide = function() {
      return this.set('slide', this.get('slide') + 1);
    };

    Deck.prototype.previousSlide = function() {
      if (this.get('slide') !== 0) {
        return this.set('slide', this.get('slide') - 1);
      }
    };

    return Deck;

  })(Model);

  util.extend(module.exports, {
    Deck: Deck
  });

}).call(this);

},{"janus":112}],2:[function(require,module,exports){
(function() {
  var List, Model, Slide, Slides, Varying, attribute, util, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, (_ref1 = _ref.collection, List = _ref1.List), attribute = _ref.attribute, (_ref2 = _ref.varying, Varying = _ref2.Varying);

  Slide = (function(_super) {
    var _ref4;

    __extends(Slide, _super);

    function Slide() {
      _ref3 = Slide.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide.attribute('stage', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref4 = _Class.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      _Class.prototype["default"] = function() {
        return 0;
      };

      return _Class;

    })(attribute.NumberAttribute));

    Slide.bind('complete').from('stage').andVarying(function() {
      return Varying.ly(this.stages);
    }).flatMap(function(stage, stages) {
      return stage === stages;
    });

    Slide.prototype.advance = function() {
      return this.set('stage', this.get('stage') + 1);
    };

    Slide.prototype.previous = function() {
      if (this.get('stage') !== 0) {
        return this.set('stage', this.get('stage') - 1);
      }
    };

    return Slide;

  })(Model);

  Slides = (function(_super) {
    __extends(Slides, _super);

    function Slides() {
      _ref4 = Slides.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Slides.modelClass = Slide;

    return Slides;

  })(List);

  util.extend(module.exports, {
    Slide: Slide,
    Slides: Slides
  });

}).call(this);

},{"janus":112}],3:[function(require,module,exports){
(function() {
  var App, Library, app, deck, deckView, jConsole, lib, slide, slides, stdlib, storeLibrary, util, viewLibrary, _i, _j, _len, _len1, _ref, _ref1;

  _ref = require('janus'), util = _ref.util, Library = _ref.Library, (_ref1 = _ref.application, App = _ref1.App);

  viewLibrary = new Library();

  storeLibrary = new Library();

  app = new App({
    views: viewLibrary,
    stores: storeLibrary
  });

  window.app = app;

  stdlib = require('./views/stdlib/stdlib');

  for (_i = 0, _len = stdlib.length; _i < _len; _i++) {
    lib = stdlib[_i];
    lib.registerWith(viewLibrary);
  }

  jConsole = require('janus-console');

  jConsole.views.registerWith(viewLibrary);

  jConsole.actions.registerWith(storeLibrary, 'local');

  jConsole.setHook(app);

  require('./views/deck').registerWith(viewLibrary);

  slides = require('./slides/slides');

  for (_j = 0, _len1 = slides.length; _j < _len1; _j++) {
    slide = slides[_j];
    slide.registerWith(viewLibrary);
  }

  deck = require('./slides/deck');

  deckView = app.getView(deck);

  $('.main').append(deckView.artifact());

  deckView.wireEvents();

}).call(this);

},{"./slides/deck":5,"./slides/slides":12,"./views/deck":14,"./views/stdlib/stdlib":24,"janus":112,"janus-console":32}],4:[function(require,module,exports){
(function() {
  var SlideTemplate, Templater, markup, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater;

  markup = require('./markup.html');

  SlideTemplate = (function(_super) {
    __extends(SlideTemplate, _super);

    function SlideTemplate() {
      _ref1 = SlideTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    SlideTemplate.prototype._dom = function() {
      return $(markup).find(".slide" + this._number);
    };

    SlideTemplate.prototype._number = 0;

    SlideTemplate.prototype._binding = function() {
      var binding;
      binding = SlideTemplate.__super__._binding.call(this);
      binding.find('.slide').classGroup('stage-').from('stage');
      return binding;
    };

    return SlideTemplate;

  })(Templater);

  util.extend(module.exports, {
    SlideTemplate: SlideTemplate
  });

}).call(this);

},{"./markup.html":6,"janus":112}],5:[function(require,module,exports){
(function() {
  var Deck, Slides, slide, slides, util;

  util = require('janus').util;

  Deck = require('../models/deck').Deck;

  Slides = require('../models/slide').Slides;

  slides = require('./slides');

  module.exports = new Deck({
    slides: new Slides((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = slides.length; _i < _len; _i++) {
        slide = slides[_i];
        _results.push(new slide.Model());
      }
      return _results;
    })())
  });

}).call(this);

},{"../models/deck":1,"../models/slide":2,"./slides":12,"janus":112}],6:[function(require,module,exports){
(function(){module.exports = '<div id="slides"><div class="slide slide0"><div class="content"><h2>PNW Scala 2013</h2><h1 class="left">Scala<br/>for<br/>Javascript<br/>Kiddies</h1><h1 class="right">Javascript<br/>for<br/>Scala<br/>Nerds</h1><h2>Clint Tseng &bull; Socrata</h2></div></div><div class="slide slide1"><div class="content"><h1>Nothing here is new.<span class="asterisk">*</span></h1><p class="asterisk">* (I&apos;m pretty sure)</p></div></div><div class="slide slide2"><div class="content"><h1>Janus</h1><ul><li>Definition</li><li>Justification</li><li>Origins</li><li>Consequences</li><li>Difficulties</li></ul></div></div><div class="slide slide3"><div class="content"><h1>Janus is a web application framework focused on the organization of interface code into resuable, manageable pieces.</h1><ul><li>Backbone.js</li><li>Angular</li><li>Batman</li><li>Meteor</li><li>&hellip;</li></ul></div></div><div class="slide slide4"><div class="logo"><svg width="800px" height="800px" viewBox="0 0 92 93" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M46,93 C20.594936,93 0,72.405064 0,47 C0,21.594936 20.594936,1 46,1 C51.4597667,1 56.6973743,1.95119167 61.556167,3.69690668 L58.8668408,11.233666 C54.8486348,9.7878885 50.5163265,9 46,9 C25.013208,9 8,26.013208 8,47 C8,67.986792 25.013208,85 46,85 C66.986792,85 84,67.986792 84,47 C84,41.2799175 82.7361408,35.8550204 80.4724563,30.9893605 L87.664672,27.47929 C90.4458161,33.4050551 92,40.0210309 92,47 C92,72.405064 71.405064,93 46,93 Z M46,93" fill="#FFFFFF"></path><path d="M46,72 C59.8071,72 71,60.8071 71,47 C71,43.3255893 70.2072923,39.8363224 68.783598,36.6939607 L75.0779322,33.6220901 C76.953734,37.6925211 78,42.2240783 78,47 C78,64.673088 63.673088,79 46,79 C28.326912,79 14,64.673088 14,47 C14,29.326912 28.326912,15 46,15 C49.8086157,15 53.4618289,15.6653682 56.8498436,16.8862424 L54.4966754,23.4809286 C51.844103,22.5224723 48.9830655,22 46,22 C32.1929,22 21,33.1929 21,47 C21,60.8071 32.1929,72 46,72 Z M46,72" fill="#CCCCCC"></path><path d="M46,58.921875 C52.5842608,58.921875 57.921875,53.5842608 57.921875,47 C57.921875,45.3834723 57.6001392,43.8420889 57.0172118,42.4363975 L63.3872146,39.3275978 C64.424117,41.6739689 65,44.2697332 65,47 C65,57.493396 56.493396,66 46,66 C35.506604,66 27,57.493396 27,47 C27,36.506604 35.506604,28 46,28 C48.2754558,28 50.457488,28.4000008 52.4796657,29.1335403 L50.1001978,35.8019307 C48.8217306,35.3336807 47.4407089,35.078125 46,35.078125 C39.4157392,35.078125 34.078125,40.4157392 34.078125,47 C34.078125,53.5842608 39.4157392,58.921875 46,58.921875 Z M46,58.921875" fill="#999999"></path><path d="M55.2235296,37.2255025 L89.7927586,20.8635706 C89.7927586,20.8635706 87.5783575,16.1886963 80.0740001,9.29946184 C72.5696428,2.41022735 68.0178432,0.687918726 68.0178432,0.687918726 L55.2235296,37.2255025 Z M55.2235296,37.2255025" fill="#DE0000"></path></g></svg></div><div class="content"><h1>Socrata</h1><h2>We use data and technology to improve informed governance.</h2><ul class="tech"><li>rojoma-json<div class="sub">JSON library with type-driven codecs</div></li><li>socrata-http<div class="sub">Awesome HTTP client/server library</div></li><li>soda server<div class="sub">Our open source data server</div></li><li>everything!<div class="sub">All our new backend projects!</div></li></ul><ul class="reasons"><li>508 compliance<div class="sub">Support for accesible users</div></li><li>SEO<div class="sub">Accounting for search engines</div></li></ul></div></div></div>';})();
},{}],7:[function(require,module,exports){
(function() {
  var DomView, Slide, Slide0, Slide0Template, Slide0View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide0 = (function(_super) {
    __extends(Slide0, _super);

    function Slide0() {
      _ref1 = Slide0.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide0.prototype.stages = 0;

    return Slide0;

  })(Slide);

  Slide0Template = (function(_super) {
    __extends(Slide0Template, _super);

    function Slide0Template() {
      _ref2 = Slide0Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide0Template.prototype._number = 0;

    return Slide0Template;

  })(SlideTemplate);

  Slide0View = (function(_super) {
    __extends(Slide0View, _super);

    function Slide0View() {
      _ref3 = Slide0View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide0View.prototype.templateClass = Slide0Template;

    return Slide0View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide0,
    registerWith: function(library) {
      return library.register(Slide0, Slide0View);
    }
  });

}).call(this);

},{"../models/slide":2,"./base":4,"janus":112}],8:[function(require,module,exports){
(function() {
  var DomView, Slide, Slide1, Slide1Template, Slide1View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide1 = (function(_super) {
    __extends(Slide1, _super);

    function Slide1() {
      _ref1 = Slide1.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide1.prototype.stages = 1;

    return Slide1;

  })(Slide);

  Slide1Template = (function(_super) {
    __extends(Slide1Template, _super);

    function Slide1Template() {
      _ref2 = Slide1Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide1Template.prototype._number = 1;

    return Slide1Template;

  })(SlideTemplate);

  Slide1View = (function(_super) {
    __extends(Slide1View, _super);

    function Slide1View() {
      _ref3 = Slide1View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide1View.prototype.templateClass = Slide1Template;

    return Slide1View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide1,
    registerWith: function(library) {
      return library.register(Slide1, Slide1View);
    }
  });

}).call(this);

},{"../models/slide":2,"./base":4,"janus":112}],9:[function(require,module,exports){
(function() {
  var DomView, Slide, Slide2, Slide2Template, Slide2View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide2 = (function(_super) {
    __extends(Slide2, _super);

    function Slide2() {
      _ref1 = Slide2.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide2.prototype.subject = 'Overview';

    Slide2.prototype.stages = 0;

    return Slide2;

  })(Slide);

  Slide2Template = (function(_super) {
    __extends(Slide2Template, _super);

    function Slide2Template() {
      _ref2 = Slide2Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide2Template.prototype._number = 2;

    return Slide2Template;

  })(SlideTemplate);

  Slide2View = (function(_super) {
    __extends(Slide2View, _super);

    function Slide2View() {
      _ref3 = Slide2View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide2View.prototype.templateClass = Slide2Template;

    return Slide2View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide2,
    registerWith: function(library) {
      return library.register(Slide2, Slide2View);
    }
  });

}).call(this);

},{"../models/slide":2,"./base":4,"janus":112}],10:[function(require,module,exports){
(function() {
  var DomView, Slide, Slide3, Slide3Template, Slide3View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide3 = (function(_super) {
    __extends(Slide3, _super);

    function Slide3() {
      _ref1 = Slide3.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide3.prototype.subject = 'Definition';

    Slide3.prototype.stages = 1;

    return Slide3;

  })(Slide);

  Slide3Template = (function(_super) {
    __extends(Slide3Template, _super);

    function Slide3Template() {
      _ref2 = Slide3Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide3Template.prototype._number = 3;

    return Slide3Template;

  })(SlideTemplate);

  Slide3View = (function(_super) {
    __extends(Slide3View, _super);

    function Slide3View() {
      _ref3 = Slide3View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide3View.prototype.templateClass = Slide3Template;

    return Slide3View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide3,
    registerWith: function(library) {
      return library.register(Slide3, Slide3View);
    }
  });

}).call(this);

},{"../models/slide":2,"./base":4,"janus":112}],11:[function(require,module,exports){
(function() {
  var DomView, Slide, Slide4, Slide4Template, Slide4View, SlideTemplate, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView;

  Slide = require('../models/slide').Slide;

  SlideTemplate = require('./base').SlideTemplate;

  Slide4 = (function(_super) {
    __extends(Slide4, _super);

    function Slide4() {
      _ref1 = Slide4.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Slide4.prototype.subject = 'Justification';

    Slide4.prototype.stages = 3;

    return Slide4;

  })(Slide);

  Slide4Template = (function(_super) {
    __extends(Slide4Template, _super);

    function Slide4Template() {
      _ref2 = Slide4Template.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Slide4Template.prototype._number = 4;

    return Slide4Template;

  })(SlideTemplate);

  Slide4View = (function(_super) {
    __extends(Slide4View, _super);

    function Slide4View() {
      _ref3 = Slide4View.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Slide4View.prototype.templateClass = Slide4Template;

    return Slide4View;

  })(DomView);

  util.extend(module.exports, {
    Model: Slide4,
    registerWith: function(library) {
      return library.register(Slide4, Slide4View);
    }
  });

}).call(this);

},{"../models/slide":2,"./base":4,"janus":112}],12:[function(require,module,exports){
(function() {
  module.exports = [require('./slide0'), require('./slide1'), require('./slide2'), require('./slide3'), require('./slide4')];

}).call(this);

},{"./slide0":7,"./slide1":8,"./slide2":9,"./slide3":10,"./slide4":11}],13:[function(require,module,exports){
(function(){module.exports = '<div class="deck"><div class="slides"></div><div class="chrome"><div class="byLine">PNW Scala 2013 &bull; Clint Tseng &bull; Socrata</div><div class="subject"></div></div></div>';})();
},{}],14:[function(require,module,exports){
(function() {
  var Deck, DeckTemplate, DeckView, DomView, Templater, keys, markup, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, DomView = _ref.DomView;

  Deck = require('../models/deck').Deck;

  markup = require('./deck.html');

  DeckTemplate = (function(_super) {
    __extends(DeckTemplate, _super);

    function DeckTemplate() {
      _ref1 = DeckTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    DeckTemplate.prototype._dom = function() {
      return $(markup);
    };

    DeckTemplate.prototype._binding = function() {
      var binding;
      binding = DeckTemplate.__super__._binding.call(this);
      binding.find('.deck').classGroup('slide-').from('slide');
      binding.find('.slides').render(this.options.app).from('slides');
      binding.find('.byLine').classed('active').from('slide').flatMap(function(slide) {
        return slide > 0;
      });
      return binding.find('.subject').text().from('subject');
    };

    return DeckTemplate;

  })(Templater);

  keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  DeckView = (function(_super) {
    __extends(DeckView, _super);

    function DeckView() {
      _ref2 = DeckView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    DeckView.prototype.templateClass = DeckTemplate;

    DeckView.prototype._wireEvents = function() {
      var _this = this;
      return $(document).on('keydown', function(event) {
        if (event.isDefaultPrevented()) {
          return;
        }
        if (event.which === keys.left) {
          return _this.subject.previous();
        } else if (event.which === keys.up) {
          return _this.subject.previousSlide();
        } else if (event.which === keys.right) {
          return _this.subject.advance();
        } else if (event.which === keys.down) {
          return _this.subject.advanceSlide();
        }
      });
    };

    return DeckView;

  })(DomView);

  util.extend(module.exports, {
    DeckTemplate: DeckTemplate,
    DeckView: DeckView,
    registerWith: function(library) {
      return library.register(Deck, DeckView);
    }
  });

}).call(this);

},{"../models/deck":1,"./deck.html":13,"janus":112}],15:[function(require,module,exports){
(function() {
  var BooleanAttribute, BooleanCheckboxView, BooleanToggleButtonView, DomView, Templater, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  Templater = require('janus').Templater;

  DomView = require('janus').DomView;

  BooleanAttribute = require('janus').attribute.BooleanAttribute;

  BooleanToggleButtonView = (function(_super) {
    __extends(BooleanToggleButtonView, _super);

    function BooleanToggleButtonView() {
      _ref = BooleanToggleButtonView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BooleanToggleButtonView.prototype._render = function() {
      var _ref1, _ref2,
        _this = this;
      this._button = $('<a/>');
      this._button.addClass('button');
      this._button.addClass((_ref1 = this.options.className) != null ? _ref1 : '');
      this._button.attr('id', (_ref2 = this.options.inputId) != null ? _ref2 : '');
      this._handleState();
      this.subject.watchValue().on('changed', function() {
        return _this._handleState();
      });
      return this._button;
    };

    BooleanToggleButtonView.prototype._handleState = function() {
      this._button.text(this.subject.getValue());
      return this._button.toggleClass('checked', this.subject.getValue() === true);
    };

    BooleanToggleButtonView.prototype._wireEvents = function() {
      var _this = this;
      return this._button.on('click', function(event) {
        event.preventDefault();
        return _this.subject.setValue(!_this._button.hasClass('checked'));
      });
    };

    return BooleanToggleButtonView;

  })(DomView);

  BooleanCheckboxView = (function(_super) {
    __extends(BooleanCheckboxView, _super);

    function BooleanCheckboxView() {
      _ref1 = BooleanCheckboxView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    BooleanCheckboxView.prototype._render = function() {
      var _this = this;
      this._check = $('<input/>');
      this._check.attr('type', 'text');
      this._check.attr('id', this.options.inputId);
      this._handleState();
      this.subject.watchValue().on('changed', function() {
        return _this._handleState();
      });
      return this._check;
    };

    BooleanCheckboxView.prototype._handleState = function() {
      return this._check.prop('checked', this.subject.getValue());
    };

    BooleanCheckboxView.prototype._wireEvents = function() {
      var _this = this;
      return this._check.on('change input', function(event) {
        event.preventDefault();
        return _this.subject.setValue(_this._check.prop('checked'));
      });
    };

    return BooleanCheckboxView;

  })(DomView);

  util.extend(module.exports, {
    BooleanCheckboxView: BooleanCheckboxView,
    BooleanToggleButtonView: BooleanToggleButtonView,
    registerWith: function(library) {
      library.register(BooleanAttribute, BooleanCheckboxView, {
        context: 'edit'
      });
      return library.register(BooleanAttribute, BooleanToggleButtonView, {
        context: 'edit',
        attributes: {
          style: 'button'
        }
      });
    }
  });

}).call(this);

},{"janus":112}],16:[function(require,module,exports){
(function(){module.exports = '<li><div class="editHandle"></div><a href="#remove" class="editRemove ss-delete">Remove</a><div class="editItem"></div></li>';})();
},{}],17:[function(require,module,exports){
(function() {
  var Base, CollectionEditItemImpl, CollectionEditItemTemplate, CollectionEditViewImpl, CollectionEditViewTemplate, ListEditItem, ListEditItemTemplate, ListEditView, OrderedCollection, Templater, itemMarkup, util, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  Base = require('janus').Base;

  _ref = require('janus').application.listEdit, ListEditView = _ref.ListEditView, ListEditItemTemplate = _ref.ListEditItemTemplate, ListEditItem = _ref.ListEditItem;

  Templater = require('janus').Templater;

  OrderedCollection = require('janus').collection.OrderedCollection;

  itemMarkup = require('./collection-edit-item.html');

  CollectionEditViewTemplate = (function(_super) {
    __extends(CollectionEditViewTemplate, _super);

    function CollectionEditViewTemplate() {
      _ref1 = CollectionEditViewTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CollectionEditViewTemplate.prototype._dom = function() {
      return $('<ul/>');
    };

    return CollectionEditViewTemplate;

  })(Templater);

  CollectionEditViewImpl = (function(_super) {
    __extends(CollectionEditViewImpl, _super);

    function CollectionEditViewImpl() {
      _ref2 = CollectionEditViewImpl.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CollectionEditViewImpl.prototype.templateClass = CollectionEditViewTemplate;

    CollectionEditViewImpl.prototype._emptyDom = function() {
      return $('<li/>');
    };

    return CollectionEditViewImpl;

  })(ListEditView);

  CollectionEditItemTemplate = (function(_super) {
    __extends(CollectionEditItemTemplate, _super);

    function CollectionEditItemTemplate() {
      _ref3 = CollectionEditItemTemplate.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    CollectionEditItemTemplate.prototype._dom = function() {
      return $(itemMarkup);
    };

    return CollectionEditItemTemplate;

  })(ListEditItemTemplate);

  CollectionEditItemImpl = (function(_super) {
    __extends(CollectionEditItemImpl, _super);

    function CollectionEditItemImpl() {
      _ref4 = CollectionEditItemImpl.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    CollectionEditItemImpl.prototype.templateClass = CollectionEditItemTemplate;

    return CollectionEditItemImpl;

  })(ListEditItem);

  util.extend(module.exports, {
    CollectionEditViewTemplate: CollectionEditViewTemplate,
    CollectionEditView: CollectionEditViewImpl,
    CollectionEditItemTemplate: CollectionEditItemTemplate,
    CollectionEditItemImpl: CollectionEditItemImpl,
    registerWith: function(library) {
      library.register(OrderedCollection, CollectionEditViewImpl, {
        context: 'edit'
      });
      return library.register(Base, CollectionEditItemImpl, {
        context: 'edit-wrapper'
      });
    }
  });

}).call(this);

},{"./collection-edit-item.html":16,"janus":112}],18:[function(require,module,exports){
(function(){module.exports = '<li><div class="selectControls"><a href="#select" class="selectButton button">Select</a></div><div class="selectItem"></div></li>';})();
},{}],19:[function(require,module,exports){
(function() {
  var Base, CollectionSelectItemTemplate, CollectionSelectItemView, CollectionSelectView, CollectionView, DomView, OrderedCollection, Templater, itemMarkup, templater, util, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, templater = _ref.templater, Templater = _ref.Templater, (_ref1 = _ref.collection, OrderedCollection = _ref1.OrderedCollection), Base = _ref.Base;

  CollectionView = require('./collection').CollectionView;

  itemMarkup = require('./collection-select-item.html');

  CollectionSelectView = (function(_super) {
    __extends(CollectionSelectView, _super);

    function CollectionSelectView() {
      _ref2 = CollectionSelectView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CollectionSelectView.prototype._initialize = function() {
      var _ref3, _ref4;
      CollectionSelectView.__super__._initialize.call(this);
      this.options.childOpts = util.extendNew(this.options.childOpts, {
        aux: {
          context: this.options.itemContext,
          view: this.options.itemView,
          list: this.subject,
          attr: this.options.aux.attr
        }
      });
      this.options.itemView = (_ref3 = this.options.selectWrapperView) != null ? _ref3 : void 0;
      return this.options.itemContext = (_ref4 = this.options.selectWrapperContext) != null ? _ref4 : 'select-wrapper';
    };

    return CollectionSelectView;

  })(CollectionView);

  CollectionSelectItemTemplate = (function(_super) {
    __extends(CollectionSelectItemTemplate, _super);

    function CollectionSelectItemTemplate() {
      _ref3 = CollectionSelectItemTemplate.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    CollectionSelectItemTemplate.prototype._dom = function() {
      return $(itemMarkup);
    };

    CollectionSelectItemTemplate.prototype._binding = function() {
      var binding,
        _this = this;
      binding = CollectionSelectItemTemplate.__super__._binding.call(this);
      binding.find('> li > .selectControls .selectButton').text().fromSelf().andVarying(function(_, aux) {
        return aux.attr.watchValue();
      }).flatMap(function(subject, currentValue) {
        if (subject === currentValue) {
          return 'Selected';
        } else {
          return 'Select';
        }
      });
      binding.find('> li > .selectControls .selectButton').classed('ss-check selected').fromSelf().andVarying(function(_, aux) {
        return aux.attr.watchValue();
      }).flatMap(function(subject, currentValue) {
        return subject === currentValue;
      });
      binding.find('.selectItem').render(this.options.app).fromSelf().andAux('view').andAux('context').flatMap(function(item, viewClass, context) {
        var view;
        if (viewClass != null) {
          view = new viewClass(item, {
            options: {
              app: _this.options.app
            }
          });
          return new templater.WithView(view);
        } else {
          return new templater.WithOptions(item, {
            context: context != null ? context : 'default'
          });
        }
      });
      return binding;
    };

    return CollectionSelectItemTemplate;

  })(Templater);

  CollectionSelectItemView = (function(_super) {
    __extends(CollectionSelectItemView, _super);

    function CollectionSelectItemView() {
      _ref4 = CollectionSelectItemView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    CollectionSelectItemView.prototype.templateClass = CollectionSelectItemTemplate;

    CollectionSelectItemView.prototype._wireEvents = function() {
      var dom,
        _this = this;
      dom = this.artifact();
      return dom.find('> .selectControls .selectButton').on('click', function(event) {
        event.preventDefault();
        return _this.options.aux.attr.setValue(_this.subject);
      });
    };

    return CollectionSelectItemView;

  })(DomView);

  util.extend(module.exports, {
    CollectionSelectView: CollectionSelectView,
    CollectionSelectItemTemplate: CollectionSelectItemTemplate,
    CollectionSelectItemView: CollectionSelectItemView,
    registerWith: function(library) {
      library.register(OrderedCollection, CollectionSelectView, {
        context: 'select'
      });
      library.register(Base, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
      library.register(String, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
      library.register(Boolean, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
      return library.register(Number, CollectionSelectItemView, {
        context: 'select-wrapper'
      });
    }
  });

}).call(this);

},{"./collection":20,"./collection-select-item.html":18,"janus":112}],20:[function(require,module,exports){
(function() {
  var CollectionViewImpl, CollectionViewTemplater, ListView, OrderedCollection, Templater, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  ListView = require('janus').application.ListView;

  Templater = require('janus').Templater;

  OrderedCollection = require('janus').collection.OrderedCollection;

  CollectionViewTemplater = (function(_super) {
    __extends(CollectionViewTemplater, _super);

    function CollectionViewTemplater() {
      _ref = CollectionViewTemplater.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CollectionViewTemplater.prototype._dom = function() {
      return $('<ul/>');
    };

    return CollectionViewTemplater;

  })(Templater);

  CollectionViewImpl = (function(_super) {
    __extends(CollectionViewImpl, _super);

    function CollectionViewImpl() {
      _ref1 = CollectionViewImpl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CollectionViewImpl.prototype.templateClass = CollectionViewTemplater;

    CollectionViewImpl.prototype._emptyDom = function() {
      return $('<li/>');
    };

    return CollectionViewImpl;

  })(ListView);

  util.extend(module.exports, {
    CollectionViewTemplater: CollectionViewTemplater,
    CollectionView: CollectionViewImpl,
    registerWith: function(library) {
      return library.register(OrderedCollection, CollectionViewImpl, {
        context: 'default'
      });
    }
  });

}).call(this);

},{"janus":112}],21:[function(require,module,exports){
(function() {
  var Base, CollectionViewImpl, CollectionViewTemplater, DomView, EnumAttribute, EnumAttributeListTemplate, EnumAttributeListView, EnumAttributeView, List, OrderedCollection, Templater, Varying, templater, textItemMarkup, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  Base = require('janus').Base;

  _ref = require('janus').collection, List = _ref.List, OrderedCollection = _ref.OrderedCollection;

  DomView = require('janus').DomView;

  EnumAttribute = require('janus').attribute.EnumAttribute;

  Templater = require('janus').Templater;

  templater = require('janus').templater;

  Varying = require('janus').varying.Varying;

  textItemMarkup = require('./enum-text-item.html');

  CollectionViewTemplater = require('./collection').CollectionViewTemplater;

  CollectionViewImpl = require('./collection').CollectionView;

  EnumAttributeView = (function(_super) {
    __extends(EnumAttributeView, _super);

    function EnumAttributeView() {
      _ref1 = EnumAttributeView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    EnumAttributeView.prototype._initialize = function() {
      this._idToOption = {};
      return this._idToValue = {};
    };

    EnumAttributeView.prototype._render = function() {
      var _this = this;
      this._select = $('<select/>');
      this._select.attr('id', this.options.inputId);
      this._handleOptions();
      if ($.fn.jquery != null) {
        this._select.val(this.subject.getValue());
      } else {
        this._select.children("[value=" + (this.subject.getValue()) + "]").attr('selected', true);
      }
      this.subject.watchValue().on('changed', function(newValue) {
        return _this._select.val(_this._idForChoice(newValue));
      });
      return this._select;
    };

    EnumAttributeView.prototype._handleOptions = function() {
      var handleVarying, options,
        _this = this;
      options = this.subject.values();
      if (options instanceof OrderedCollection) {
        return this._renderOptions(options);
      } else if (util.isArray(options)) {
        return this._renderOptions(new List(options));
      } else if (options instanceof Varying) {
        handleVarying = function(value) {
          if (value instanceof OrderedCollection) {
            return _this._renderOptions(value);
          } else {
            return _this._renderOptions(new List());
          }
        };
        options.on('changed', handleVarying);
        return handleVarying(options.value);
      }
    };

    EnumAttributeView.prototype._renderOptions = function(options) {
      var choice, _i, _len, _ref2, _ref3,
        _this = this;
      this._select.empty();
      if ((_ref2 = this._listListener) != null) {
        _ref2.destroy();
      }
      this._listListener = new Base();
      if (this.subject.nullable === true) {
        this._select.append(this._renderOption(null));
      }
      _ref3 = options.list;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        choice = _ref3[_i];
        this._select.append(this._renderOption(choice));
      }
      this._listListener.listenTo(options, 'added', function(option, idx) {
        if (idx === 0) {
          return _this._select.prepend(_this._renderOption(option));
        } else {
          return _this._select.find("> :nth-child(" + idx + ")").after(_this._renderOption(option));
        }
      });
      this._listListener.listenTo(options, 'removed', function(choice) {
        var option;
        option = _this._idToOption[_this._idForChoice(choice)];
        if (option.attr('selected') === 'selected') {
          option.remove();
          _this.subject.setValue(_this._select.val());
        } else {
          option.remove();
        }
        return delete _this._idToOption[_this._idForChoice(choice)];
      });
      return null;
    };

    EnumAttributeView.prototype._renderOption = function(choice) {
      var id, option, textVary, update, view;
      id = this._idForChoice(choice);
      option = $('<option/>');
      option.attr('value', id);
      if (choice === null) {
        Varying.ly(this._uiString(null)).reactNow(function(text) {
          var _ref2;
          return option.text((_ref2 = text != null ? text.toString() : void 0) != null ? _ref2 : '');
        });
      } else if (util.isPrimitive(choice)) {
        Varying.ly(this._uiString(choice)).reactNow(function(text) {
          var _ref2;
          return option.text((_ref2 = text != null ? text.toString() : void 0) != null ? _ref2 : '');
        });
      } else if (choice instanceof Varying) {
        choice.reactNow(function(text) {
          return option.text(text);
        });
      } else {
        view = this.options.app.getView(choice, {
          context: 'text'
        });
        if (view != null) {
          textVary = view.artifact();
          update = function(value) {
            return option.text(value);
          };
          textVary.on('changed', update);
          update(textVary.value);
        } else {
          option.text('');
        }
      }
      this._idToValue[id] = choice;
      return this._idToOption[id] = option;
    };

    EnumAttributeView.prototype._idForChoice = function(choice) {
      if (choice == null) {
        return null;
      } else if (util.isString(choice) || util.isNumber(choice)) {
        return choice;
      } else if (choice instanceof Base) {
        return choice._id;
      } else {
        return choice.toString();
      }
    };

    EnumAttributeView.prototype._uiString = function(choice) {
      if (choice == null) {
        return '';
      } else {
        return choice.toString();
      }
    };

    EnumAttributeView.prototype._wireEvents = function() {
      var select,
        _this = this;
      select = this._select;
      select.on('focus', function() {
        return select.addClass('focus');
      });
      select.on('blur', function() {
        return select.removeClass('focus');
      });
      return select.on('change input', function() {
        return _this.subject.setValue(_this._idToValue[select.val()]);
      });
    };

    return EnumAttributeView;

  })(DomView);

  EnumAttributeListTemplate = (function(_super) {
    __extends(EnumAttributeListTemplate, _super);

    function EnumAttributeListTemplate() {
      _ref2 = EnumAttributeListTemplate.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    EnumAttributeListTemplate.prototype._dom = function() {
      return $('<div><div class="listEnum"/></div>');
    };

    EnumAttributeListTemplate.prototype._binding = function() {
      var binding,
        _this = this;
      binding = EnumAttributeListTemplate.__super__._binding.call(this);
      return binding.find('.listEnum').render(this.options.app, {
        context: 'select',
        constructorOpts: {
          selectWrapperView: this.options.selectWrapperView,
          selectWrapperContext: this.options.selectWrapperContext,
          itemView: this.options.itemView,
          itemContext: this.options.itemContext
        }
      }).fromSelf().fromVarying(function(attr) {
        return Varying.ly(attr.values());
      }).flatMap(function(self, list) {
        if (list instanceof OrderedCollection) {
          return new templater.WithAux(list, {
            attr: self
          });
        } else if (util.isArray(list)) {
          return new templater.WithAux(new List(list), {
            attr: self
          });
        } else {
          return list;
        }
      });
    };

    return EnumAttributeListTemplate;

  })(Templater);

  EnumAttributeListView = (function(_super) {
    __extends(EnumAttributeListView, _super);

    function EnumAttributeListView() {
      _ref3 = EnumAttributeListView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EnumAttributeListView.prototype.templateClass = EnumAttributeListTemplate;

    EnumAttributeListView.prototype._templaterOptions = function() {
      return {
        selectWrapperView: this.options.selectWrapperView,
        selectWrapperContext: this.options.selectWrapperContext,
        itemView: this.options.itemView,
        itemContext: this.options.itemContext
      };
    };

    return EnumAttributeListView;

  })(DomView);

  util.extend(module.exports, {
    EnumAttributeView: EnumAttributeView,
    EnumAttributeListView: EnumAttributeListView,
    registerWith: function(library) {
      library.register(EnumAttribute, EnumAttributeView, {
        context: 'edit'
      });
      return library.register(EnumAttribute, EnumAttributeListView, {
        context: 'edit',
        attributes: {
          style: 'list'
        }
      });
    }
  });

}).call(this);

},{"./collection":20,"./enum-text-item.html":22,"janus":112}],22:[function(require,module,exports){
(function(){module.exports = '<li class="textItem"><a class="button selectItem"></a><div class="selectItem"></div></li>';})();
},{}],23:[function(require,module,exports){
(function() {
  var DomView, LiteralTemplate, LiteralView, Templater, Varying, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  DomView = require('janus').DomView;

  Templater = require('janus').Templater;

  Varying = require('janus').varying.Varying;

  LiteralTemplate = (function(_super) {
    __extends(LiteralTemplate, _super);

    function LiteralTemplate() {
      _ref = LiteralTemplate.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LiteralTemplate.prototype._dom = function() {
      return $('<span/>').addClass('literal');
    };

    LiteralTemplate.prototype._binding = function() {
      var binding;
      binding = LiteralTemplate.__super__._binding.call(this);
      return binding.find('span').text().fromVarying(Varying.ly);
    };

    return LiteralTemplate;

  })(Templater);

  LiteralView = (function(_super) {
    __extends(LiteralView, _super);

    function LiteralView() {
      _ref1 = LiteralView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    LiteralView.prototype.templateClass = LiteralTemplate;

    return LiteralView;

  })(DomView);

  util.extend(module.exports, {
    LiteralTemplate: LiteralTemplate,
    LiteralView: LiteralView,
    registerWith: function(library) {
      library.register(Number, LiteralView, {
        context: 'default'
      });
      library.register(Boolean, LiteralView, {
        context: 'default'
      });
      return library.register(String, LiteralView, {
        context: 'default'
      });
    }
  });

}).call(this);

},{"janus":112}],24:[function(require,module,exports){
(function() {
  module.exports = [require('./boolean-attribute'), require('./enum-attribute'), require('./collection-edit'), require('./collection-select'), require('./collection'), require('./literal'), require('./text-attribute'), require('./varying')];

}).call(this);

},{"./boolean-attribute":15,"./collection":20,"./collection-edit":17,"./collection-select":19,"./enum-attribute":21,"./literal":23,"./text-attribute":25,"./varying":26}],25:[function(require,module,exports){
(function() {
  var DomView, MultilineTextAttributeView, TextAttribute, TextAttributeView, eventMap, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  DomView = require('janus').DomView;

  TextAttribute = require('janus').attribute.TextAttribute;

  eventMap = {
    "default": 'change input',
    change: 'change'
  };

  TextAttributeView = (function(_super) {
    __extends(TextAttributeView, _super);

    function TextAttributeView() {
      _ref = TextAttributeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TextAttributeView.prototype._render = function() {
      var input, _ref1, _ref2;
      input = this._baseTag().attr('id', (_ref2 = this.options.inputId) != null ? _ref2 : '').val((_ref1 = this.subject.getValue()) != null ? _ref1 : '');
      this._bindInput(input);
      return input;
    };

    TextAttributeView.prototype._baseTag = function() {
      return $('<input/>').attr('type', 'text');
    };

    TextAttributeView.prototype._bind = function(input) {
      return this._bindInput(input);
    };

    TextAttributeView.prototype._bindInput = function(input) {
      var _this = this;
      return this.subject.watchValue().on('changed', function(newValue) {
        if (!input.hasClass('focus')) {
          return input.val(newValue);
        }
      });
    };

    TextAttributeView.prototype._wireEvents = function() {
      var input, _ref1,
        _this = this;
      input = this.artifact();
      input.on('focus', function() {
        return input.addClass('focus');
      });
      input.on('blur', function() {
        return input.removeClass('focus');
      });
      return input.on(eventMap[(_ref1 = this.options.commit) != null ? _ref1 : 'default'], function() {
        return _this._handle(input.val());
      });
    };

    TextAttributeView.prototype._handle = function(x) {
      return this.subject.setValue(x);
    };

    return TextAttributeView;

  })(DomView);

  MultilineTextAttributeView = (function(_super) {
    __extends(MultilineTextAttributeView, _super);

    function MultilineTextAttributeView() {
      _ref1 = MultilineTextAttributeView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    MultilineTextAttributeView.prototype._baseTag = function() {
      return $('<textarea/>');
    };

    return MultilineTextAttributeView;

  })(TextAttributeView);

  util.extend(module.exports, {
    TextAttributeView: TextAttributeView,
    registerWith: function(library) {
      library.register(TextAttribute, TextAttributeView, {
        context: 'edit'
      });
      return library.register(TextAttribute, MultilineTextAttributeView, {
        context: 'edit',
        attributes: {
          style: 'multiline'
        }
      });
    }
  });

}).call(this);

},{"janus":112}],26:[function(require,module,exports){
(function() {
  var Templater, Varying, VaryingView, VaryingViewImpl, VaryingViewTemplate, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('janus').util;

  VaryingView = require('janus').application.VaryingView;

  Templater = require('janus').Templater;

  Varying = require('janus').varying.Varying;

  VaryingViewTemplate = (function(_super) {
    __extends(VaryingViewTemplate, _super);

    function VaryingViewTemplate() {
      _ref = VaryingViewTemplate.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VaryingViewTemplate.prototype._dom = function() {
      return $('<div/>');
    };

    return VaryingViewTemplate;

  })(Templater);

  VaryingViewImpl = (function(_super) {
    __extends(VaryingViewImpl, _super);

    function VaryingViewImpl() {
      _ref1 = VaryingViewImpl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    VaryingViewImpl.prototype.templateClass = VaryingViewTemplate;

    return VaryingViewImpl;

  })(VaryingView);

  util.extend(module.exports, {
    VaryingView: VaryingViewImpl,
    registerWith: function(library) {
      return library.register(Varying, VaryingViewImpl, {
        context: 'default'
      });
    }
  });

}).call(this);

},{"janus":112}],27:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],28:[function(require,module,exports){
(function() {
  var CommandRequest, EvalAction, Varying, exec, store, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store;

  Varying = require('janus').varying.Varying;

  CommandRequest = require('../../models/command').request.Command;

  exec = require('../../util/eval').exec;

  EvalAction = (function(_super) {
    __extends(EvalAction, _super);

    function EvalAction() {
      _ref1 = EvalAction.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    EvalAction.prototype._handle = function() {
      var ev,
        _this = this;
      ev = function() {
        var currentPage, ex, k, locals, v, _ref2, _ref3, _ref4, _ref5;
        currentPage = (_ref2 = _this.options.pageHistory) != null ? _ref2.at(-1) : void 0;
        locals = {
          window: {},
          document: {},
          pageViewHistory: _this.options.pageHistory,
          pageView: currentPage,
          pageModel: currentPage != null ? currentPage.subject : void 0,
          allStores: _this.options.storeHistory,
          activeStores: (_ref3 = _this.options.storeHistory) != null ? _ref3.filter(function(_store) {
            return _store.request.map(function(state) {
              return !(state instanceof store.Request.state.type.Complete);
            });
          }) : void 0
        };
        _ref4 = _this.request.options.env;
        for (k in _ref4) {
          v = _ref4[k];
          locals[k] = v != null ? (_ref5 = v.value) != null ? _ref5.successOrElse(null) : void 0 : void 0;
        }
        try {
          return _this.request.setValue(store.Request.state.Success(exec(locals, _this.request.options.input)));
        } catch (_error) {
          ex = _error;
          return _this.request.setValue(store.Request.state.UserError(ex.message));
        }
      };
      setTimeout(ev, 0);
      return store.Store.Handled;
    };

    return EvalAction;

  })(store.Store);

  util.extend(module.exports, {
    EvalAction: EvalAction,
    registerWith: function(library) {
      return library.register(CommandRequest, EvalAction, {
        context: 'default',
        priority: -1
      });
    }
  });

}).call(this);

},{"../../models/command":33,"../../util/eval":38,"janus":70}],29:[function(require,module,exports){
(function() {
  var CommandRequest, InspectAction, ReadyState, Varying, store, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store;

  Varying = require('janus').varying.Varying;

  ReadyState = require('../../models/ready-state').ReadyState;

  CommandRequest = require('../../models/command').request.Command;

  InspectAction = (function(_super) {
    __extends(InspectAction, _super);

    function InspectAction() {
      _ref1 = InspectAction.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    InspectAction.prototype._handle = function() {
      var spect,
        _this = this;
      spect = function() {
        var console;
        if (_this.request.options.final === false) {
          return _this.request.setValue(new ReadyState('Press <enter> to inspect. In inspection mode, click the object you\'d like to learn about.'));
        } else {
          _this.request.setValue(store.Request.state.Pending);
          console = $('.janusConsole');
          console.hide();
          return $('body').one('click', function(event) {
            var target;
            event.preventDefault();
            target = $(event.target);
            while (target.length > 0 && (target.data().view == null)) {
              target = target.parent();
            }
            if (target.length === 0) {
              _this.request.setValue(store.Request.state.UserError('No Janus views found in your click context.'));
            } else {
              _this.request.setValue(store.Request.state.Success(target.data().view));
            }
            console.show();
            return console.find('.consolePrompt input').focus();
          });
        }
      };
      window.setTimeout(spect, 0);
      return store.Store.Handled;
    };

    return InspectAction;

  })(store.Store);

  util.extend(module.exports, {
    InspectAction: InspectAction,
    registerWith: function(library) {
      return library.register(CommandRequest, InspectAction, {
        context: 'default',
        acceptor: function(request) {
          return request.options.input === '.inspect';
        }
      });
    }
  });

}).call(this);

},{"../../models/command":33,"../../models/ready-state":35,"janus":70}],30:[function(require,module,exports){
(function() {
  var CommandRequest, ReadyState, RenderAction, Varying, exec, store, templater, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store, templater = _ref.templater;

  Varying = require('janus').varying.Varying;

  ReadyState = require('../../models/ready-state').ReadyState;

  CommandRequest = require('../../models/command').request.Command;

  exec = require('../../util/eval').exec;

  RenderAction = (function(_super) {
    __extends(RenderAction, _super);

    function RenderAction() {
      _ref1 = RenderAction.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    RenderAction.prototype._handle = function() {
      var rend,
        _this = this;
      rend = function() {
        var ex, name, opts, parsed, subject, _, _ref2, _ref3;
        parsed = _this.request.options.input.match(/^\.render (res\d+) ?(.+)?$/);
        if (parsed == null) {
          return _this.request.setValue(store.Request.state.UserError('Invalid render syntax!'));
        }
        _ = parsed[0], name = parsed[1], opts = parsed[2];
        if (opts != null) {
          try {
            opts = exec({}, opts);
          } catch (_error) {
            ex = _error;
            return _this.request.setValue(store.Request.state.UserError(ex.message));
          }
        }
        subject = (_ref2 = _this.request.options.env[name]) != null ? (_ref3 = _ref2.value) != null ? _ref3.successOrElse(null) : void 0 : void 0;
        if (subject == null) {
          return _this.request.setValue(store.Request.state.UserError("" + name + " is not a valid result!"));
        }
        return _this.request.setValue(store.Request.state.Success(new templater.WithOptions(subject, opts != null ? opts : {
          context: 'default'
        })));
      };
      window.setTimeout(rend, 0);
      return store.Store.Handled;
    };

    return RenderAction;

  })(store.Store);

  util.extend(module.exports, {
    RenderAction: RenderAction,
    registerWith: function(library) {
      return library.register(CommandRequest, RenderAction, {
        context: 'default',
        acceptor: function(request) {
          return /^\.render/.test(request.options.input);
        }
      });
    }
  });

}).call(this);

},{"../../models/command":33,"../../models/ready-state":35,"../../util/eval":38,"janus":70}],31:[function(require,module,exports){
(function() {
  var CommandRequest, List, Model, ReadyState, TraverseAction, Varying, exec, store, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store, Model = _ref.Model, (_ref1 = _ref.collection, List = _ref1.List);

  Varying = require('janus').varying.Varying;

  ReadyState = require('../../models/ready-state').ReadyState;

  CommandRequest = require('../../models/command').request.Command;

  exec = require('../../util/eval').exec;

  TraverseAction = (function(_super) {
    __extends(TraverseAction, _super);

    function TraverseAction() {
      _ref2 = TraverseAction.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    TraverseAction.prototype._handle = function() {
      var verse,
        _this = this;
      verse = function() {
        var currentPage, firstPart, k, locals, objs, parts, recurse, v, _ref3, _ref4, _ref5;
        parts = _this.request.options.input.match(/[@#=][^@#=]+/g);
        if ((parts == null) || parts.length === 0) {
          return _this.request.setValue(store.Request.state.UserError('Invalid traversal syntax.'));
        } else {
          currentPage = (_ref3 = _this.options.pageHistory) != null ? _ref3.at(-1) : void 0;
          locals = {
            page: currentPage != null ? currentPage.subject : void 0
          };
          _ref4 = _this.request.options.env;
          for (k in _ref4) {
            v = _ref4[k];
            locals[k] = v != null ? (_ref5 = v.value) != null ? _ref5.successOrElse(null) : void 0 : void 0;
          }
          objs = [];
          recurse = function(idx) {
            return function(obj) {
              var ex, part;
              part = parts[idx];
              objs[idx] = obj;
              if (part == null) {
                return store.Request.state.Success(obj);
              } else if (part.charAt(0) === '=') {
                if (idx !== (parts.length - 1)) {
                  return store.Request.state.UserError('Cannot assign value multiple times!');
                } else if (idx < 2) {
                  return store.Request.state.UserError('Not sure what to assign to! Make sure you have specified a target and its key.');
                } else if (_this.request.options.final === true) {
                  try {
                    objs[idx - 2].set(parts[idx - 1].substring(1), exec(locals, part.substring(1)));
                    return store.Request.state.Success(objs[idx - 2].watch(parts[idx - 1].substring(1)));
                  } catch (_error) {
                    ex = _error;
                    return store.Request.state.UserError(ex.message);
                  }
                } else {
                  return new ReadyState("Press <enter> to assign your value to " + parts[idx - 1] + " on " + parts[idx - 2]);
                }
              } else if (part.charAt(0) === '#') {
                if (obj instanceof Model) {
                  return obj.watch(part.substring(1)).map(recurse(idx + 1));
                } else {
                  return store.Request.state.UserError('Trying to traverse into an attr on a non-Model.');
                }
              } else if (part.charAt(0) === '@') {
                if (obj instanceof List) {
                  return obj.watchAt(parseFloat(part.substring(1))).map(recurse(idx + 1));
                } else {
                  return store.Request.state.UserError('Trying to traverse into an index on a non-List.');
                }
              } else {
                return store.Request.state.UserError('How did this happen?');
              }
            };
          };
          firstPart = parts.shift().substring(1);
          return _this.request.setValue(recurse(0)(locals[firstPart]));
        }
      };
      window.setTimeout(verse, 0);
      return store.Store.Handled;
    };

    return TraverseAction;

  })(store.Store);

  util.extend(module.exports, {
    TraverseAction: TraverseAction,
    registerWith: function(library) {
      return library.register(CommandRequest, TraverseAction, {
        context: 'default',
        acceptor: function(request) {
          return /^#/.test(request.options.input);
        }
      });
    }
  });

}).call(this);

},{"../../models/command":33,"../../models/ready-state":35,"../../util/eval":38,"janus":70}],32:[function(require,module,exports){
(function() {
  var util;

  util = require('janus').util;

  util.extend(module.exports, {
    models: {
      command: require('./models/command'),
      repl: require('./models/repl'),
      readyState: require('./models/ready-state'),
      node: require('./models/node')
    },
    actions: {
      local: {
        inspect: require('./actions/local/inspect'),
        traverse: require('./actions/local/traverse'),
        render: require('./actions/local/render'),
        "eval": require('./actions/local/eval')
      },
      registerWith: function(library, env) {
        var action, _, _ref, _results;
        _ref = this[env];
        _results = [];
        for (_ in _ref) {
          action = _ref[_];
          _results.push(typeof action.registerWith === "function" ? action.registerWith(library) : void 0);
        }
        return _results;
      }
    },
    views: {
      command: {
        "default": require('./views/command/default'),
        edit: require('./views/command/edit')
      },
      repl: {
        repl: require('./views/repl/repl')
      },
      generic: {
        requestState: require('./views/generic/request-state'),
        func: require('./views/generic/function'),
        baseFallback: require('./views/generic/base-fallback')
      },
      varying: {
        live: require('./views/varying/live')
      },
      registerWith: function(library) {
        var model, view, _, _results;
        _results = [];
        for (_ in this) {
          model = this[_];
          _results.push((function() {
            var _results1;
            _results1 = [];
            for (_ in model) {
              view = model[_];
              _results1.push(typeof view.registerWith === "function" ? view.registerWith(library) : void 0);
            }
            return _results1;
          })());
        }
        return _results;
      }
    },
    setHook: require('./util/hook')
  });

}).call(this);

},{"./actions/local/eval":28,"./actions/local/inspect":29,"./actions/local/render":30,"./actions/local/traverse":31,"./models/command":33,"./models/node":34,"./models/ready-state":35,"./models/repl":36,"./util/hook":39,"./views/command/default":41,"./views/command/edit":43,"./views/generic/base-fallback":44,"./views/generic/function":45,"./views/generic/request-state":46,"./views/repl/repl":48,"./views/varying/live":50,"janus":70}],33:[function(require,module,exports){
(function() {
  var Command, CommandRequest, Commands, Model, attribute, collection, reference, store, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, collection = _ref.collection, reference = _ref.reference, store = _ref.store;

  Command = (function(_super) {
    var _ref2;

    __extends(Command, _super);

    function Command() {
      _ref1 = Command.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Command.attribute('input', attribute.TextAttribute);

    Command.attribute('final', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref2 = _Class.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      _Class.prototype["default"] = function() {
        return false;
      };

      return _Class;

    })(attribute.BooleanAttribute));

    Command.bind('result').from('input').and('idx').and('env').and('final').flatMap(function(input, idx, env, final) {
      var request;
      request = new CommandRequest({
        input: input,
        idx: idx,
        env: env,
        final: final
      });
      return new reference.RequestReference(request, null, {
        map: function(_) {
          return _;
        }
      });
    });

    return Command;

  })(Model);

  Commands = (function(_super) {
    __extends(Commands, _super);

    function Commands() {
      _ref2 = Commands.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Commands.modelClass = Command;

    return Commands;

  })(collection.List);

  CommandRequest = (function(_super) {
    __extends(CommandRequest, _super);

    function CommandRequest() {
      _ref3 = CommandRequest.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    CommandRequest.prototype.deserialize = function(_) {
      return _;
    };

    return CommandRequest;

  })(store.Request);

  util.extend(module.exports, {
    Command: Command,
    Commands: Commands,
    request: {
      Command: CommandRequest
    }
  });

}).call(this);

},{"janus":70}],34:[function(require,module,exports){
(function() {
  var Model, Node, Nodes, attribute, collection, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, collection = _ref.collection;

  Node = (function(_super) {
    var _ref2;

    __extends(Node, _super);

    function Node() {
      _ref1 = Node.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Node.attribute('children', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref2 = _Class.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      _Class.collectionClass = Nodes;

      return _Class;

    })(attribute.CollectionAttribute));

    return Node;

  }).call(this, Model);

  Nodes = (function(_super) {
    __extends(Nodes, _super);

    function Nodes() {
      _ref2 = Nodes.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Nodes.modelClass = Node;

    return Nodes;

  })(collection.List);

  util.extend(module.exports, {
    Node: Node,
    Nodes: Nodes
  });

}).call(this);

},{"janus":70}],35:[function(require,module,exports){
(function() {
  var ReadyState, store, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store;

  ReadyState = (function(_super) {
    __extends(ReadyState, _super);

    function ReadyState(message) {
      this.message = message;
    }

    return ReadyState;

  })(store.Request.state.type.Init);

  util.extend(module.exports, {
    ReadyState: ReadyState
  });

}).call(this);

},{"janus":70}],36:[function(require,module,exports){
(function() {
  var Model, Repl, Repls, attribute, collection, command, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, collection = _ref.collection;

  command = require('./command');

  Repl = (function(_super) {
    var _ref2;

    __extends(Repl, _super);

    function Repl() {
      _ref1 = Repl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Repl.attribute('history', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref2 = _Class.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      _Class.collectionClass = command.Commands;

      _Class.prototype["default"] = function() {
        return new command.Commands([
          new command.Command({
            idx: 0
          })
        ]);
      };

      _Class.prototype.writeDefault = true;

      return _Class;

    })(attribute.CollectionAttribute));

    Repl.bind('current').from('history').flatMap(function(history) {
      return history.watchAt(-1);
    });

    Repl.prototype.newCommand = function() {
      var cmd, history;
      history = this.get('history');
      history.at(-1).set('final', true);
      cmd = new command.Command({
        idx: history.list.length,
        env: this._genEnv()
      });
      return history.add(cmd);
    };

    Repl.prototype._genEnv = function() {
      var i, result, _command, _i, _len, _ref3;
      result = {};
      _ref3 = this.get('history').list;
      for (i = _i = 0, _len = _ref3.length; _i < _len; i = ++_i) {
        _command = _ref3[i];
        result["res" + i] = _command.watch('result');
      }
      return result;
    };

    return Repl;

  }).call(this, Model);

  Repls = (function(_super) {
    __extends(Repls, _super);

    function Repls() {
      _ref2 = Repls.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Repls.modelClass = Repl;

    return Repls;

  })(collection.List);

  util.extend(module.exports, {
    Repl: Repl,
    Repls: Repls
  });

}).call(this);

},{"./command":33,"janus":70}],37:[function(require,module,exports){
(function() {
  module.exports = typeof window === 'undefined' ? require('zepto-node')(require('domino').createWindow()) : window.jQuery;

}).call(this);

},{"domino":false,"zepto-node":false}],38:[function(require,module,exports){
(function() {
  var util;

  util = require('janus').util;

  util.extend(module.exports, {
    exec: function(locals, statement) {
      var context, f, k, names, sandbox, that, v, values, _;
      names = (function() {
        var _results;
        _results = [];
        for (k in locals) {
          _results.push(k);
        }
        return _results;
      })();
      values = (function() {
        var _results;
        _results = [];
        for (_ in locals) {
          v = locals[_];
          _results.push(v);
        }
        return _results;
      })();
      that = {};
      context = Array.prototype.concat.call(that, names, "return " + statement);
      sandbox = new (Function.prototype.bind.apply(Function, context));
      context = Array.prototype.concat.call(that, values);
      f = Function.prototype.bind.apply(sandbox, context);
      return f();
    }
  });

}).call(this);

},{"janus":70}],39:[function(require,module,exports){
(function() {
  var $, Repl, ReplView, util;

  util = require('janus').util;

  Repl = require('../models/repl').Repl;

  ReplView = require('../views/repl/repl').ReplView;

  $ = require('./dollar');

  module.exports = function(app) {
    var repl, replDom, replView, tildeTime;
    window.jrepl = repl = new Repl();
    replView = new ReplView(repl, {
      app: app
    });
    replDom = replView.artifact();
    replView.wireEvents();
    tildeTime = 0;
    $('body').append(replDom).on('keydown', function(event) {
      var now, x, y, _ref;
      if (event.which === 192) {
        now = (new Date()).getTime();
        if (now - tildeTime < 250 && !replDom.hasClass('shown')) {
          event.preventDefault();
          replDom.toggleClass('shown');
          _ref = [window.scrollX, window.scrollY], x = _ref[0], y = _ref[1];
          replDom.find('.consolePrompt input').focus();
          window.scrollTo(x, y);
        }
        tildeTime = now;
      }
      if (event.which === 27 && replDom.hasClass('shown')) {
        replDom.removeClass('shown');
        return replDom.find('.consolePrompt input').blur();
      }
    });
    return null;
  };

}).call(this);

},{"../models/repl":36,"../views/repl/repl":48,"./dollar":37,"janus":70}],40:[function(require,module,exports){
(function(){module.exports = '<li class="commandOutput"><div class="commandNumber"></div><div class="commandText"></div><div class="resultNumber"></div><div class="resultBody"></div></li>';})();
},{}],41:[function(require,module,exports){
(function() {
  var $, Command, CommandTemplate, CommandView, DomView, Templater, collection, markup, util, varying, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, collection = _ref.collection, varying = _ref.varying, DomView = _ref.DomView, Templater = _ref.Templater;

  Command = require('../../models/command').Command;

  markup = require('./default.html');

  $ = require('../../util/dollar');

  CommandTemplate = (function(_super) {
    __extends(CommandTemplate, _super);

    function CommandTemplate() {
      _ref1 = CommandTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CommandTemplate.prototype._dom = function() {
      return $(markup);
    };

    CommandTemplate.prototype._binding = function() {
      var binding;
      binding = CommandTemplate.__super__._binding.call(this);
      binding.find('.commandNumber').text().from('idx').flatMap(function(idx) {
        return "cmd" + idx;
      });
      binding.find('.commandText').text().from('input');
      binding.find('.resultNumber').text().from('idx').flatMap(function(idx) {
        return "res" + idx;
      });
      return binding.find('.resultBody').render(this.options.app, {
        context: 'repl'
      }).from('result');
    };

    return CommandTemplate;

  })(Templater);

  CommandView = (function(_super) {
    __extends(CommandView, _super);

    function CommandView() {
      _ref2 = CommandView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CommandView.prototype.templateClass = CommandTemplate;

    return CommandView;

  })(DomView);

  util.extend(module.exports, {
    CommandTemplate: CommandTemplate,
    CommandView: CommandView,
    registerWith: function(library) {
      return library.register(Command, CommandView);
    }
  });

}).call(this);

},{"../../models/command":33,"../../util/dollar":37,"./default.html":40,"janus":70}],42:[function(require,module,exports){
(function(){module.exports = '<div class="janusConsolePrompt"><div class="caret">&rsaquo;</div><div class="consolePrompt"></div></div>';})();
},{}],43:[function(require,module,exports){
(function() {
  var $, Command, CommandEditTemplate, CommandEditView, DomView, Templater, collection, markup, util, varying, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, collection = _ref.collection, varying = _ref.varying, DomView = _ref.DomView, Templater = _ref.Templater;

  Command = require('../../models/command').Command;

  markup = require('./edit.html');

  $ = require('../../util/dollar');

  CommandEditTemplate = (function(_super) {
    __extends(CommandEditTemplate, _super);

    function CommandEditTemplate() {
      _ref1 = CommandEditTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CommandEditTemplate.prototype._dom = function() {
      return $(markup);
    };

    CommandEditTemplate.prototype._binding = function() {
      var binding;
      binding = CommandEditTemplate.__super__._binding.call(this);
      binding.find('.consolePrompt').render(this.options.app, {
        context: 'edit'
      }).fromAttribute('input');
      return binding.find('.caret, .consolePrompt').classed('invalid').from('result').flatMap(function(result) {
        return result != null ? result.invalid : void 0;
      });
    };

    return CommandEditTemplate;

  })(Templater);

  CommandEditView = (function(_super) {
    __extends(CommandEditView, _super);

    function CommandEditView() {
      _ref2 = CommandEditView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CommandEditView.prototype.templateClass = CommandEditTemplate;

    return CommandEditView;

  })(DomView);

  util.extend(module.exports, {
    CommandEditTemplate: CommandEditTemplate,
    CommandEditView: CommandEditView,
    registerWith: function(library) {
      return library.register(Command, CommandEditView, {
        context: 'edit'
      });
    }
  });

}).call(this);

},{"../../models/command":33,"../../util/dollar":37,"./edit.html":42,"janus":70}],44:[function(require,module,exports){
(function() {
  var $, Base, BaseFallbackTemplate, BaseFallbackView, DomView, Model, Templater, domViewIdent, ident, modelIdent, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, Templater = _ref.Templater, Base = _ref.Base, Model = _ref.Model;

  $ = require('../../util/dollar');

  ident = function(obj) {
    if (obj instanceof Model) {
      return modelIdent(obj);
    } else if (obj instanceof DomView) {
      return domViewIdent(obj);
    } else {
      return "instance of " + obj.constructor.name;
    }
  };

  modelIdent = function(model) {
    var detail, main, part;
    main = "instance of model " + model.constructor.name;
    detail = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = [model.get('id') != null ? "id:" + (model.get('id')) : void 0, model.get('name') != null ? "name:" + (model.get('name')) : void 0];
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        part = _ref1[_i];
        if (part != null) {
          _results.push(part);
        }
      }
      return _results;
    })();
    if (detail.length === 0) {
      return main;
    } else {
      return "" + main + " {" + (detail.join('; ')) + "}";
    }
  };

  domViewIdent = function(view) {
    return "instance of view " + view.constructor.name + " bound against " + (ident(view.subject));
  };

  BaseFallbackTemplate = (function(_super) {
    __extends(BaseFallbackTemplate, _super);

    function BaseFallbackTemplate() {
      _ref1 = BaseFallbackTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    BaseFallbackTemplate.prototype._dom = function() {
      return $('<span class="literal fallback"></span>');
    };

    BaseFallbackTemplate.prototype._binding = function() {
      var binding;
      binding = BaseFallbackTemplate.__super__._binding.call(this);
      return binding.find('.fallback').text().fromSelf().flatMap(ident);
    };

    return BaseFallbackTemplate;

  })(Templater);

  BaseFallbackView = (function(_super) {
    __extends(BaseFallbackView, _super);

    function BaseFallbackView() {
      _ref2 = BaseFallbackView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    BaseFallbackView.prototype.templateClass = BaseFallbackTemplate;

    return BaseFallbackView;

  })(DomView);

  util.extend(module.exports, {
    BaseFallbackTemplate: BaseFallbackTemplate,
    BaseFallbackView: BaseFallbackView,
    registerWith: function(library) {
      return library.register(Base, BaseFallbackView, {
        context: 'repl',
        priority: -1
      });
    }
  });

}).call(this);

},{"../../util/dollar":37,"janus":70}],45:[function(require,module,exports){
(function() {
  var $, DomView, FunctionTemplate, FunctionView, Templater, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, DomView = _ref.DomView;

  $ = require('../../util/dollar');

  FunctionTemplate = (function(_super) {
    __extends(FunctionTemplate, _super);

    function FunctionTemplate() {
      _ref1 = FunctionTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    FunctionTemplate.prototype._dom = function() {
      return $('<span class="literal function"></span>');
    };

    FunctionTemplate.prototype._binding = function() {
      var binding;
      binding = FunctionTemplate.__super__._binding.call(this);
      return binding.find('.function').text().fromSelf().flatMap(function(f) {
        return 'Function: ' + f.toString();
      });
    };

    return FunctionTemplate;

  })(Templater);

  FunctionView = (function(_super) {
    __extends(FunctionView, _super);

    function FunctionView() {
      _ref2 = FunctionView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    FunctionView.prototype.templateClass = FunctionTemplate;

    return FunctionView;

  })(DomView);

  util.extend(module.exports, {
    FunctionTemplate: FunctionTemplate,
    FunctionView: FunctionView,
    registerWith: function(library) {
      return library.register(Function, FunctionView, {
        context: 'repl'
      });
    }
  });

}).call(this);

},{"../../util/dollar":37,"janus":70}],46:[function(require,module,exports){
(function() {
  var $, DomView, PendingTemplate, PendingView, ReadyState, ReadyTemplate, ReadyView, Request, SuccessTemplate, SuccessView, Templater, UserErrorTemplate, UserErrorView, reference, templater, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, templater = _ref.templater, DomView = _ref.DomView, (_ref1 = _ref.store, Request = _ref1.Request), reference = _ref.reference;

  ReadyState = require('../../models/ready-state').ReadyState;

  $ = require('../../util/dollar');

  ReadyTemplate = (function(_super) {
    __extends(ReadyTemplate, _super);

    function ReadyTemplate() {
      _ref2 = ReadyTemplate.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ReadyTemplate.prototype._dom = function() {
      return $('<span class="literal readyState"></span>');
    };

    ReadyTemplate.prototype._binding = function() {
      var binding;
      binding = ReadyTemplate.__super__._binding.call(this);
      return binding.find('.readyState').text().fromSelf().flatMap(function(state) {
        var _ref3;
        return (_ref3 = state.message) != null ? _ref3 : 'Press <enter> to execute.';
      });
    };

    return ReadyTemplate;

  })(Templater);

  ReadyView = (function(_super) {
    __extends(ReadyView, _super);

    function ReadyView() {
      _ref3 = ReadyView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    ReadyView.prototype.templateClass = ReadyTemplate;

    return ReadyView;

  })(DomView);

  PendingTemplate = (function(_super) {
    __extends(PendingTemplate, _super);

    function PendingTemplate() {
      _ref4 = PendingTemplate.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    PendingTemplate.prototype._dom = function() {
      return $('<span class="literal">..working..</span>');
    };

    return PendingTemplate;

  })(Templater);

  PendingView = (function(_super) {
    __extends(PendingView, _super);

    function PendingView() {
      _ref5 = PendingView.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    PendingView.prototype.templateClass = PendingTemplate;

    return PendingView;

  })(DomView);

  UserErrorTemplate = (function(_super) {
    __extends(UserErrorTemplate, _super);

    function UserErrorTemplate() {
      _ref6 = UserErrorTemplate.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    UserErrorTemplate.prototype._dom = function() {
      return $('<span class="literal error">Error: <span class="message"></span></span>');
    };

    UserErrorTemplate.prototype._binding = function() {
      var binding;
      binding = UserErrorTemplate.__super__._binding.call(this);
      return binding.find('.message').text().fromSelf().flatMap(function(state) {
        var _ref7;
        return (_ref7 = state.error) != null ? _ref7 : '(unknown)';
      });
    };

    return UserErrorTemplate;

  })(Templater);

  UserErrorView = (function(_super) {
    __extends(UserErrorView, _super);

    function UserErrorView() {
      _ref7 = UserErrorView.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    UserErrorView.prototype.templateClass = UserErrorTemplate;

    return UserErrorView;

  })(DomView);

  SuccessTemplate = (function(_super) {
    __extends(SuccessTemplate, _super);

    function SuccessTemplate() {
      _ref8 = SuccessTemplate.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    SuccessTemplate.prototype._dom = function() {
      return $('<div class="success"/>');
    };

    SuccessTemplate.prototype._binding = function() {
      var binding;
      binding = SuccessTemplate.__super__._binding.call(this);
      return binding.find('.success').render(this.options.app, {
        context: 'repl'
      }).fromSelf().flatMap(function(state) {
        var result;
        if (state instanceof Request.state.type.Success) {
          result = state.result;
          if (result instanceof reference.RequestReference && result.value instanceof reference.RequestResolver) {
            result.value.resolve(this.parentBinder.options.app.get('mainApp'));
          } else if (result instanceof Request) {
            this.parentBinder.options.app.get('mainApp').getStore(result).handle();
          }
        }
        return state.successOrElse(null);
      });
    };

    return SuccessTemplate;

  })(Templater);

  SuccessView = (function(_super) {
    __extends(SuccessView, _super);

    function SuccessView() {
      _ref9 = SuccessView.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    SuccessView.prototype.templateClass = SuccessTemplate;

    return SuccessView;

  })(DomView);

  util.extend(module.exports, {
    ReadyTemplate: ReadyTemplate,
    ReadyView: ReadyView,
    PendingTemplate: PendingTemplate,
    PendingView: PendingView,
    SuccessTemplate: SuccessTemplate,
    SuccessView: SuccessView,
    registerWith: function(library) {
      library.register(ReadyState, ReadyView, {
        context: 'repl'
      });
      library.register(Request.state.type.Pending, PendingView, {
        context: 'repl'
      });
      library.register(Request.state.type.UserError, UserErrorView, {
        context: 'repl'
      });
      return library.register(Request.state.type.Success, SuccessView, {
        context: 'repl'
      });
    }
  });

}).call(this);

},{"../../models/ready-state":35,"../../util/dollar":37,"janus":70}],47:[function(require,module,exports){
(function(){module.exports = '<div class="janusConsole"><div class="scrollback"></div><div class="prompt"></div></div>';})();
},{}],48:[function(require,module,exports){
(function() {
  var $, DomView, Repl, ReplTemplate, ReplView, Templater, markup, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, Templater = _ref.Templater;

  Repl = require('../../models/repl').Repl;

  markup = require('./repl.html');

  $ = require('../../util/dollar');

  ReplTemplate = (function(_super) {
    __extends(ReplTemplate, _super);

    function ReplTemplate() {
      _ref1 = ReplTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ReplTemplate.prototype._dom = function() {
      return $(markup);
    };

    ReplTemplate.prototype._binding = function() {
      var binding;
      binding = ReplTemplate.__super__._binding.call(this);
      binding.find('.scrollback').render(this.options.app).from('history').end().classed('hide').from('history').flatMap(function(history) {
        return history != null ? history.watchAt(0).map(function(first) {
          return first.watch('input').map(function(input) {
            return (input == null) || input === '';
          });
        }) : void 0;
      });
      return binding.find('.prompt').render(this.options.app, {
        context: 'edit'
      }).from('current');
    };

    return ReplTemplate;

  })(Templater);

  ReplView = (function(_super) {
    __extends(ReplView, _super);

    function ReplView() {
      _ref2 = ReplView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ReplView.prototype.templateClass = ReplTemplate;

    ReplView.prototype._wireEvents = function() {
      var dom,
        _this = this;
      dom = this.artifact();
      return dom.on('keypress', '.prompt input', function(event) {
        if (event.which === 13) {
          _this.subject.newCommand();
        }
        return dom.find('.prompt input').focus();
      });
    };

    return ReplView;

  })(DomView);

  util.extend(module.exports, {
    ReplTemplate: ReplTemplate,
    ReplView: ReplView,
    registerWith: function(library) {
      return library.register(Repl, ReplView);
    }
  });

}).call(this);

},{"../../models/repl":36,"../../util/dollar":37,"./repl.html":47,"janus":70}],49:[function(require,module,exports){
(function(){module.exports = '<ul class="varyingLive"></ul>';})();
},{}],50:[function(require,module,exports){
(function() {
  var $, DomView, Templater, VaryingLiveTemplate, VaryingLiveView, collection, markup, util, varying, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, collection = _ref.collection, varying = _ref.varying, DomView = _ref.DomView, Templater = _ref.Templater;

  markup = require('./live.html');

  $ = require('../../util/dollar');

  VaryingLiveTemplate = (function(_super) {
    __extends(VaryingLiveTemplate, _super);

    function VaryingLiveTemplate() {
      _ref1 = VaryingLiveTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    VaryingLiveTemplate.prototype._dom = function() {
      return $(markup);
    };

    VaryingLiveTemplate.prototype._binding = function() {
      var binding;
      binding = VaryingLiveTemplate.__super__._binding.call(this);
      return binding.find('.varyingLive').render(this.options.app).fromAux('history');
    };

    return VaryingLiveTemplate;

  })(Templater);

  VaryingLiveView = (function(_super) {
    __extends(VaryingLiveView, _super);

    function VaryingLiveView() {
      _ref2 = VaryingLiveView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    VaryingLiveView.prototype.templateClass = VaryingLiveTemplate;

    VaryingLiveView.prototype.initialize = function() {
      var _this = this;
      this._valueHistory = new collection.List();
      return this.subject.on('changed', function(newValue) {
        return _this._valueHistory.add(newValue);
      });
    };

    VaryingLiveView.prototype._auxData = function() {
      return {
        history: this._valueHistory
      };
    };

    return VaryingLiveView;

  })(DomView);

  util.extend(module.exports, {
    VaryingLiveTemplate: VaryingLiveTemplate,
    VaryingLiveView: VaryingLiveView,
    registerWith: function(library) {
      return library.register(varying.Varying, VaryingLiveView, {
        context: 'live'
      });
    }
  });

}).call(this);

},{"../../util/dollar":37,"./live.html":49,"janus":70}],51:[function(require,module,exports){
(function() {
  var App, Model, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('../model/model').Model;

  util = require('../util/util');

  App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype._get = function(library) {
      var _this = this;

      return function(obj, options) {
        if (options == null) {
          options = {};
        }
        return library.get(obj, util.extendNew(options, {
          constructorOpts: util.extendNew(options.constructorOpts, {
            app: _this
          })
        }));
      };
    };

    App.prototype.getView = function(obj, options) {
      return this._get(this.get('views'))(obj, options);
    };

    App.prototype.getStore = function(obj, options) {
      return this._get(this.get('stores'))(obj, options);
    };

    App.prototype.withViewLibrary = function(viewLibrary) {
      var result;

      result = this.shadow();
      result.set('views', viewLibrary);
      this.emit('derived', result);
      return result;
    };

    App.prototype.withStoreLibrary = function(storeLibrary) {
      var result;

      result = this.shadow();
      result.set('stores', storeLibrary);
      this.emit('derived', result);
      return result;
    };

    return App;

  })(Model);

  util.extend(module.exports, {
    App: App
  });

}).call(this);

},{"../model/model":75,"../util/util":84}],52:[function(require,module,exports){
(function() {
  var App, Base, Endpoint, EndpointResponse, ForbiddenResponse, InternalErrorResponse, InvalidRequestResponse, NotFoundResponse, OkResponse, Request, StoreManifest, UnauthorizedResponse, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Request = require('../model/store').Request;

  App = require('./app').App;

  StoreManifest = require('./manifest').StoreManifest;

  EndpointResponse = (function() {
    function EndpointResponse(content) {
      this.content = content;
    }

    return EndpointResponse;

  })();

  OkResponse = (function(_super) {
    __extends(OkResponse, _super);

    function OkResponse() {
      _ref = OkResponse.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OkResponse.prototype.httpCode = 200;

    return OkResponse;

  })(EndpointResponse);

  InvalidRequestResponse = (function(_super) {
    __extends(InvalidRequestResponse, _super);

    function InvalidRequestResponse() {
      _ref1 = InvalidRequestResponse.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    InvalidRequestResponse.prototype.httpCode = 400;

    return InvalidRequestResponse;

  })(EndpointResponse);

  UnauthorizedResponse = (function(_super) {
    __extends(UnauthorizedResponse, _super);

    function UnauthorizedResponse() {
      _ref2 = UnauthorizedResponse.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    UnauthorizedResponse.prototype.httpCode = 401;

    return UnauthorizedResponse;

  })(EndpointResponse);

  ForbiddenResponse = (function(_super) {
    __extends(ForbiddenResponse, _super);

    function ForbiddenResponse() {
      _ref3 = ForbiddenResponse.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    ForbiddenResponse.prototype.httpCode = 403;

    return ForbiddenResponse;

  })(EndpointResponse);

  NotFoundResponse = (function(_super) {
    __extends(NotFoundResponse, _super);

    function NotFoundResponse() {
      _ref4 = NotFoundResponse.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    NotFoundResponse.prototype.httpCode = 404;

    return NotFoundResponse;

  })(EndpointResponse);

  InternalErrorResponse = (function(_super) {
    __extends(InternalErrorResponse, _super);

    function InternalErrorResponse() {
      _ref5 = InternalErrorResponse.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    InternalErrorResponse.prototype.httpCode = 500;

    return InternalErrorResponse;

  })(EndpointResponse);

  Endpoint = (function(_super) {
    __extends(Endpoint, _super);

    function Endpoint(pageModelClass, pageLibrary, app) {
      this.pageModelClass = pageModelClass;
      this.pageLibrary = pageLibrary;
      this.app = app;
      Endpoint.__super__.constructor.call(this);
    }

    Endpoint.prototype.handle = function(env, respond) {
      var app, dom, manifest, pageModel, pageView,
        _this = this;

      app = this.initApp(env);
      manifest = new StoreManifest(app.get('stores'));
      manifest.on('allComplete', function() {
        return _this.finish(pageModel, pageView, manifest, respond);
      });
      manifest.on('requestComplete', function(request) {
        if (request.value instanceof Request.state.type.Error && request.options.fatal === true) {
          return _this.error(request, respond);
        }
      });
      pageModel = this.initPageModel(env, app, respond);
      pageView = this.pageLibrary.get(pageModel, {
        context: env.context,
        constructorOpts: {
          app: app
        }
      });
      dom = this.initPageView(pageView, env);
      pageModel.resolve();
      return dom;
    };

    Endpoint.prototype.initApp = function(env) {
      var storeLibrary;

      storeLibrary = this.app.get('stores').newEventBindings();
      return this.app.withStoreLibrary(storeLibrary);
    };

    Endpoint.prototype.initPageModel = function(env, app, respond) {
      return new this.pageModelClass({
        env: env
      }, {
        app: app
      });
    };

    Endpoint.prototype.initPageView = function(pageView, env) {
      return pageView.artifact();
    };

    Endpoint.prototype.finish = function(pageModel, pageView, manifest, respond) {
      return respond(new OkResponse(pageView.markup()));
    };

    Endpoint.prototype.error = function(request, respond) {
      return respond(new InternalErrorResponse());
    };

    Endpoint.factoryWith = function(pageLibrary, app) {
      var self;

      self = this;
      return function(pageModelClass) {
        return new self(pageModelClass, pageLibrary, app);
      };
    };

    return Endpoint;

  })(Base);

  util.extend(module.exports, {
    Endpoint: Endpoint,
    responses: {
      EndpointResponse: EndpointResponse,
      OkResponse: OkResponse,
      InvalidRequestResponse: InvalidRequestResponse,
      UnauthorizedResponse: UnauthorizedResponse,
      ForbiddenResponse: ForbiddenResponse,
      NotFoundResponse: NotFoundResponse,
      InternalErrorResponse: InternalErrorResponse
    }
  });

}).call(this);

},{"../core/base":67,"../model/store":78,"../util/util":84,"./app":51,"./manifest":54}],53:[function(require,module,exports){
(function() {
  var Base, Endpoint, Handler, HttpHandler, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  util = require('../util/util');

  Base = require('../core/base').Base;

  Endpoint = require('./endpoint').Endpoint;

  Handler = (function(_super) {
    __extends(Handler, _super);

    function Handler() {
      Handler.__super__.constructor.call(this);
    }

    Handler.prototype.handler = function() {
      return function() {};
    };

    return Handler;

  })(Base);

  HttpHandler = (function(_super) {
    __extends(HttpHandler, _super);

    function HttpHandler(endpoint) {
      this.endpoint = endpoint;
      HttpHandler.__super__.constructor.call(this);
    }

    HttpHandler.prototype.handle = function(request, response, params) {
      var handled;

      handled = false;
      return this.endpoint.handle({
        url: request.url,
        params: params,
        headers: request.headers,
        requestStream: request.request,
        responseStream: response.response
      }, function(result) {
        if (handled === true) {
          return;
        }
        handled = true;
        response.writeHead(result.httpCode, {
          'Content-Type': 'text/html'
        });
        response.write(result.content);
        return response.end();
      });
    };

    HttpHandler.prototype.handler = function() {
      var self;

      self = this;
      return function() {
        var params;

        params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return self.handle(this.req, this.res, params);
      };
    };

    return HttpHandler;

  })(Handler);

  util.extend(module.exports, {
    Handler: Handler,
    HttpHandler: HttpHandler
  });

}).call(this);

},{"../core/base":67,"../util/util":84,"./endpoint":52}],54:[function(require,module,exports){
(function() {
  var Base, Manifest, Request, StoreManifest, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Request = require('../model/store').Request;

  Manifest = (function(_super) {
    __extends(Manifest, _super);

    function Manifest() {
      Manifest.__super__.constructor.call(this);
      this._requestCount = 0;
      this.requests = [];
      this.objects = [];
      this._setHook();
    }

    Manifest.prototype.requested = function(request) {
      var handleChange,
        _this = this;

      this._requestCount += 1;
      this.requests.push(request);
      this.emit('requestStart', request);
      handleChange = function(state) {
        if (state instanceof Request.state.type.Complete) {
          if (state instanceof Request.state.type.Success) {
            _this.objects.push(state.result);
          }
          _this.emit('requestComplete', request, state.result);
          _this._requestCount -= 1;
          return _this._setHook();
        }
      };
      request.on('changed', handleChange);
      handleChange(request.value);
      return null;
    };

    Manifest.prototype._setHook = function() {
      var _this = this;

      if (this._hookSet === true) {
        return;
      }
      this._hookSet = true;
      return setTimeout((function() {
        _this._hookSet = false;
        if (_this._requestCount === 0) {
          return _this.emit('allComplete');
        }
      }), 0);
    };

    return Manifest;

  })(Base);

  StoreManifest = (function(_super) {
    __extends(StoreManifest, _super);

    function StoreManifest(library) {
      var _this = this;

      this.library = library;
      StoreManifest.__super__.constructor.call(this);
      this.listenTo(this.library, 'got', function(store) {
        return store.on('requesting', function(request) {
          return _this.requested(request);
        });
      });
    }

    return StoreManifest;

  })(Manifest);

  util.extend(module.exports, {
    Manifest: Manifest,
    StoreManifest: StoreManifest
  });

}).call(this);

},{"../core/base":67,"../model/store":78,"../util/util":84}],55:[function(require,module,exports){
(function() {
  var CattedList, DerivedList, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  util = require('../util/util');

  CattedList = (function(_super) {
    __extends(CattedList, _super);

    function CattedList(lists, options) {
      var list, listIdx, _fn, _i, _len, _ref,
        _this = this;

      this.lists = lists;
      this.options = options != null ? options : {};
      CattedList.__super__.constructor.call(this);
      this.list = util.foldLeft([])(this.lists, function(elems, list) {
        return elems.concat(list.list);
      });
      _ref = this.lists;
      _fn = function(list, listIdx) {
        var getOverallIdx;

        getOverallIdx = function(itemIdx) {
          return util.foldLeft(0)(_this.lists.slice(0, listIdx), function(length, list) {
            return length + list.list.length;
          }) + itemIdx;
        };
        list.on('added', function(elem, idx) {
          return _this._add(elem, getOverallIdx(idx));
        });
        return list.on('removed', function(_, idx) {
          return _this._removeAt(getOverallIdx(idx));
        });
      };
      for (listIdx = _i = 0, _len = _ref.length; _i < _len; listIdx = ++_i) {
        list = _ref[listIdx];
        _fn(list, listIdx);
      }
    }

    return CattedList;

  })(DerivedList);

  util.extend(module.exports, {
    CattedList: CattedList
  });

}).call(this);

},{"../util/util":84,"./list":60}],56:[function(require,module,exports){
(function() {
  var util;

  util = require('../util/util');

  util.extend(module.exports, {
    Collection: require('./types').Collection,
    OrderedCollection: require('./types').OrderedCollection,
    List: require('./list').List,
    DerivedList: require('./list').DerivedList,
    MappedList: require('./mapped-list').MappedList,
    FilteredList: require('./filtered-list').FilteredList,
    CattedList: require('./catted-list').CattedList,
    PartitionedList: require('./partitioned-list').PartitionedList,
    UniqList: require('./uniq-list').UniqList,
    Set: require('./set').Set,
    IndefiniteList: require('./indefinite-list').IndefiniteList,
    LazyList: require('./lazy-list').LazyList,
    CachedLazyList: require('./lazy-list').CachedLazyList,
    Window: require('./window').Window
  });

}).call(this);

},{"../util/util":84,"./catted-list":55,"./filtered-list":57,"./indefinite-list":58,"./lazy-list":59,"./list":60,"./mapped-list":61,"./partitioned-list":62,"./set":63,"./types":64,"./uniq-list":65,"./window":66}],57:[function(require,module,exports){
(function() {
  var DerivedList, FilteredList, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  FilteredList = (function(_super) {
    __extends(FilteredList, _super);

    function FilteredList(parent, isMember, options) {
      var _this = this;

      this.parent = parent;
      this.isMember = isMember;
      this.options = options != null ? options : {};
      FilteredList.__super__.constructor.call(this);
      this._initElems(this.parent.list);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
      this.parent.on('added', function(elem) {
        return _this._initElems(elem);
      });
      this.parent.on('removed', function(_, idx) {
        return _this._removeAt(idx);
      });
    }

    FilteredList.prototype._initElems = function(elems) {
      var elem, result, _i, _len,
        _this = this;

      if (!util.isArray(elems)) {
        elems = [elems];
      }
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        result = this.isMember(elem);
        if (result instanceof Varying) {
          (function(elem) {
            var lastMembership;

            lastMembership = false;
            return result.reactNow(function(membership) {
              if (lastMembership !== membership) {
                if (membership === true) {
                  _this._add(elem);
                } else {
                  _this._removeAt(_this.list.indexOf(elem));
                }
                return lastMembership = membership;
              }
            });
          })(elem);
        } else if (result === true) {
          this._add(elem);
        }
      }
      return elems;
    };

    return FilteredList;

  })(DerivedList);

  util.extend(module.exports, {
    FilteredList: FilteredList
  });

}).call(this);

},{"../core/varying":69,"../util/util":84,"./list":60}],58:[function(require,module,exports){
(function() {
  var Base, Indefinite, IndefiniteList, Many, One, OrderedCollection, StepResult, Termination, Varying, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  OrderedCollection = require('./types').OrderedCollection;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  StepResult = (function() {
    function StepResult() {}

    return StepResult;

  })();

  One = (function(_super) {
    __extends(One, _super);

    function One(elem, step) {
      this.elem = elem;
      this.step = step;
    }

    return One;

  })(StepResult);

  Many = (function(_super) {
    __extends(Many, _super);

    function Many(elems, step) {
      this.elems = elems;
      this.step = step;
    }

    return Many;

  })(StepResult);

  Indefinite = (function(_super) {
    __extends(Indefinite, _super);

    function Indefinite() {
      _ref = Indefinite.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Indefinite;

  })(StepResult);

  Termination = (function(_super) {
    __extends(Termination, _super);

    function Termination() {
      _ref1 = Termination.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return Termination;

  })(StepResult);

  IndefiniteList = (function(_super) {
    __extends(IndefiniteList, _super);

    function IndefiniteList(step, options) {
      this.options = options != null ? options : {};
      IndefiniteList.__super__.constructor.call(this);
      this.list = [];
      this._step(step, 0);
    }

    IndefiniteList.prototype.at = function(idx) {
      return this.list[idx];
    };

    IndefiniteList.prototype._step = function(step, idx) {
      var process, result,
        _this = this;

      result = step();
      process = function(result) {
        var elem, subidx, _base, _i, _len, _ref2;

        _this._truncate(idx);
        if (result instanceof One) {
          _this.list.push(result.elem);
          _this.emit('added', result.elem, idx);
          if (typeof (_base = result.elem).emit === "function") {
            _base.emit('addedTo', _this, idx);
          }
          return _this._step(result.step, idx + 1);
        } else if (result instanceof Many) {
          _this.list = _this.list.concat(result.elems);
          _ref2 = result.elems;
          for (subidx = _i = 0, _len = _ref2.length; _i < _len; subidx = ++_i) {
            elem = _ref2[subidx];
            _this.emit('added', elem, idx + subidx);
            if (typeof elem.emit === "function") {
              elem.emit('addedTo', _this, idx + subidx);
            }
          }
          return _this._step(result.step, idx + result.elems.length);
        } else if (result instanceof Indefinite) {
          return _this.set('completion', Indefinite);
        } else if (result instanceof Termination) {
          return _this.set('completion', Termination);
        }
      };
      if (result instanceof Varying) {
        result.on('changed', function(newResult) {
          return process(newResult);
        });
        return process(result.value);
      } else {
        return process(result);
      }
    };

    IndefiniteList.prototype._truncate = function(idx) {
      var elem, removed, subidx, _i, _len;

      removed = this.list.splice(idx, this.list.length - idx);
      for (subidx = _i = 0, _len = removed.length; _i < _len; subidx = ++_i) {
        elem = removed[subidx];
        this.emit('removed', elem, idx + subidx);
        if (typeof elem.emit === "function") {
          elem.emit('removedFrom', this, idx + subidx);
        }
      }
      return null;
    };

    IndefiniteList.One = function(elem, step) {
      return new One(elem, step);
    };

    IndefiniteList.Many = function(elems, step) {
      return new Many(elems, step);
    };

    IndefiniteList.Indefinite = new Indefinite;

    IndefiniteList.Termination = new Termination;

    return IndefiniteList;

  })(OrderedCollection);

  util.extend(module.exports, {
    IndefiniteList: IndefiniteList,
    result: {
      StepResult: StepResult,
      One: One,
      Many: Many,
      Indefinite: Indefinite,
      Termination: Termination
    }
  });

}).call(this);

},{"../core/base":67,"../core/varying":69,"../util/util":84,"./types":64}],59:[function(require,module,exports){
(function() {
  var CachedLazyList, Coverage, LazyList, List, Model, Range, Varying, rangeUpdater, util, wrapAndSealFate, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  _ref = require('../util/range'), Coverage = _ref.Coverage, Range = _ref.Range;

  List = require('./list').List;

  Model = require('../model/model').Model;

  Varying = require('../core/varying').Varying;

  wrapAndSealFate = function(range, f) {
    var wrapped;

    wrapped = new Range(range.lower, range.upper, range);
    wrapped.on('destroying', function() {
      return range.destroy();
    });
    return wrapped;
  };

  rangeUpdater = function(from, to) {
    return function() {
      if (from.value instanceof List) {
        return to.value.put(Math.max(from.lower - to.lower, 0), from.value.slice(Math.max(to.lower - from.lower, 0), +(from.upper - to.lower) + 1 || 9e9));
      }
    };
  };

  LazyList = (function(_super) {
    __extends(LazyList, _super);

    LazyList.bind('signature').fromVarying(function() {
      return this._signature();
    });

    function LazyList(_, options) {
      this.options = options;
      LazyList.__super__.constructor.call(this, [], this.options);
      this._activeRanges = new List();
      this._watchSignature();
    }

    LazyList.prototype._watchSignature = function() {
      var _this = this;

      return this.watch('signature').on('changed', function(key) {
        var range, _i, _len, _ref1, _results;

        _ref1 = _this._activeRanges.list;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          range = _ref1[_i];
          _results.push(range.setValue(_this._range(range.lower, range.upper)));
        }
        return _results;
      });
    };

    LazyList.prototype.at = function(idx) {
      return this.range(idx, idx).map(function(result) {
        if (result instanceof List) {
          return result[0];
        } else {
          return result;
        }
      });
    };

    LazyList.prototype.range = function(lower, upper) {
      var inner, range;

      inner = this._range(lower, upper);
      range = new Range(lower, upper, inner);
      range.on('destroying', function() {
        return inner.destroy();
      });
      this._activeRanges.add(range);
      return range;
    };

    LazyList.prototype._range = function(lower, upper) {};

    LazyList.prototype.length = function() {
      return this.watch('length');
    };

    LazyList.prototype._signature = function() {
      return new Varying('');
    };

    return LazyList;

  })(Model);

  CachedLazyList = (function(_super) {
    __extends(CachedLazyList, _super);

    function CachedLazyList() {
      var _this = this;

      CachedLazyList.__super__.constructor.call(this);
      this._extCoverage = new Coverage();
      this._intCoverages = {};
      this._activeRanges.on('added', function(range) {
        return _this._extCoverages.add(range);
      });
      this._initSignature(this.get('signature'));
    }

    CachedLazyList.prototype._watchSignature = function() {
      return this.watch('signature').on('changed', function(signature) {
        var range, _i, _len, _ref1, _results;

        if (this._intCoverages[signature] != null) {
          _ref1 = this._activeRanges.list;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            range = _ref1[_i];
            _results.push(this._fetchRange(range));
          }
          return _results;
        } else {
          return this._initSignature(signature);
        }
      });
    };

    CachedLazyList.prototype._initSignature = function(signature) {
      var lower, range, upper, _i, _j, _len, _len1, _ref1, _ref2, _ref3;

      this._intCoverages[signature] = new Coverage();
      _ref1 = this._extCoverages.fills();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        _ref2 = _ref1[_i], lower = _ref2[0], upper = _ref2[1];
        this.range(lower, upper);
      }
      _ref3 = this._activeRanges.list;
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        range = _ref3[_j];
        range.setValue(this._fetchRange(new Range(range.lower, range.upper, new List())));
      }
      return null;
    };

    CachedLazyList.prototype.range = function(lower, upper) {
      var result, wrapped;

      result = new Range(lower, upper, new List());
      wrapped = wrapAndSealFate(result);
      this._fetchRange(result);
      this._activeRanges.add(wrapped);
      return wrapped;
    };

    CachedLazyList.prototype._fetchRange = function(result) {
      var gaps, intCoverage, lower, range, upper, _fn, _fn1, _i, _j, _len, _len1, _ref1, _ref2;

      intCoverage = this._intCoverage[this.get('signature')];
      _ref1 = intCoverage.within(lower, upper);
      _fn = function(range) {
        var update;

        update = rangeUpdater(range, result);
        update();
        return range.on('changed', update);
      };
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        range = _ref1[_i];
        _fn(range);
      }
      gaps = intCoverage.gaps(lower, upper);
      _fn1 = function() {
        var update;

        range = this._range(lower, upper);
        update = rangeUpdater(range, result);
        update();
        return range.on('changed', update);
      };
      for (_j = 0, _len1 = gaps.length; _j < _len1; _j++) {
        _ref2 = gaps[_j], lower = _ref2[0], upper = _ref2[1];
        _fn1();
      }
      return result;
    };

    return CachedLazyList;

  })(LazyList);

  util.extend(module.exports, {
    LazyList: LazyList,
    CachedLazyList: CachedLazyList
  });

}).call(this);

},{"../core/varying":69,"../model/model":75,"../util/range":83,"../util/util":84,"./list":60}],60:[function(require,module,exports){
(function() {
  var Base, DerivedList, List, Model, OrderedCollection, Reference, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Base = require('../core/base').Base;

  Varying = require('../core/varying').Varying;

  OrderedCollection = require('./types').OrderedCollection;

  Model = require('../model/model').Model;

  Reference = require('../model/reference').Reference;

  util = require('../util/util');

  List = (function(_super) {
    __extends(List, _super);

    function List(list, options) {
      if (list == null) {
        list = [];
      }
      this.options = options != null ? options : {};
      List.__super__.constructor.call(this, {}, this.options);
      this.list = [];
      this.add(list);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    List.prototype.add = function(elems, idx) {
      var elem, subidx, _i, _len,
        _this = this;

      if (idx == null) {
        idx = this.list.length;
      }
      if (!util.isArray(elems)) {
        elems = [elems];
      }
      elems = this._processElements(elems);
      Array.prototype.splice.apply(this.list, [idx, 0].concat(elems));
      for (subidx = _i = 0, _len = elems.length; _i < _len; subidx = ++_i) {
        elem = elems[subidx];
        this.emit('added', elem, idx + subidx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('addedTo', this, idx + subidx);
          }
        }
        if (elem instanceof Base) {
          (function(elem) {
            return _this.listenTo(elem, 'destroying', function() {
              return _this.remove(elem);
            });
          })(elem);
        }
      }
      return elems;
    };

    List.prototype.remove = function(which) {
      var idx;

      idx = this.list.indexOf(which);
      if (!(util.isNumber(idx) && idx >= 0)) {
        return false;
      }
      return this.removeAt(idx);
    };

    List.prototype.removeAt = function(idx) {
      var removed;

      removed = this.list.splice(idx, 1)[0];
      this.emit('removed', removed, idx);
      if (removed != null) {
        if (typeof removed.emit === "function") {
          removed.emit('removedFrom', this, idx);
        }
      }
      return removed;
    };

    List.prototype.move = function(elem, idx) {
      var oldIdx;

      oldIdx = this.list.indexOf(elem);
      if (!(oldIdx >= 0)) {
        return;
      }
      this.list.splice(oldIdx, 1);
      this.list.splice(idx, 0, elem);
      this.emit('moved', elem, idx, oldIdx);
      if (elem != null) {
        if (typeof elem.emit === "function") {
          elem.emit('movedIn', this.list, idx, oldIdx);
        }
      }
      return elem;
    };

    List.prototype.removeAll = function() {
      var elem, idx, _i, _len, _ref;

      _ref = this.list;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        elem = _ref[idx];
        this.emit('removed', elem, idx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('removedFrom', this, idx);
          }
        }
      }
      return this.list.splice(0, this.list.length);
    };

    List.prototype.at = function(idx) {
      if (idx >= 0) {
        return this.list[idx];
      } else {
        return this.list[this.list.length + idx];
      }
    };

    List.prototype.watchAt = function(idx) {
      var result;

      result = new Varying(this.at(idx));
      this.on('added', function() {
        return result.setValue(this.at(idx));
      });
      this.on('removed', function() {
        return result.setValue(this.at(idx));
      });
      return result;
    };

    List.prototype.watchLength = function() {
      var result;

      result = new Varying(this.list.length);
      this.on('added', function() {
        return result.setValue(this.list.length);
      });
      this.on('removed', function() {
        return result.setValue(this.list.length);
      });
      return result;
    };

    List.prototype.put = function() {
      var elem, elems, idx, removed, subidx, _i, _j, _len, _len1, _ref;

      idx = arguments[0], elems = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.list[idx] == null) {
        this.list[idx] = null;
        delete this.list[idx];
      }
      elems = this._processElements(elems);
      removed = (_ref = this.list).splice.apply(_ref, [idx, elems.length].concat(__slice.call(elems)));
      for (subidx = _i = 0, _len = removed.length; _i < _len; subidx = ++_i) {
        elem = removed[subidx];
        if (!(elem != null)) {
          continue;
        }
        this.emit('removed', elem, idx + subidx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('removedFrom', this, idx + subidx);
          }
        }
      }
      for (subidx = _j = 0, _len1 = elems.length; _j < _len1; subidx = ++_j) {
        elem = elems[subidx];
        this.emit('added', elem, idx + subidx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('addedTo', this, idx + subidx);
          }
        }
      }
      return removed;
    };

    List.prototype.putAll = function(list) {
      var elem, i, oldIdx, oldList, _i, _j, _len, _len1;

      oldList = this.list.slice();
      for (_i = 0, _len = oldList.length; _i < _len; _i++) {
        elem = oldList[_i];
        if (!(list.indexOf(elem) >= 0)) {
          this.remove(elem);
        }
      }
      for (i = _j = 0, _len1 = list.length; _j < _len1; i = ++_j) {
        elem = list[i];
        if (this.list[i] === elem) {
          continue;
        }
        oldIdx = this.list.indexOf(elem);
        if (oldIdx >= 0) {
          this.move(elem, i);
        } else {
          this.add(this._processElements([elem])[0], i);
        }
      }
      return list;
    };

    List.prototype.shadow = function() {
      var item, newArray;

      newArray = (function() {
        var _i, _len, _ref, _results;

        _ref = this.list;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item instanceof Model) {
            _results.push(item.shadow());
          } else {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
      return new this.constructor(newArray, util.extendNew(this.options, {
        parent: this
      }));
    };

    List.prototype.modified = function(deep) {
      var i, isDeep, parentValue, value, _i, _len, _ref, _ref1, _ref2;

      if (this._parent == null) {
        return false;
      }
      if (this._parent.list.length !== this.list.length) {
        return true;
      }
      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this) : deep === true;
      _ref = this.list;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        value = _ref[i];
        parentValue = this._parent.list[i];
        if (value instanceof Reference) {
          value = (_ref1 = value.value) != null ? _ref1 : value.flatValue;
        }
        if (parentValue instanceof Reference) {
          parentValue = (_ref2 = parentValue.value) != null ? _ref2 : parentValue.flatValue;
        }
        if (value instanceof Model) {
          if (__indexOf.call(value.originals(), parentValue) < 0) {
            return true;
          }
          if (isDeep === true && value.modified(deep)) {
            return true;
          }
        } else {
          if (parentValue !== value && !((parentValue == null) && (value == null))) {
            return true;
          }
        }
      }
      return false;
    };

    List.prototype.watchModified = function(deep) {
      var isDeep, _ref, _ref1,
        _this = this;

      if (this._parent == null) {
        return new Varying(false);
      }
      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this) : deep === true;
      if (isDeep === true) {
        return (_ref = this._watchModifiedDeep$) != null ? _ref : this._watchModifiedDeep$ = (function() {
          var model, react, result, uniqSubmodels, watchModel, _i, _len, _ref1;

          result = new Varying(_this.modified(deep));
          react = function() {
            return result.setValue(_this.modified(deep));
          };
          _this.on('added', react);
          _this.on('removed', react);
          _this.on('moved', react);
          watchModel = function(model) {
            return result.listenTo(model.watchModified(deep), 'changed', function(isChanged) {
              if (isChanged === true) {
                return result.setValue(true);
              } else {
                return react();
              }
            });
          };
          uniqSubmodels = _this.map(function(elem) {
            return elem;
          }).filter(function(elem) {
            return elem instanceof Model;
          }).uniq();
          _ref1 = uniqSubmodels.list;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            model = _ref1[_i];
            watchModel(model);
          }
          uniqSubmodels.on('added', function(newModel) {
            return watchModel(newModel);
          });
          uniqSubmodels.on('removed', function(oldModel) {
            return result.unlistenTo(oldModel.watchModified(deep));
          });
          return result;
        })();
      } else {
        return (_ref1 = this._watchModified$) != null ? _ref1 : this._watchModified$ = (function() {
          var react, result;

          result = new Varying(_this.modified(deep));
          react = function() {
            if (_this.list.length !== _this._parent.list.length) {
              return result.setValue(true);
            } else {
              return result.setValue(_this.modified(deep));
            }
          };
          _this.on('added', react);
          _this.on('removed', react);
          return result;
        })();
      }
    };

    List.prototype._processElements = function(elems) {
      var elem, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        if (this._parent != null) {
          if (elem instanceof Model) {
            _results.push(elem.shadow());
          } else if (elem instanceof Reference) {
            _results.push(elem.map(function(value) {
              if (value instanceof Model) {
                return value.shadow();
              } else {
                return value;
              }
            }));
          } else {
            _results.push(elem);
          }
        } else {
          _results.push(elem);
        }
      }
      return _results;
    };

    List.deserialize = function(data) {
      var datum, items;

      items = (function() {
        var _i, _len, _results;

        if ((this.modelClass != null) && (this.modelClass.prototype instanceof Model || this.modelClass.prototype instanceof OrderedCollection)) {
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            datum = data[_i];
            _results.push(this.modelClass.deserialize(datum));
          }
          return _results;
        } else {
          return data.slice();
        }
      }).call(this);
      return new this(items);
    };

    List.serialize = function(list) {
      var child, _i, _len, _ref, _results;

      _ref = list.list;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child instanceof Reference) {
          child = child.value instanceof Model ? child.value : child.flatValue;
        }
        if (child.serialize != null) {
          _results.push(child.serialize());
        } else {
          _results.push(child);
        }
      }
      return _results;
    };

    return List;

  })(OrderedCollection);

  DerivedList = (function(_super) {
    var method, _i, _len, _ref1;

    __extends(DerivedList, _super);

    function DerivedList() {
      _ref = DerivedList.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _ref1 = ['add', 'remove', 'removeAt', 'removeAll', 'put', 'putAll', 'move'];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      method = _ref1[_i];
      DerivedList.prototype["_" + method] = DerivedList.__super__[method];
      DerivedList.prototype[method] = (function() {});
    }

    DerivedList.prototype.shadow = function() {
      return this;
    };

    return DerivedList;

  })(List);

  util.extend(module.exports, {
    List: List,
    DerivedList: DerivedList
  });

}).call(this);

},{"../core/base":67,"../core/varying":69,"../model/model":75,"../model/reference":77,"../util/util":84,"./types":64}],61:[function(require,module,exports){
(function() {
  var DerivedList, List, MappedList, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('./list'), List = _ref.List, DerivedList = _ref.DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  MappedList = (function(_super) {
    __extends(MappedList, _super);

    function MappedList(parent, mapper, options) {
      var elem, _i, _len, _ref1,
        _this = this;

      this.parent = parent;
      this.mapper = mapper;
      this.options = options != null ? options : {};
      MappedList.__super__.constructor.call(this);
      this._mappers = new List();
      _ref1 = this.parent.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        this._add(elem);
      }
      this.parent.on('added', function(elem, idx) {
        return _this._add(elem, idx);
      });
      this.parent.on('removed', function(_, idx) {
        return _this._removeAt(idx);
      });
    }

    MappedList.prototype._add = function(elem, idx) {
      var mapped, wrapped,
        _this = this;

      wrapped = Varying.ly(elem);
      mapped = wrapped.map(this.mapper);
      mapped.destroyWith(wrapped);
      this._mappers.add(mapped, idx);
      mapped.on('changed', function(newValue) {
        return _this._put(_this._mappers.list.indexOf(mapped), newValue);
      });
      return MappedList.__super__._add.call(this, mapped.value, idx);
    };

    MappedList.prototype._removeAt = function(idx) {
      var _ref1;

      if ((_ref1 = this._mappers.removeAt(idx)) != null) {
        _ref1.destroy();
      }
      return MappedList.__super__._removeAt.call(this, idx);
    };

    return MappedList;

  })(DerivedList);

  util.extend(module.exports, {
    MappedList: MappedList
  });

}).call(this);

},{"../core/varying":69,"../util/util":84,"./list":60}],62:[function(require,module,exports){
(function() {
  var DerivedList, List, PartitionedList, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('./list'), List = _ref.List, DerivedList = _ref.DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  PartitionedList = (function(_super) {
    __extends(PartitionedList, _super);

    function PartitionedList(parent, partitioner, options) {
      var elem, _i, _len, _ref1,
        _this = this;

      this.parent = parent;
      this.partitioner = partitioner;
      this.options = options != null ? options : {};
      PartitionedList.__super__.constructor.call(this);
      this._partitions = {};
      _ref1 = this.parent.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        this._add(elem);
      }
      this.parent.on('added', function(elem, idx) {
        return _this._add(elem, idx);
      });
      this.parent.on('removed', function(_, idx) {
        return _this._removeAt(idx);
      });
    }

    PartitionedList.prototype._add = function(elem, idx) {};

    return PartitionedList;

  })(DerivedList);

  util.extend(module.exports, {
    PartitionedList: PartitionedList
  });

}).call(this);

},{"../core/varying":69,"../util/util":84,"./list":60}],63:[function(require,module,exports){
(function() {
  var Base, List, Set, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  List = require('./list').List;

  util = require('../util/util');

  Set = (function(_super) {
    __extends(Set, _super);

    function Set() {
      _ref = Set.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Set.prototype.has = function(elem) {
      return this.list.indexOf(elem) >= 0;
    };

    Set.prototype.add = function(elems) {
      var elem, _i, _len, _results,
        _this = this;

      if (!util.isArray(elems)) {
        elems = [elems];
      }
      _results = [];
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        if (this.has(elem)) {
          continue;
        }
        this.list.push(elem);
        this.emit('added', elem);
        if (typeof elem.emit === "function") {
          elem.emit('addedTo', this);
        }
        if (elem instanceof Base) {
          _results.push((function() {
            return _this.listenTo(elem, 'destroying', function() {
              return _this.remove(elem);
            });
          })());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Set;

  })(List);

  util.extend(module.exports, {
    Set: Set
  });

}).call(this);

},{"../core/base":67,"../util/util":84,"./list":60}],64:[function(require,module,exports){
(function() {
  var Collection, Model, OrderedCollection, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Model = require('../model/model').Model;

  util = require('../util/util');

  Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Collection.prototype.filter = function(f) {
      return new (require('./filtered-list').FilteredList)(this, f);
    };

    Collection.prototype.map = function(f) {
      return new (require('./mapped-list').MappedList)(this, f);
    };

    Collection.prototype.concat = function() {
      var lists;

      lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (util.isArray(lists[0]) && lists.length === 1) {
        lists = lists[0];
      }
      return new (require('./catted-list').CattedList)([this].concat(lists));
    };

    Collection.prototype.partition = function(f) {
      return new (require('./partitioned-list').PartitionedList)(this, f);
    };

    Collection.prototype.uniq = function() {
      return new (require('./uniq-list').UniqList)(this);
    };

    Collection.prototype.react = function(f) {
      return this.on('added', f);
    };

    Collection.prototype.reactNow = function(f) {
      var elem, _i, _len, _ref1;

      _ref1 = this.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        f(elem);
      }
      return this.on('added', f);
    };

    return Collection;

  })(Model);

  OrderedCollection = (function(_super) {
    __extends(OrderedCollection, _super);

    function OrderedCollection() {
      _ref1 = OrderedCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return OrderedCollection;

  })(Collection);

  util.extend(module.exports, {
    Collection: Collection,
    OrderedCollection: OrderedCollection
  });

}).call(this);

},{"../model/model":75,"../util/util":84,"./catted-list":55,"./filtered-list":57,"./mapped-list":61,"./partitioned-list":62,"./uniq-list":65}],65:[function(require,module,exports){
(function() {
  var DerivedList, UniqList, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  util = require('../util/util');

  UniqList = (function(_super) {
    __extends(UniqList, _super);

    function UniqList(parent, options) {
      var elem, _i, _len, _ref,
        _this = this;

      this.parent = parent;
      this.options = options != null ? options : {};
      UniqList.__super__.constructor.call(this);
      this.counts = [];
      _ref = parent.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        this._tryAdd(elem);
      }
      parent.on('added', function(elem) {
        return _this._tryAdd(elem);
      });
      parent.on('removed', function(elem) {
        return _this._tryRemove(elem);
      });
    }

    UniqList.prototype._tryAdd = function(elem) {
      var idx;

      idx = this.list.indexOf(elem);
      if (idx >= 0) {
        return this.counts[idx] += 1;
      } else {
        this.counts[this.counts.length] = 1;
        return this._add(elem);
      }
    };

    UniqList.prototype._tryRemove = function(elem) {
      var idx;

      idx = this.list.indexOf(elem);
      if (idx >= 0) {
        this.counts[idx] -= 1;
        if (this.counts[idx] === 0) {
          this.counts.splice(idx, 1);
          return this._removeAt(idx);
        }
      }
    };

    return UniqList;

  })(DerivedList);

  util.extend(module.exports, {
    UniqList: UniqList
  });

}).call(this);

},{"../util/util":84,"./list":60}],66:[function(require,module,exports){
(function() {
  var List, Model, Varying, Window, attribute, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Model = require('../model/model').Model;

  attribute = require('../model/attribute');

  List = require('./list').List;

  Varying = require('../core/varying').Varying;

  Window = (function(_super) {
    var _ref1;

    __extends(Window, _super);

    function Window() {
      _ref = Window.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Window.attribute('page', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref1 = _Class.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      _Class.prototype.values = function() {
        return this.model.watch('pageCount').map(function(count) {
          var _i, _results;

          return new List((function() {
            _results = [];
            for (var _i = 1; 1 <= count ? _i <= count : _i >= count; 1 <= count ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this));
        });
      };

      _Class.prototype["default"] = function() {
        return 1;
      };

      return _Class;

    })(attribute.EnumAttribute));

    Window.bind('pageCount').fromVarying(function() {
      return this.watch('parent').map(function(lazyList) {
        return lazyList.length();
      });
    }).and('pageSize').flatMap(function(total, pageSize) {
      return Math.ceil(total / pageSize);
    });

    Window.bind('list').fromVarying(function() {
      var range,
        _this = this;

      range = null;
      return Varying.combine([this.watch('parent'), this.watch('page'), this.watch('pageSize')], function(parent, page, pageSize) {
        if (range != null) {
          range.destroy();
        }
        return range = (parent != null) && (page != null) && (pageSize != null) ? parent.range(page * pageSize, page * pageSize + pageSize) : null;
      });
    });

    return Window;

  })(Model);

  util.extend(module.exports, {
    Window: Window
  });

}).call(this);

},{"../core/varying":69,"../model/attribute":72,"../model/model":75,"../util/util":84,"./list":60}],67:[function(require,module,exports){
(function() {
  var Base, EventEmitter, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('eventemitter2').EventEmitter2;

  util = require('../util/util');

  Base = (function(_super) {
    __extends(Base, _super);

    function Base() {
      Base.__super__.constructor.call(this, {
        delimiter: ':',
        maxListeners: 0
      });
      this.setMaxListeners(0);
      this._outwardListeners = [];
      this._id = util.uniqueId();
      null;
    }

    Base.prototype.listenTo = function(target, event, handler) {
      this._outwardListeners.push(arguments);
      if (target != null) {
        if (typeof target.on === "function") {
          target.on(event, handler);
        }
      }
      return this;
    };

    Base.prototype.unlistenTo = function(tgt) {
      var event, handler, target, _i, _len, _ref, _ref1;

      _ref = this._outwardListeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], target = _ref1[0], event = _ref1[1], handler = _ref1[2];
        if (target === tgt) {
          if (target != null) {
            if (typeof target.off === "function") {
              target.off(event, handler);
            }
          }
        }
      }
      return this;
    };

    Base.prototype.destroy = function() {
      var event, handler, target, _i, _len, _ref, _ref1;

      this.emit('destroying');
      _ref = this._outwardListeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], target = _ref1[0], event = _ref1[1], handler = _ref1[2];
        if (target != null) {
          if (typeof target.off === "function") {
            target.off(event, handler);
          }
        }
      }
      return this.removeAllListeners();
    };

    Base.prototype.destroyWith = function(other) {
      var _this = this;

      return this.listenTo(other, 'destroying', function() {
        return _this.destroy();
      });
    };

    return Base;

  })(EventEmitter);

  util.extend(module.exports, {
    Base: Base
  });

}).call(this);

},{"../util/util":84,"eventemitter2":92}],68:[function(require,module,exports){
(function() {
  var Chainer, util,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Chainer = function() {
    var InnerChain, OuterChain, params;

    params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    InnerChain = (function() {
      var param, _fn, _i, _len,
        _this = this;

      function InnerChain(parent, key, value) {
        this.parent = parent;
        this.key = key;
        this.value = value;
      }

      _fn = function(param) {
        return InnerChain.prototype[param] = function(value) {
          return new InnerChain(this, param, value);
        };
      };
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        _fn(param);
      }

      InnerChain.prototype.all = function(data) {
        if (data == null) {
          data = {};
        }
        if ((this.key != null) && (this.value != null)) {
          data[this.key] = this.value;
        }
        return this.parent.all(data);
      };

      InnerChain.prototype.get = function(key) {
        if (this.key === key) {
          return this.value;
        } else {
          return this.parent.get(key);
        }
      };

      return InnerChain;

    }).call(this);
    return OuterChain = (function(_super) {
      __extends(OuterChain, _super);

      function OuterChain() {}

      OuterChain.prototype.all = function(data) {
        return data;
      };

      OuterChain.prototype.get = null;

      return OuterChain;

    })(InnerChain);
  };

  Chainer.augment = function(proto) {
    return function() {
      var Chain, param, params, _i, _len, _results,
        _this = this;

      params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      Chain = Chainer.apply(null, params);
      _results = [];
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        _results.push((function(param) {
          return proto[param] = function(value) {
            var _ref;

            this._chain = ((_ref = this._chain) != null ? _ref : new Chain())[param](value);
            return this;
          };
        })(param));
      }
      return _results;
    };
  };

  util.extend(module.exports, {
    Chainer: Chainer
  });

}).call(this);

},{"../util/util":84}],69:[function(require,module,exports){
(function() {
  var Base, MultiVarying, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  util = require('../util/util');

  Varying = (function(_super) {
    __extends(Varying, _super);

    function Varying(value) {
      Varying.__super__.constructor.call(this);
      this.setValue(value);
    }

    Varying.prototype.setValue = function(value, force) {
      var _this = this;

      if (this._childVarying != null) {
        this.unlistenTo(this._childVarying);
        this._childVarying = null;
      }
      if (value === this) {
        value = null;
      } else if (value instanceof Varying) {
        this._childVarying = value;
        value = this._childVarying.value;
        this.listenTo(this._childVarying, 'changed', function(newValue) {
          return _this._doSetValue(newValue, true);
        });
      }
      return this._doSetValue(value, force);
    };

    Varying.prototype.map = function(f) {
      var result,
        _this = this;

      result = new Varying(f(this.value));
      result.listenTo(this, 'changed', function(value) {
        return result.setValue(f(value));
      });
      result._parent = this;
      result._mapper = f;
      return result;
    };

    Varying.prototype.react = function(f) {
      return this.on('changed', f);
    };

    Varying.prototype.reactNow = function(f) {
      f(this.value);
      return this.on('changed', f);
    };

    Varying.prototype.trace = function(name) {
      if (name == null) {
        name = this._id;
      }
      this.on('changed', function(value) {
        console.log("Varying " + name + " changed:");
        return console.log(value);
      });
      return this;
    };

    Varying.prototype.debug = function() {
      this.on('changed', function(value) {
        debugger;
      });
      return this;
    };

    Varying.prototype._doSetValue = function(value, force) {
      var oldValue;

      if (force == null) {
        force = false;
      }
      oldValue = this.value;
      if (force === true || value !== oldValue) {
        this.value = value;
        this.emit('changed', value, oldValue);
      }
      return value;
    };

    Varying.combine = function(varyings, transform) {
      return new MultiVarying(varyings, transform);
    };

    Varying.ly = function(val) {
      if (val instanceof Varying) {
        return val;
      } else {
        return new Varying(val);
      }
    };

    Varying.lie = {
      sticky: function(source, delays) {
        var lookup, result, timer;

        result = new Varying(source.value);
        result._parent = source;
        lookup = util.isFunction(delays) ? function(x) {
          return delays(x);
        } : function(x) {
          return delays[x];
        };
        timer = null;
        source.on('changed', function(newValue) {
          var delay;

          if (timer != null) {
            return;
          }
          delay = lookup(result.value);
          if (delay != null) {
            clearTimeout(timer);
            return timer = setTimeout((function() {
              timer = null;
              return result.setValue(source.value);
            }), delay);
          } else {
            return result.setValue(newValue);
          }
        });
        return result;
      }
    };

    return Varying;

  })(Base);

  MultiVarying = (function(_super) {
    __extends(MultiVarying, _super);

    function MultiVarying(varyings, flatMap) {
      var i, varying, _fn, _i, _len, _ref,
        _this = this;

      this.varyings = varyings != null ? varyings : [];
      this.flatMap = flatMap;
      MultiVarying.__super__.constructor.call(this);
      this.values = [];
      _ref = this.varyings;
      _fn = function(varying, i) {
        _this.values[i] = varying.value;
        return varying.on('changed', function(value) {
          _this.values[i] = value;
          return _this.update();
        });
      };
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        varying = _ref[i];
        _fn(varying, i);
      }
      this.update();
    }

    MultiVarying.prototype.update = function() {
      var value;

      value = this.values;
      if (this.flatMap != null) {
        value = this.flatMap.apply(this, value);
      }
      return this.setValue(value);
    };

    return MultiVarying;

  })(Varying);

  util.extend(module.exports, {
    Varying: Varying,
    MultiVarying: MultiVarying
  });

}).call(this);

},{"../core/base":67,"../util/util":84}],70:[function(require,module,exports){
var global=self;(function() {
  var janus, util, _base, _ref;

  util = require('./util/util');

  janus = (_ref = (_base = typeof window !== "undefined" && window !== null ? window : global)._janus$) != null ? _ref : _base._janus$ = {
    util: util,
    Base: require('./core/base').Base,
    Model: require('./model/model').Model,
    reference: require('./model/reference'),
    attribute: require('./model/attribute'),
    Issue: require('./model/issue').Issue,
    store: require('./model/store'),
    collection: require('./collection/collection'),
    View: require('./view/view').View,
    DomView: require('./view/dom-view').DomView,
    Templater: require('./templater/templater').Templater,
    templater: require('./templater/package'),
    Library: require('./library/library').Library,
    varying: require('./core/varying'),
    Chainer: require('./core/chain').Chainer,
    application: {
      App: require('./application/app').App,
      endpoint: require('./application/endpoint'),
      handler: require('./application/handler'),
      manifest: require('./application/manifest'),
      PageModel: require('./model/page-model').PageModel,
      PageView: require('./view/page-view').PageView,
      VaryingView: require('./view/impl/varying').VaryingView,
      ListView: require('./view/impl/list').ListView,
      listEdit: require('./view/impl/list-edit')
    }
  };

  util.extend(module.exports, janus);

  /*
          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                  Version 2, December 2004
  
  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
  
  Everyone is permitted to copy and distribute verbatim or modified
  copies of this license document, and changing it is allowed as long
  as the name is changed.
  
             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
  
   0. You just DO WHAT THE FUCK YOU WANT TO.
  */


}).call(this);

},{"./application/app":51,"./application/endpoint":52,"./application/handler":53,"./application/manifest":54,"./collection/collection":56,"./core/base":67,"./core/chain":68,"./core/varying":69,"./library/library":71,"./model/attribute":72,"./model/issue":74,"./model/model":75,"./model/page-model":76,"./model/reference":77,"./model/store":78,"./templater/package":80,"./templater/templater":81,"./util/util":84,"./view/dom-view":85,"./view/impl/list":87,"./view/impl/list-edit":86,"./view/impl/varying":88,"./view/page-view":90,"./view/view":91}],71:[function(require,module,exports){
(function() {
  var Base, Library, match, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Library = (function(_super) {
    __extends(Library, _super);

    Library.prototype._defaultContext = 'default';

    function Library(options) {
      var _base, _ref;

      this.options = options != null ? options : {};
      Library.__super__.constructor.call(this);
      this.bookcase = {};
      if ((_ref = (_base = this.options).handler) == null) {
        _base.handler = function(obj, book, options) {
          return new book(obj, util.extendNew(options.constructorOpts, {
            libraryContext: options.context
          }));
        };
      }
    }

    Library.prototype.register = function(klass, book, options) {
      var bookId, classShelf, contextShelf, _base, _name, _ref, _ref1, _ref2;

      if (options == null) {
        options = {};
      }
      bookId = Library._classId(klass);
      classShelf = (_ref = (_base = this.bookcase)[bookId]) != null ? _ref : _base[bookId] = {};
      contextShelf = (_ref1 = classShelf[_name = (_ref2 = options.context) != null ? _ref2 : 'default']) != null ? _ref1 : classShelf[_name] = [];
      contextShelf.push({
        book: book,
        options: options
      });
      if (options.priority != null) {
        contextShelf.sort(function(a, b) {
          var _ref3, _ref4;

          return ((_ref3 = b.options.priority) != null ? _ref3 : 0) - ((_ref4 = a.options.priority) != null ? _ref4 : 0);
        });
      }
      return book;
    };

    Library.prototype.get = function(obj, options) {
      var book, result, _ref, _ref1, _ref2;

      if (options == null) {
        options = {};
      }
      if (obj == null) {
        return null;
      }
      if (options.debug === true) {
        debugger;
      }
      book = (_ref = this._get(obj, obj.constructor, (_ref1 = options.context) != null ? _ref1 : this._defaultContext, options)) != null ? _ref : this._get(obj, obj.constructor, 'default', options);
      if (book != null) {
        result = ((_ref2 = options.handler) != null ? _ref2 : this.options.handler)(obj, book, options);
        this.emit('got', result, obj, book, options);
      } else {
        this.emit('missed', obj, options);
      }
      return result != null ? result : null;
    };

    Library.prototype._get = function(obj, klass, context, options) {
      var bookId, contextShelf, record, _i, _len, _ref;

      bookId = util.isNumber(obj) ? 'number' : util.isString(obj) ? 'string' : util.isFunction(obj) ? 'function' : obj === true || obj === false ? 'boolean' : Library._classId(klass);
      contextShelf = (_ref = this.bookcase[bookId]) != null ? _ref[context] : void 0;
      if (contextShelf != null) {
        for (_i = 0, _len = contextShelf.length; _i < _len; _i++) {
          record = contextShelf[_i];
          if (match(obj, record, options.attributes)) {
            return record.book;
          }
        }
      }
      if (klass.__super__ != null) {
        return this._get(obj, klass.__super__.constructor, context, options);
      }
    };

    Library.prototype.newEventBindings = function() {
      var newLibrary;

      newLibrary = Object.create(this);
      newLibrary._events = {};
      return newLibrary;
    };

    Library.classKey = "__janus_classId" + (new Date().getTime());

    Library.classMap = {};

    Library._classId = function(klass) {
      var id;

      if (klass === Number) {
        return 'number';
      } else if (klass === String) {
        return 'string';
      } else if (klass === Function) {
        return 'function';
      } else if (klass === Boolean) {
        return 'boolean';
      } else {
        id = klass[this.classKey];
        if ((id != null) && this.classMap[id] === klass) {
          return klass[this.classKey];
        } else {
          id = util.uniqueId();
          this.classMap[id] = klass;
          return klass[this.classKey] = id;
        }
      }
    };

    return Library;

  })(Base);

  match = function(obj, record, attributes) {
    var isMatch, _base;

    if ((typeof (_base = record.options).rejector === "function" ? _base.rejector(obj) : void 0) === true) {
      return false;
    }
    if ((record.options.acceptor != null) && (record.options.acceptor(obj) !== true)) {
      return false;
    }
    isMatch = true;
    if (attributes) {
      util.traverse(attributes, function(subpath, value) {
        if (util.deepGet(record.options.attributes, subpath) !== value) {
          return isMatch = false;
        }
      });
    }
    return isMatch;
  };

  util.extend(module.exports, {
    Library: Library
  });

}).call(this);

},{"../core/base":67,"../util/util":84}],72:[function(require,module,exports){
(function() {
  var Attribute, BooleanAttribute, CollectionAttribute, DateAttribute, EnumAttribute, List, Model, ModelAttribute, NumberAttribute, ObjectAttribute, ShellModel, TextAttribute, Varying, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Model = require('./model').Model;

  Varying = require('../core/varying').Varying;

  List = require('../collection/list').List;

  Attribute = (function(_super) {
    __extends(Attribute, _super);

    function Attribute(model, key) {
      this.model = model;
      this.key = key;
      Attribute.__super__.constructor.call(this);
      if (this.model == null) {
        this.model = new ShellModel(this);
      }
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    Attribute.prototype.setValue = function(value) {
      return this.model.set(this.key, value);
    };

    Attribute.prototype.unsetValue = function() {
      return this.model.unset(this.key);
    };

    Attribute.prototype.getValue = function() {
      var value;

      value = this.model.get(this.key, true);
      if ((value == null) && (this["default"] != null)) {
        value = this["default"]();
        if (this.writeDefault === true) {
          this.setValue(value);
        }
      }
      return value;
    };

    Attribute.prototype.watchValue = function() {
      return this.model.watch(this.key);
    };

    Attribute.prototype["default"] = function() {};

    Attribute.prototype.writeDefault = false;

    Attribute.prototype.transient = false;

    Attribute.deserialize = function(data) {
      return data;
    };

    Attribute.prototype.serialize = function() {
      if (this.transient !== true) {
        return this.getValue();
      }
    };

    return Attribute;

  })(Model);

  TextAttribute = (function(_super) {
    __extends(TextAttribute, _super);

    function TextAttribute() {
      _ref = TextAttribute.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return TextAttribute;

  })(Attribute);

  ObjectAttribute = (function(_super) {
    __extends(ObjectAttribute, _super);

    function ObjectAttribute() {
      _ref1 = ObjectAttribute.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return ObjectAttribute;

  })(Attribute);

  EnumAttribute = (function(_super) {
    __extends(EnumAttribute, _super);

    function EnumAttribute() {
      _ref2 = EnumAttribute.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    EnumAttribute.prototype.values = function() {
      return new List([]);
    };

    EnumAttribute.prototype.nullable = false;

    return EnumAttribute;

  })(Attribute);

  NumberAttribute = (function(_super) {
    __extends(NumberAttribute, _super);

    function NumberAttribute() {
      _ref3 = NumberAttribute.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    return NumberAttribute;

  })(Attribute);

  BooleanAttribute = (function(_super) {
    __extends(BooleanAttribute, _super);

    function BooleanAttribute() {
      _ref4 = BooleanAttribute.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    return BooleanAttribute;

  })(Attribute);

  DateAttribute = (function(_super) {
    __extends(DateAttribute, _super);

    function DateAttribute() {
      _ref5 = DateAttribute.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    DateAttribute.deserialize = function(data) {
      return new Date(data);
    };

    return DateAttribute;

  })(Attribute);

  ModelAttribute = (function(_super) {
    __extends(ModelAttribute, _super);

    function ModelAttribute() {
      _ref6 = ModelAttribute.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    ModelAttribute.modelClass = Model;

    ModelAttribute.deserialize = function(data) {
      return this.modelClass.deserialize(data);
    };

    ModelAttribute.prototype.serialize = function() {
      if (this.transient !== true) {
        return this.constructor.modelClass.serialize(this.getValue());
      }
    };

    return ModelAttribute;

  })(Attribute);

  CollectionAttribute = (function(_super) {
    __extends(CollectionAttribute, _super);

    function CollectionAttribute() {
      _ref7 = CollectionAttribute.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    CollectionAttribute.collectionClass = Array;

    CollectionAttribute.deserialize = function(data) {
      return this.collectionClass.deserialize(data);
    };

    CollectionAttribute.prototype.serialize = function() {
      if (this.transient !== true) {
        return this.constructor.collectionClass.serialize(this.getValue());
      }
    };

    return CollectionAttribute;

  })(Attribute);

  ShellModel = (function() {
    function ShellModel(attribute) {
      this.attribute = attribute;
    }

    ShellModel.prototype.get = function() {
      if (this._value != null) {
        return this._value;
      } else if (this.attribute["default"] != null) {
        return this.attribute["default"]();
      } else {
        return null;
      }
    };

    ShellModel.prototype.set = function(_, value) {
      var _ref8;

      this._value = value;
      return (_ref8 = this._watcher) != null ? _ref8.setValue(value) : void 0;
    };

    ShellModel.prototype.watch = function() {
      var _ref8;

      return (_ref8 = this._watcher) != null ? _ref8 : this._watcher = new Varying(this._value);
    };

    return ShellModel;

  })();

  util.extend(module.exports, {
    Attribute: Attribute,
    TextAttribute: TextAttribute,
    ObjectAttribute: ObjectAttribute,
    EnumAttribute: EnumAttribute,
    NumberAttribute: NumberAttribute,
    BooleanAttribute: BooleanAttribute,
    DateAttribute: DateAttribute,
    ModelAttribute: ModelAttribute,
    CollectionAttribute: CollectionAttribute,
    ShellModel: ShellModel
  });

}).call(this);

},{"../collection/list":60,"../core/varying":69,"../util/util":84,"./model":75}],73:[function(require,module,exports){
(function() {
  var Base, Binder, MultiVarying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  util = require('../util/util');

  Base = require('../core/base');

  MultiVarying = require('../core/varying').MultiVarying;

  Binder = (function(_super) {
    __extends(Binder, _super);

    function Binder(key) {
      this._key = key;
      this._generators = [];
    }

    Binder.prototype.from = function() {
      var path;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._generators.push(function() {
        var next;

        next = function(idx) {
          return function(result) {
            if (path[idx + 1] != null) {
              return result != null ? result.watch(path[idx]).map(next(idx + 1)) : void 0;
            } else {
              return result != null ? result.watch(path[idx]) : void 0;
            }
          };
        };
        return next(0)(this._model);
      });
      return this;
    };

    Binder.prototype.fromVarying = function(f) {
      this._generators.push(function() {
        return f.call(this._model);
      });
      return this;
    };

    Binder.prototype.and = Binder.prototype.from;

    Binder.prototype.andVarying = Binder.prototype.fromVarying;

    Binder.prototype.flatMap = function(f) {
      this._flatMap = f;
      return this;
    };

    Binder.prototype.fallback = function(fallback) {
      this._fallback = fallback;
      return this;
    };

    Binder.prototype.asDefault = function() {
      this._defaultOnly = true;
      return this;
    };

    Binder.prototype.bind = function(model) {
      var bound;

      bound = Object.create(this);
      bound._model = model;
      if (this._defaultOnly === true && (model.get(this._key) != null)) {
        return;
      }
      bound.apply();
      return bound;
    };

    Binder.prototype.apply = function() {
      var data, _ref,
        _this = this;

      if ((_ref = this._varying) != null) {
        _ref.destroy();
      }
      return this._varying = new MultiVarying((function() {
        var _i, _len, _ref1, _results;

        _ref1 = this._generators;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          data = _ref1[_i];
          _results.push(data.call(this));
        }
        return _results;
      }).call(this), function() {
        var result, values;

        values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        result = util.isFunction(_this._flatMap) ? _this._flatMap.apply(_this._model, values) : values.length === 1 ? values[0] : values;
        if (result == null) {
          result = _this._fallback;
        }
        return _this._model.set(_this._key, result);
      });
    };

    return Binder;

  })(Base);

  util.extend(module.exports, {
    Binder: Binder
  });

}).call(this);

},{"../core/base":67,"../core/varying":69,"../util/util":84}],74:[function(require,module,exports){
(function() {
  var Base, Issue, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  Issue = (function(_super) {
    __extends(Issue, _super);

    function Issue(_arg) {
      var active, message, severity, target, _ref;

      _ref = _arg != null ? _arg : {}, active = _ref.active, severity = _ref.severity, message = _ref.message, target = _ref.target;
      this.active = Varying.ly(active != null ? active : false);
      this.severity = Varying.ly(severity != null ? severity : 0);
      this.message = Varying.ly(message != null ? message : '');
      this.target = Varying.ly(target);
    }

    return Issue;

  })(Base);

  util.extend(module.exports, {
    Issue: Issue
  });

}).call(this);

},{"../core/base":67,"../core/varying":69,"../util/util":84}],75:[function(require,module,exports){
(function() {
  var Base, Binder, Model, Null, NullClass, Reference, Resolver, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Base = require('../core/base').Base;

  Varying = require('../core/varying').Varying;

  _ref = require('./reference'), Reference = _ref.Reference, Resolver = _ref.Resolver;

  util = require('../util/util');

  Binder = require('./binder').Binder;

  NullClass = (function() {
    function NullClass() {}

    return NullClass;

  })();

  Null = new NullClass();

  Model = (function(_super) {
    __extends(Model, _super);

    function Model(attributes, options) {
      if (attributes == null) {
        attributes = {};
      }
      this.options = options != null ? options : {};
      Model.__super__.constructor.call(this);
      this.attributes = {};
      this._attributes = {};
      this._watches = {};
      this._parent = this.options.parent;
      if (typeof this._preinitialize === "function") {
        this._preinitialize();
      }
      this.set(attributes);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
      this._bind();
    }

    Model.prototype.get = function(key, bypassAttribute) {
      var attribute, mappedValue, value, _ref1;

      if (bypassAttribute == null) {
        bypassAttribute = false;
      }
      value = util.deepGet(this.attributes, key);
      if (value == null) {
        value = (_ref1 = this._parent) != null ? _ref1.get(key) : void 0;
        if (value instanceof Model) {
          value = this.set(key, value.shadow());
        } else if (value instanceof Reference) {
          mappedValue = value.map(function(inner) {
            if (inner instanceof Model) {
              return inner.shadow();
            } else {
              return inner;
            }
          });
          value = this.set(key, mappedValue);
        }
      }
      if ((value == null) && bypassAttribute === false) {
        attribute = this.attribute(key);
        value = attribute != null ? attribute.writeDefault === true ? this.set(key, attribute["default"]()) : attribute["default"]() : void 0;
      }
      if (value == null) {
        value = null;
      }
      if (value === Null) {
        return null;
      } else {
        return value;
      }
    };

    Model.prototype.set = function() {
      var args, key, oldValue, value,
        _this = this;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length === 1 && util.isPlainObject(args[0])) {
        return util.traverse(args[0], function(path, value) {
          return _this.set(path, value);
        });
      } else if (args.length === 2) {
        key = args[0], value = args[1];
        oldValue = util.deepGet(this.attributes, key);
        if (oldValue === value) {
          return value;
        }
        util.deepSet(this.attributes, key)(value === Null ? null : value);
        this._emitChange(key, value, oldValue);
        return value;
      }
    };

    Model.prototype.unset = function(key) {
      var oldValue;

      if (this._parent != null) {
        oldValue = this.get(key);
        util.deepSet(this.attributes, key)(Null);
        if (oldValue !== null) {
          this._emitChange(key, null, oldValue);
        }
      } else {
        this._deleteAttr(key);
      }
      return oldValue;
    };

    Model.prototype.setAll = function(attrs) {
      var _this = this;

      util.traverseAll(this.attributes, function(path, value) {
        if (util.deepGet(attrs, path) == null) {
          return _this.unset(path.join('.'));
        }
      });
      this.set(attrs);
      return null;
    };

    Model.prototype.watch = function(key) {
      var _base, _ref1,
        _this = this;

      return (_ref1 = (_base = this._watches)[key]) != null ? _ref1 : _base[key] = (function() {
        var varying;

        varying = new Varying(_this.get(key));
        if (_this._parent != null) {
          varying.listenTo(_this._parent, "changed:" + key, function() {
            return varying.setValue(_this.get(key));
          });
        }
        return varying.listenTo(_this, "changed:" + key, function(newValue) {
          return varying.setValue(newValue);
        });
      })();
    };

    Model.prototype.watchAll = function() {
      var varying,
        _this = this;

      varying = new Varying(this);
      return varying.listenTo(this, 'anyChanged', function() {
        return varying.setValue(_this, true);
      });
    };

    Model.attributes = function() {
      if (this._attributesAgainst !== this) {
        this._attributesAgainst = this;
        this._attributes = {};
      }
      return this._attributes;
    };

    Model.allAttributes = function() {
      var attrs, recurse,
        _this = this;

      attrs = {};
      recurse = function(obj) {
        var attr, key, _ref1;

        if (obj.attributes == null) {
          return;
        }
        if (obj.__super__ != null) {
          recurse(obj.__super__.constructor);
        }
        _ref1 = obj.attributes();
        for (key in _ref1) {
          attr = _ref1[key];
          attrs[key] = attr;
        }
        return null;
      };
      recurse(this);
      return attrs;
    };

    Model.attribute = function(key, attribute) {
      return this.attributes()[key] = attribute;
    };

    Model.prototype.attribute = function(key) {
      var recurse, _base, _ref1,
        _this = this;

      recurse = function(obj) {
        var result, _base;

        if (obj.attributes == null) {
          return;
        }
        result = typeof (_base = (obj.attributes()[key])) === "function" ? new _base(_this, key) : void 0;
        if (result != null) {
          return result;
        } else if (obj.__super__ != null) {
          return recurse(obj.__super__.constructor);
        }
      };
      if (util.isArray(key)) {
        key = key.join('.');
      }
      return (_ref1 = (_base = this._attributes)[key]) != null ? _ref1 : _base[key] = recurse(this.constructor);
    };

    Model.prototype.attributeClass = function(key) {
      return this.constructor.attributes()[key];
    };

    Model.prototype.allAttributes = function() {
      var key, _results;

      _results = [];
      for (key in this.constructor.allAttributes()) {
        _results.push(this.attribute(key));
      }
      return _results;
    };

    Model.binders = function() {
      if (this._bindersAgainst !== this) {
        this._bindersAgainst = this;
        this._binders = [];
      }
      return this._binders;
    };

    Model.bind = function(key) {
      var binder;

      binder = new Binder(key);
      this.binders().push(binder);
      return binder;
    };

    Model.prototype._bind = function() {
      var recurse,
        _this = this;

      this._binders = {};
      recurse = function(obj) {
        var binder, _i, _len, _ref1;

        _ref1 = obj.binders();
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binder = _ref1[_i];
          if (_this._binders[binder._key] == null) {
            _this._binders[binder._key] = binder.bind(_this);
          }
        }
        if ((obj.__super__ != null) && (obj.__super__.constructor.binders != null)) {
          recurse(obj.__super__.constructor);
        }
        return null;
      };
      recurse(this.constructor);
      return null;
    };

    Model.prototype.rebind = function(key) {
      var _ref1;

      return (_ref1 = this._binders[key]) != null ? _ref1.apply() : void 0;
    };

    Model.prototype.revert = function(key) {
      if (this._parent == null) {
        return;
      }
      return this._deleteAttr(key);
    };

    Model.prototype.shadow = function() {
      return new this.constructor({}, util.extendNew(this.options, {
        parent: this
      }));
    };

    Model.prototype.modified = function(deep) {
      var result,
        _this = this;

      if (deep == null) {
        deep = true;
      }
      if (this._parent == null) {
        return false;
      }
      result = false;
      util.traverse(this.attributes, function(path) {
        if (_this.attrModified(path, deep)) {
          return result = true;
        }
      });
      return result;
    };

    Model.prototype.attrModified = function(path, deep) {
      var attribute, isDeep, parentValue, transient, value, _ref1, _ref2;

      if (this._parent == null) {
        return false;
      }
      value = util.deepGet(this.attributes, path);
      if (value == null) {
        return false;
      }
      if (value === Null) {
        value = null;
      }
      if (value instanceof Reference) {
        value = (_ref1 = value.value) != null ? _ref1 : value.flatValue;
      }
      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this, path, value) : deep === true;
      attribute = this.attribute(path);
      transient = (attribute != null) && attribute.transient === true;
      if (!transient) {
        parentValue = this._parent.get(path);
        if (parentValue instanceof Reference) {
          parentValue = (_ref2 = parentValue.value) != null ? _ref2 : parentValue.flatValue;
        }
        if (value instanceof Model) {
          if (isDeep === true) {
            return value.modified(deep);
          } else {
            return !(__indexOf.call(value.originals(), parentValue) >= 0);
          }
        } else {
          return parentValue !== value && !((parentValue == null) && (value == null));
        }
      } else {
        return false;
      }
    };

    Model.prototype.watchModified = function(deep) {
      var isDeep, _ref1, _ref2,
        _this = this;

      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this) : deep === true;
      if (isDeep === true) {
        return (_ref1 = this._watchModifiedDeep$) != null ? _ref1 : this._watchModifiedDeep$ = (function() {
          var model, result, uniqSubmodels, watchModel, _i, _len, _ref2;

          if (_this._watchModifiedDeep$init === true) {
            return;
          }
          _this._watchModifiedDeep$init = true;
          result = new Varying(_this.modified(deep));
          _this.on('anyChanged', function(path) {
            if (_this.attrModified(path, deep)) {
              return result.setValue(true);
            } else {
              return result.setValue(_this.modified(deep));
            }
          });
          watchModel = function(model) {
            return result.listenTo(model.watchModified(deep), 'changed', function(isChanged) {
              if (isChanged === true) {
                return result.setValue(true);
              } else {
                return result.setValue(_this.modified(deep));
              }
            });
          };
          uniqSubmodels = _this._submodels().uniq();
          _ref2 = uniqSubmodels.list;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            model = _ref2[_i];
            watchModel(model);
          }
          uniqSubmodels.on('added', function(newModel) {
            return watchModel(newModel);
          });
          uniqSubmodels.on('removed', function(oldModel) {
            return result.unlistenTo(oldModel.watchModified(deep));
          });
          return result;
        })();
      } else {
        return (_ref2 = this._watchModified$) != null ? _ref2 : this._watchModified$ = (function() {
          var result;

          result = new Varying(_this.modified(deep));
          _this.on('anyChanged', function(path) {
            if (_this.attrModified(path, deep)) {
              return result.setValue(true);
            } else {
              return result.setValue(_this.modified(deep));
            }
          });
          return result;
        })();
      }
    };

    Model.prototype.original = function() {
      var _ref1, _ref2;

      return (_ref1 = (_ref2 = this._parent) != null ? _ref2.original() : void 0) != null ? _ref1 : this;
    };

    Model.prototype.originals = function() {
      var cur, _results;

      cur = this;
      _results = [];
      while (cur._parent != null) {
        _results.push(cur = cur._parent);
      }
      return _results;
    };

    Model.prototype.merge = function() {
      var _ref1;

      if ((_ref1 = this._parent) != null) {
        _ref1.set(this.attributes);
      }
      return null;
    };

    Model.prototype.issues = function() {
      var _ref1,
        _this = this;

      return (_ref1 = this.issues$) != null ? _ref1 : this.issues$ = (function() {
        var attr, issueList;

        issueList = (function() {
          var _i, _len, _ref2, _results;

          _ref2 = this.allAttributes();
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            attr = _ref2[_i];
            if (attr.issues != null) {
              _results.push(attr.issues());
            }
          }
          return _results;
        }).call(_this);
        if (_this._issues != null) {
          issueList.unshift(_this._issues());
        }
        return (new (require('../collection/collection').CattedList)(issueList)).filter(function(issue) {
          return issue.active;
        });
      })();
    };

    Model.prototype.valid = function(severity) {
      if (severity == null) {
        severity = 0;
      }
      return this.issues().filter(function(issue) {
        return issue.severity.map(function(issueSev) {
          return issueSev <= severity;
        });
      }).watchLength().map(function(length) {
        return length === 0;
      });
    };

    Model.deserialize = function(data) {
      var attribute, key, prop, _ref1;

      _ref1 = this.allAttributes();
      for (key in _ref1) {
        attribute = _ref1[key];
        prop = util.deepGet(data, key);
        if (prop != null) {
          util.deepSet(data, key)(attribute.deserialize(prop));
        }
      }
      return new this(data);
    };

    Model.serialize = function(model, opts) {
      var result, walkAttrs,
        _this = this;

      if (opts == null) {
        opts = {};
      }
      walkAttrs = function(keys, src, target) {
        var attribute, innerResult, result, strKey, subKey, thisKey, value, _ref1;

        for (subKey in src) {
          value = src[subKey];
          thisKey = keys.concat([subKey]);
          strKey = thisKey.join('.');
          attribute = model.attribute(strKey);
          result = value === Null ? void 0 : (attribute != null) && (attribute.serialize != null) ? attribute.serialize(opts) : util.isPlainObject(value) ? (innerResult = (_ref1 = target[subKey]) != null ? _ref1 : {}, walkAttrs(thisKey, value, innerResult), innerResult) : value;
          if (result instanceof Reference) {
            result = result.flatValue;
          }
          target[subKey] = result;
        }
        return target;
      };
      result = model._parent != null ? Model.serialize(model._parent, opts) : {};
      walkAttrs([], model.attributes, result);
      return result;
    };

    Model.prototype.serialize = function() {
      return this.constructor.serialize(this);
    };

    Model.prototype._deleteAttr = function(key) {
      var _this = this;

      return util.deepSet(this.attributes, key)(function(obj, subkey) {
        var newValue, oldValue;

        if (obj == null) {
          return;
        }
        oldValue = obj[subkey];
        delete obj[subkey];
        newValue = _this.get(key);
        if (newValue !== oldValue) {
          _this._emitChange(key, newValue, oldValue);
        }
        return oldValue;
      });
    };

    Model.prototype._emitChange = function(key, newValue, oldValue) {
      var emit, parts,
        _this = this;

      parts = util.isArray(key) ? key : key.split('.');
      if (oldValue instanceof Model) {
        this._submodels().remove(oldValue);
      }
      if (newValue instanceof Model) {
        this._submodels().add(newValue);
      }
      emit = function(name, partKey) {
        return _this.emit("" + name + ":" + partKey, newValue, oldValue, partKey);
      };
      emit('changed', parts.join('.'));
      while (parts.length > 1) {
        parts.pop();
        emit('subKeyChanged', parts.join('.'));
      }
      this.emit('anyChanged', key, newValue, oldValue);
      return null;
    };

    Model.prototype._submodels = function() {
      var _ref1;

      return (_ref1 = this._submodels$) != null ? _ref1 : this._submodels$ = new (require('../collection/list').List)();
    };

    return Model;

  })(Base);

  util.extend(module.exports, {
    Model: Model
  });

}).call(this);

},{"../collection/collection":56,"../collection/list":60,"../core/base":67,"../core/varying":69,"../util/util":84,"./binder":73,"./reference":77}],76:[function(require,module,exports){
(function() {
  var Model, PageModel, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Model = require('./model').Model;

  PageModel = (function(_super) {
    __extends(PageModel, _super);

    function PageModel() {
      _ref = PageModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PageModel.prototype.resolve = function() {
      return this._render();
    };

    PageModel.prototype._render = function() {};

    return PageModel;

  })(Model);

  util.extend(module.exports, {
    PageModel: PageModel
  });

}).call(this);

},{"../util/util":84,"./model":75}],77:[function(require,module,exports){
(function() {
  var ModelReference, ModelResolver, Reference, RequestReference, RequestResolver, Resolver, Varying, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  Resolver = (function() {
    function Resolver(parent, value, options) {
      this.parent = parent;
      this.value = value;
      this.options = options != null ? options : {};
    }

    Resolver.prototype.resolve = function() {
      return this.parent.setValue(this.value);
    };

    Resolver.prototype.get = function() {};

    Resolver.prototype.watch = function(key) {
      return this.parent.watch(key);
    };

    Resolver.prototype.watchAll = function() {
      return this.parent.watchAll();
    };

    return Resolver;

  })();

  Reference = (function(_super) {
    __extends(Reference, _super);

    Reference.resolverClass = Resolver;

    function Reference(inner, flatValue, options) {
      this.inner = inner;
      this.flatValue = flatValue;
      this.options = options != null ? options : {};
      Reference.__super__.constructor.call(this, this._resolver());
    }

    Reference.prototype._resolver = function() {
      return new this.constructor.resolverClass(this, this.inner, this.options);
    };

    Reference.prototype.map = function(f) {
      var result;

      result = new this.constructor(this.inner, this.flatValue, this.options);
      this.reactNow(function(val) {
        return result.setValue(f(val));
      });
      result._parent = this;
      result._mapper = f;
      return result;
    };

    Reference.prototype.get = function() {};

    Reference.prototype.watch = function(key) {
      return this.map(function(val) {
        if (val instanceof require('./model').Model) {
          return val.watch(key);
        } else if (val instanceof Resolver) {
          return null;
        } else {
          return val;
        }
      });
    };

    Reference.prototype.watchAll = function() {
      return this.map(function(val) {
        if (val instanceof require('./model').Model) {
          return val.watchAll();
        } else {
          return null;
        }
      });
    };

    return Reference;

  })(Varying);

  RequestResolver = (function(_super) {
    __extends(RequestResolver, _super);

    function RequestResolver(parent, request, options) {
      var _base, _ref;

      this.parent = parent;
      this.request = request;
      this.options = options != null ? options : {};
      if ((_ref = (_base = this.options).map) == null) {
        _base.map = function(request) {
          return request.map(function(result) {
            return result.successOrElse(null);
          });
        };
      }
    }

    RequestResolver.prototype.resolve = function(app) {
      var store;

      store = app.getStore(this.request);
      if (store != null) {
        store.handle();
        return this.parent.setValue(this.options.map(this.request));
      } else {
        return this.parent.setValue(null);
      }
    };

    return RequestResolver;

  })(Resolver);

  RequestReference = (function(_super) {
    __extends(RequestReference, _super);

    function RequestReference() {
      _ref = RequestReference.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RequestReference.resolverClass = RequestResolver;

    return RequestReference;

  })(Reference);

  ModelResolver = (function(_super) {
    __extends(ModelResolver, _super);

    function ModelResolver(parent, map, options) {
      this.parent = parent;
      this.map = map;
      this.options = options != null ? options : {};
    }

    ModelResolver.prototype.resolve = function(model) {
      return this.parent.setValue(this.map(model));
    };

    return ModelResolver;

  })(Resolver);

  ModelReference = (function(_super) {
    __extends(ModelReference, _super);

    function ModelReference() {
      _ref1 = ModelReference.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ModelReference.resolverClass = ModelResolver;

    return ModelReference;

  })(Reference);

  util.extend(module.exports, {
    Reference: Reference,
    RequestReference: RequestReference,
    ModelReference: ModelReference,
    Resolver: Resolver,
    RequestResolver: RequestResolver,
    ModelResolver: ModelResolver
  });

}).call(this);

},{"../core/varying":69,"../util/util":84,"./model":75}],78:[function(require,module,exports){
(function() {
  var Base, CompleteState, CreateRequest, DeleteRequest, ErrorState, FetchRequest, InitState, List, MemoryCacheStore, Model, OnPageCacheStore, OneOfStore, PendingState, ProgressState, Request, RequestState, ServiceErrorState, Store, SuccessState, UpdateRequest, UserErrorState, Varying, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Model = require('../model/model').Model;

  List = require('../collection/list').List;

  Varying = require('../core/varying').Varying;

  RequestState = (function() {
    function RequestState() {}

    RequestState.prototype.flatSuccess = function() {
      return this;
    };

    RequestState.prototype.successOrElse = function(x) {
      if (util.isFunction(x)) {
        return x(this);
      } else {
        return x;
      }
    };

    return RequestState;

  })();

  InitState = (function(_super) {
    __extends(InitState, _super);

    function InitState() {
      _ref = InitState.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return InitState;

  })(RequestState);

  PendingState = (function(_super) {
    __extends(PendingState, _super);

    function PendingState() {
      _ref1 = PendingState.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return PendingState;

  })(RequestState);

  ProgressState = (function(_super) {
    __extends(ProgressState, _super);

    function ProgressState(progress) {
      this.progress = progress;
    }

    ProgressState.prototype.map = function(f) {
      return new ProgressState(f(this.progress));
    };

    return ProgressState;

  })(PendingState);

  CompleteState = (function(_super) {
    __extends(CompleteState, _super);

    function CompleteState(result) {
      this.result = result;
    }

    CompleteState.prototype.map = function(f) {
      return new CompleteState(f(this.error));
    };

    return CompleteState;

  })(RequestState);

  SuccessState = (function(_super) {
    __extends(SuccessState, _super);

    function SuccessState(result) {
      this.result = result;
    }

    SuccessState.prototype.map = function(f) {
      return new SuccessState(f(this.result));
    };

    SuccessState.prototype.flatSuccess = function() {
      return this.result;
    };

    SuccessState.prototype.successOrElse = function() {
      return this.result;
    };

    return SuccessState;

  })(CompleteState);

  ErrorState = (function(_super) {
    __extends(ErrorState, _super);

    function ErrorState(error) {
      this.error = error;
    }

    ErrorState.prototype.map = function(f) {
      return new ErrorState(f(this.error));
    };

    return ErrorState;

  })(CompleteState);

  UserErrorState = (function(_super) {
    __extends(UserErrorState, _super);

    function UserErrorState() {
      _ref2 = UserErrorState.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    return UserErrorState;

  })(ErrorState);

  ServiceErrorState = (function(_super) {
    __extends(ServiceErrorState, _super);

    function ServiceErrorState() {
      _ref3 = ServiceErrorState.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    return ServiceErrorState;

  })(ErrorState);

  Request = (function(_super) {
    __extends(Request, _super);

    function Request(options) {
      this.options = options != null ? options : {};
      Request.__super__.constructor.call(this);
      this.value = Request.state.Init;
    }

    Request.prototype.signature = function() {};

    Request.prototype.setValue = function(response) {
      return Request.__super__.setValue.call(this, this.deserialize(response));
    };

    Request.prototype.deserialize = function(response) {
      var _this = this;

      if (response instanceof Request.state.type.Success) {
        return response.map(function(data) {
          return _this.constructor.modelClass.deserialize(data);
        });
      } else {
        return response;
      }
    };

    Request.modelClass = Model;

    Request.state = {
      Init: new InitState(),
      Pending: new PendingState(),
      Progress: function(progress) {
        return new ProgressState(progress);
      },
      Complete: function(result) {
        return new CompleteState(result);
      },
      Success: function(result) {
        return new SuccessState(result);
      },
      Error: function(error) {
        return new ErrorState(error);
      },
      UserError: function(error) {
        return new UserErrorState(error);
      },
      ServiceError: function(error) {
        return new ServiceErrorState(error);
      },
      type: {
        Init: InitState,
        Pending: PendingState,
        Progress: ProgressState,
        Complete: CompleteState,
        Success: SuccessState,
        Error: ErrorState,
        UserError: UserErrorState,
        ServiceError: ServiceErrorState
      }
    };

    return Request;

  })(Varying);

  Store = (function(_super) {
    __extends(Store, _super);

    function Store(request, options) {
      this.request = request;
      this.options = options != null ? options : {};
      Store.__super__.constructor.call(this);
    }

    Store.prototype.handle = function() {
      var handled;

      handled = this._handle();
      if (handled === Store.Handled) {
        this.emit('requesting', this.request);
        this.request.emit('requesting', this);
      }
      return handled;
    };

    Store.Handled = {};

    Store.Unhandled = {};

    return Store;

  })(Base);

  FetchRequest = (function(_super) {
    __extends(FetchRequest, _super);

    function FetchRequest() {
      _ref4 = FetchRequest.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    return FetchRequest;

  })(Request);

  CreateRequest = (function(_super) {
    __extends(CreateRequest, _super);

    function CreateRequest() {
      _ref5 = CreateRequest.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    return CreateRequest;

  })(Request);

  UpdateRequest = (function(_super) {
    __extends(UpdateRequest, _super);

    function UpdateRequest() {
      _ref6 = UpdateRequest.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    return UpdateRequest;

  })(Request);

  DeleteRequest = (function(_super) {
    __extends(DeleteRequest, _super);

    function DeleteRequest() {
      _ref7 = DeleteRequest.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    return DeleteRequest;

  })(Request);

  OneOfStore = (function(_super) {
    __extends(OneOfStore, _super);

    function OneOfStore(request, maybeStores, options) {
      this.request = request;
      this.maybeStores = maybeStores != null ? maybeStores : [];
      this.options = options != null ? options : {};
      OneOfStore.__super__.constructor.call(this, this.request, this.options);
    }

    OneOfStore.prototype._handle = function() {
      var handled, maybeStore, _i, _len, _ref8;

      handled = Store.Unhandled;
      _ref8 = this.maybeStores;
      for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
        maybeStore = _ref8[_i];
        if (handled !== Store.Handled) {
          handled = maybeStore.handle(this.request);
        }
      }
      if (handled === Store.Unhandled) {
        request.setValue(Request.state.Error("No handler was available!"));
      }
      return handled;
    };

    return OneOfStore;

  })(Store);

  MemoryCacheStore = (function(_super) {
    __extends(MemoryCacheStore, _super);

    function MemoryCacheStore() {
      MemoryCacheStore.__super__.constructor.call(this);
    }

    MemoryCacheStore.prototype._cache = function() {
      var _ref8;

      return (_ref8 = this._cache$) != null ? _ref8 : this._cache$ = {};
    };

    MemoryCacheStore.prototype._invalidates = function() {
      var _ref8;

      return (_ref8 = this._invalidates$) != null ? _ref8 : this._invalidates$ = new List();
    };

    MemoryCacheStore.prototype.handle = function(request) {
      var after, cached, hit, signature, _i, _len, _ref8,
        _this = this;

      signature = request.signature();
      if ((request instanceof CreateRequest) || (request instanceof UpdateRequest) || (request instanceof DeleteRequest)) {
        _ref8 = this._invalidates().list.slice();
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          cached = _ref8[_i];
          if (!(cached.invalidate(request))) {
            continue;
          }
          delete this._cache()[cached.signature()];
          this._invalidates().remove(cached);
        }
      }
      if (signature != null) {
        if (request instanceof FetchRequest) {
          hit = this._cache()[signature];
          if (hit != null) {
            if (hit !== request) {
              setTimeout((function() {
                return request.setValue(hit);
              }), 0);
            }
            return Store.Handled;
          } else {
            this._cache()[signature] = request;
            if (request.expires != null) {
              after = util.isFunction(request.expires) ? request.expires() : request.expires;
              if (util.isNumber(after)) {
                setTimeout((function() {
                  return delete _this._cache()[signature];
                }), after * 1000);
              }
            }
            if (request.invalidate != null) {
              this._invalidates().add(request);
            }
            return Store.Unhandled;
          }
        } else if ((request instanceof CreateRequest) || (request instanceof UpdateRequest) || (request instanceof DeleteRequest)) {
          delete this._cache()[signature];
          if (request.cacheResult !== false && !(request instanceof DeleteRequest)) {
            request.on('changed', function(state) {
              if (state instanceof Request.state.type.Success) {
                return _this._cache()[signature] = state;
              }
            });
          }
          return Store.Unhandled;
        } else {
          delete this._cache()[signature];
          return Store.Unhandled;
        }
      } else {
        return Store.Unhandled;
      }
    };

    return MemoryCacheStore;

  })(Store);

  OnPageCacheStore = (function(_super) {
    __extends(OnPageCacheStore, _super);

    function OnPageCacheStore() {
      OnPageCacheStore.__super__.constructor.call(this);
    }

    OnPageCacheStore.prototype._dom = function() {};

    OnPageCacheStore.prototype.handle = function(request) {
      var cacheDom, signature;

      signature = request.signature();
      if (signature != null) {
        cacheDom = this._dom().find("> #" + signature);
        if (cacheDom.length > 0) {
          if (request instanceof FetchRequest) {
            request.setValue(Request.state.Success(cacheDom.text()));
            return Store.Handled;
          } else {
            cacheDom.remove();
            return Store.Unhandled;
          }
        } else {
          return Store.Unhandled;
        }
      } else {
        return Store.Unhandled;
      }
    };

    return OnPageCacheStore;

  })(Store);

  util.extend(module.exports, {
    Request: Request,
    Store: Store,
    OneOfStore: OneOfStore,
    MemoryCacheStore: MemoryCacheStore,
    OnPageCacheStore: OnPageCacheStore,
    request: {
      FetchRequest: FetchRequest,
      CreateRequest: CreateRequest,
      UpdateRequest: UpdateRequest,
      DeleteRequest: DeleteRequest
    }
  });

}).call(this);

},{"../collection/list":60,"../core/base":67,"../core/varying":69,"../model/model":75,"../util/util":84}],79:[function(require,module,exports){
(function() {
  var ApplyMutator, AttrMutator, Base, Binder, ClassGroupMutator, ClassMutator, CssMutator, HtmlMutator, MultiVarying, Mutator, RenderMutator, TextMutator, Varying, reference, types, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  util = require('../util/util');

  Base = require('../core/base').Base;

  _ref = require('../core/varying'), Varying = _ref.Varying, MultiVarying = _ref.MultiVarying;

  types = require('./types');

  reference = require('../model/reference');

  Binder = (function(_super) {
    __extends(Binder, _super);

    function Binder(dom, options) {
      this.dom = dom;
      this.options = options != null ? options : {};
      Binder.__super__.constructor.call(this);
      this._children = {};
      this._mutatorIndex = {};
      this._mutators = [];
    }

    Binder.prototype.find = function(selector) {
      var _base, _ref1;

      return (_ref1 = (_base = this._children)[selector]) != null ? _ref1 : _base[selector] = new Binder(this.dom.find(selector), util.extendNew(this.options, {
        parent: this
      }));
    };

    Binder.prototype.classed = function(className) {
      return this._attachMutator(ClassMutator, [className]);
    };

    Binder.prototype.classGroup = function(classPrefix) {
      return this._attachMutator(ClassGroupMutator, [classPrefix]);
    };

    Binder.prototype.attr = function(attrName) {
      return this._attachMutator(AttrMutator, [attrName]);
    };

    Binder.prototype.css = function(cssAttr) {
      return this._attachMutator(CssMutator, [cssAttr]);
    };

    Binder.prototype.text = function() {
      return this._attachMutator(TextMutator);
    };

    Binder.prototype.html = function() {
      return this._attachMutator(HtmlMutator);
    };

    Binder.prototype.render = function(app, options) {
      return this._attachMutator(RenderMutator, [app, options]);
    };

    Binder.prototype.apply = function(f) {
      return this._attachMutator(ApplyMutator, [f]);
    };

    Binder.prototype.from = function() {
      var path, _ref1;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref1 = this.text()).from.apply(_ref1, path);
    };

    Binder.prototype.fromVarying = function(func) {
      return this.text().fromVarying(func);
    };

    Binder.prototype.end = function() {
      return this.options.parent;
    };

    Binder.prototype.data = function(primary, aux, shouldRender) {
      var child, mutator, _, _i, _len, _ref1, _ref2;

      _ref1 = this._children;
      for (_ in _ref1) {
        child = _ref1[_];
        child.data(primary, aux, shouldRender);
      }
      _ref2 = this._mutators;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        mutator = _ref2[_i];
        mutator.data(primary, aux, shouldRender);
      }
      return null;
    };

    Binder.prototype._attachMutator = function(klass, param) {
      var existingMutator, identity, mutator, _base, _name, _ref1;

      identity = klass.identity(param);
      existingMutator = ((_ref1 = (_base = this._mutatorIndex)[_name = klass.name]) != null ? _ref1 : _base[_name] = {})[identity];
      mutator = new klass(this.dom, this, param, existingMutator);
      mutator.destroyWith(this);
      this._mutatorIndex[klass.name][identity] = mutator;
      this._mutators.push(mutator);
      return mutator;
    };

    return Binder;

  })(Base);

  Mutator = (function(_super) {
    __extends(Mutator, _super);

    function Mutator(dom, parentBinder, params, parentMutator) {
      var _ref1;

      this.dom = dom;
      this.parentBinder = parentBinder;
      this.params = params;
      this.parentMutator = parentMutator;
      Mutator.__super__.constructor.call(this);
      this._data = [];
      this._listeners = [];
      this._fallback = this._flatMap = this._value = null;
      if ((_ref1 = this._parentMutator) != null) {
        _ref1._isParent = true;
      }
      if (typeof this._namedParams === "function") {
        this._namedParams(this.params);
      }
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    Mutator.prototype.from = function() {
      var path,
        _this = this;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._data.push(function(primary) {
        return _this._from(primary, path);
      });
      return this;
    };

    Mutator.prototype.fromSelf = function() {
      this._data.push(function(primary) {
        return new Varying(primary);
      });
      return this;
    };

    Mutator.prototype.fromAux = function() {
      var key, path,
        _this = this;

      key = arguments[0], path = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((path != null) && path.length > 0) {
        this._data.push(function(_, aux) {
          return _this._from(util.deepGet(aux, key), path);
        });
      } else {
        this._data.push(function(_, aux) {
          return new Varying(util.deepGet(aux, key));
        });
      }
      return this;
    };

    Mutator.prototype.fromApp = function() {
      var path,
        _this = this;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._data.push(function() {
        return _this._from(_this.parentBinder.options.app, path);
      });
      return this;
    };

    Mutator.prototype.fromAttribute = function(key) {
      this._data.push(function(primary) {
        return new Varying(primary.attribute(key));
      });
      return this;
    };

    Mutator.prototype._from = function(obj, path) {
      var next, results, watched,
        _this = this;

      results = [];
      watched = {};
      next = function(idx) {
        return function(result) {
          var resolved;

          results[idx] = result;
          if (result instanceof reference.RequestResolver) {
            resolved = result.resolve(_this.parentBinder.options.app);
            if (resolved != null) {
              return next(0)(obj);
            }
          } else if (result instanceof reference.ModelResolver) {
            resolved = result.resolve(results[idx - 1]);
            if (resolved != null) {
              return next(0)(obj);
            }
          } else if (idx < path.length) {
            if ((result != null) && (result.watch == null)) {
              debugger;
            }
            if (result != null) {
              if (watched[result._id] != null) {
                return watched[result._id];
              } else {
                return watched[result._id] = result != null ? result.watch(path[idx]).map(next(idx + 1)) : void 0;
              }
            } else {
              return null;
            }
          } else {
            return result;
          }
        };
      };
      return next(0)(obj);
    };

    Mutator.prototype.fromVarying = function(varyingGenerator) {
      var _this = this;

      this._data.push(function(primary, aux) {
        return varyingGenerator.call(_this, primary, aux, _this.parentBinder.options.app);
      });
      return this;
    };

    Mutator.prototype.and = Mutator.prototype.from;

    Mutator.prototype.andSelf = Mutator.prototype.fromSelf;

    Mutator.prototype.andAux = Mutator.prototype.fromAux;

    Mutator.prototype.andApp = Mutator.prototype.fromApp;

    Mutator.prototype.andAttribute = Mutator.prototype.fromAttribute;

    Mutator.prototype.andVarying = Mutator.prototype.fromVarying;

    Mutator.prototype.andLast = function() {
      var _this = this;

      this._data.push(function() {
        _this.parentMutator.data(primary, aux);
        return _this.parentMutator._varying;
      });
      return this;
    };

    Mutator.prototype.flatMap = function(f) {
      this._flatMap = f;
      return this;
    };

    Mutator.prototype.fallback = function(fallback) {
      this._fallback = fallback;
      return this;
    };

    Mutator.prototype.data = function(primary, aux, shouldRender) {
      var datum, listener, process, _i, _len, _ref1,
        _this = this;

      _ref1 = this._listeners;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        listener = _ref1[_i];
        listener.destroy();
        this.unlistenTo(listener);
      }
      this._listeners = (function() {
        var _j, _len1, _ref2, _results;

        _ref2 = this._data;
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          datum = _ref2[_j];
          _results.push(datum(primary, aux));
        }
        return _results;
      }).call(this);
      process = function() {
        var values;

        values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (_this._flatMap != null) {
          return _this._flatMap.apply(_this, values);
        } else if (values.length === 1) {
          return values[0];
        } else {
          return values;
        }
      };
      this._varying = new MultiVarying(this._listeners, process);
      this._varying.destroyWith(this);
      this.listenTo(this._varying, 'changed', function() {
        return _this.apply();
      });
      this.apply(shouldRender);
      shouldRender = true;
      return this;
    };

    Mutator.prototype.calculate = function() {
      var _ref1, _ref2;

      return (_ref1 = (_ref2 = this._varying) != null ? _ref2.value : void 0) != null ? _ref1 : this._fallback;
    };

    Mutator.prototype.apply = function(shouldRender) {
      if (shouldRender == null) {
        shouldRender = true;
      }
      if (this._isParent !== true && shouldRender === true) {
        return this._apply(this.calculate());
      }
    };

    Mutator.prototype.end = function() {
      return this.parentBinder;
    };

    Mutator.identity = function() {
      return util.uniqueId();
    };

    Mutator.prototype._apply = function() {};

    return Mutator;

  })(Base);

  ClassMutator = (function(_super) {
    __extends(ClassMutator, _super);

    function ClassMutator() {
      _ref1 = ClassMutator.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ClassMutator.identity = function(_arg) {
      var className;

      className = _arg[0];
      return className;
    };

    ClassMutator.prototype._namedParams = function(_arg) {
      this.className = _arg[0];
    };

    ClassMutator.prototype._apply = function(bool) {
      return this.dom.toggleClass(this.className, bool != null ? bool : false);
    };

    return ClassMutator;

  })(Mutator);

  ClassGroupMutator = (function(_super) {
    __extends(ClassGroupMutator, _super);

    function ClassGroupMutator() {
      _ref2 = ClassGroupMutator.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ClassGroupMutator.identity = function(_arg) {
      var classPrefix;

      classPrefix = _arg[0];
      return classPrefix;
    };

    ClassGroupMutator.prototype._namedParams = function(_arg) {
      this.classPrefix = _arg[0];
    };

    ClassGroupMutator.prototype._apply = function(value) {
      var className, existingClasses, _i, _len, _ref3;

      existingClasses = (_ref3 = this.dom.attr('class')) != null ? _ref3.split(' ') : void 0;
      if (existingClasses != null) {
        for (_i = 0, _len = existingClasses.length; _i < _len; _i++) {
          className = existingClasses[_i];
          if (className.indexOf(this.classPrefix) === 0) {
            this.dom.removeClass(className);
          }
        }
      }
      if ((value != null) && util.isPrimitive(value)) {
        return this.dom.addClass("" + this.classPrefix + value);
      }
    };

    return ClassGroupMutator;

  })(Mutator);

  AttrMutator = (function(_super) {
    __extends(AttrMutator, _super);

    function AttrMutator() {
      _ref3 = AttrMutator.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    AttrMutator.identity = function(_arg) {
      var attr;

      attr = _arg[0];
      return attr;
    };

    AttrMutator.prototype._namedParams = function(_arg) {
      this.attr = _arg[0];
    };

    AttrMutator.prototype._apply = function(value) {
      return this.dom.attr(this.attr, util.isPrimitive(value) ? value : '');
    };

    return AttrMutator;

  })(Mutator);

  CssMutator = (function(_super) {
    __extends(CssMutator, _super);

    function CssMutator() {
      _ref4 = CssMutator.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    CssMutator.identity = function(_arg) {
      var cssAttr;

      cssAttr = _arg[0];
      return cssAttr;
    };

    CssMutator.prototype._namedParams = function(_arg) {
      this.cssAttr = _arg[0];
    };

    CssMutator.prototype._apply = function(value) {
      return this.dom.css(this.cssAttr, util.isPrimitive(value) ? value : '');
    };

    return CssMutator;

  })(Mutator);

  TextMutator = (function(_super) {
    __extends(TextMutator, _super);

    function TextMutator() {
      _ref5 = TextMutator.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    TextMutator.identity = function() {
      return 'text';
    };

    TextMutator.prototype._apply = function(text) {
      return this.dom.text(util.isPrimitive(text) ? text.toString() : '');
    };

    return TextMutator;

  })(Mutator);

  HtmlMutator = (function(_super) {
    __extends(HtmlMutator, _super);

    function HtmlMutator() {
      _ref6 = HtmlMutator.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    HtmlMutator.identity = function() {
      return 'html';
    };

    HtmlMutator.prototype._apply = function(html) {
      return this.dom.html(util.isPrimitive(html) ? html.toString() : '');
    };

    return HtmlMutator;

  })(Mutator);

  RenderMutator = (function(_super) {
    __extends(RenderMutator, _super);

    function RenderMutator() {
      _ref7 = RenderMutator.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    RenderMutator.prototype._namedParams = function(_arg) {
      this.app = _arg[0], this.options = _arg[1];
    };

    RenderMutator.prototype.apply = function(shouldRender) {
      if (shouldRender == null) {
        shouldRender = true;
      }
      if (!this._isParent) {
        return this._render(this._viewFromResult(this.calculate()), shouldRender);
      }
    };

    RenderMutator.prototype._viewFromResult = function(result) {
      var constructorOpts, lastKlass;

      lastKlass = this._lastKlass;
      delete this._lastKlass;
      if (result == null) {
        return null;
      } else if (result instanceof types.WithOptions) {
        return this.app.getView(result.model, result.options);
      } else if (result instanceof types.WithView) {
        return result.view;
      } else if (result instanceof types.WithAux && (result.primary != null)) {
        constructorOpts = util.extendNew(this.options.constructorOpts, {
          aux: result.aux
        });
        return this.app.getView(result.primary, util.extendNew(this.options, {
          constructorOpts: constructorOpts
        }));
      } else {
        return this.app.getView(result, this.options);
      }
    };

    RenderMutator.prototype._render = function(view, shouldRender) {
      this._clear();
      this._lastView = view;
      if (view != null) {
        view.destroyWith(this);
        if (shouldRender === true) {
          this.dom.children().each(function() {
            var _ref8;

            return (_ref8 = $(this).data('view')) != null ? typeof _ref8.destroy === "function" ? _ref8.destroy() : void 0 : void 0;
          });
          this.dom.empty();
          this.dom.append(view.artifact());
          return view.emit('appended');
        } else {
          return view.bind(this.dom.contents());
        }
      }
    };

    RenderMutator.prototype._clear = function() {
      if (this._lastView != null) {
        return this._lastView.destroy();
      }
    };

    return RenderMutator;

  })(Mutator);

  ApplyMutator = (function(_super) {
    __extends(ApplyMutator, _super);

    function ApplyMutator() {
      _ref8 = ApplyMutator.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    ApplyMutator.prototype._namedParams = function(_arg) {
      this.f = _arg[0];
    };

    ApplyMutator.prototype._apply = function(value) {
      return this.f(this.dom, value);
    };

    return ApplyMutator;

  })(Mutator);

  util.extend(module.exports, {
    Binder: Binder,
    Mutator: Mutator,
    mutators: {
      ClassMutator: ClassMutator,
      ClassGroupMutator: ClassGroupMutator,
      AttrMutator: AttrMutator,
      CssMutator: CssMutator,
      TextMutator: TextMutator,
      HtmlMutator: HtmlMutator,
      RenderMutator: RenderMutator,
      ApplyMutator: ApplyMutator
    }
  });

}).call(this);

},{"../core/base":67,"../core/varying":69,"../model/reference":77,"../util/util":84,"./types":82}],80:[function(require,module,exports){
(function() {
  var util;

  util = require('../util/util');

  util.extend(module.exports, {
    WithAux: require('./types').WithAux,
    WithOptions: require('./types').WithOptions,
    WithView: require('./types').WithView,
    Templater: require('./templater').Templater
  });

}).call(this);

},{"../util/util":84,"./templater":81,"./types":82}],81:[function(require,module,exports){
(function() {
  var Binder, Templater, util;

  util = require('../util/util');

  Binder = require('./binder').Binder;

  Templater = (function() {
    function Templater(options) {
      this.options = options != null ? options : {};
      if (this.options.dom != null) {
        this._dom$ = this.options.dom;
      }
      this._binder = new Binder(this._wrappedDom(), {
        app: this.options.app
      });
      this._binding();
    }

    Templater.prototype._binding = function() {
      return this._binder;
    };

    Templater.prototype.markup = function() {
      return this._wrappedDom().get(0).innerHTML;
    };

    Templater.prototype.data = function(primary, aux, shouldRender) {
      return this._binder.data(primary, aux, shouldRender);
    };

    Templater.prototype.dom = function() {
      var _ref;

      return (_ref = this._dom$) != null ? _ref : this._dom$ = this._dom();
    };

    Templater.prototype._dom = function() {};

    Templater.prototype._wrappedDom = function() {
      var _ref;

      return (_ref = this._wrappedDom$) != null ? _ref : this._wrappedDom$ = this.dom().wrap('<div/>').parent();
    };

    return Templater;

  })();

  util.extend(module.exports, {
    Templater: Templater
  });

}).call(this);

},{"../util/util":84,"./binder":79}],82:[function(require,module,exports){
(function() {
  var WithAux, WithOptions, WithView, util;

  util = require('../util/util');

  WithAux = (function() {
    function WithAux(primary, aux) {
      this.primary = primary;
      this.aux = aux != null ? aux : {};
    }

    return WithAux;

  })();

  WithOptions = (function() {
    function WithOptions(model, options) {
      this.model = model;
      this.options = options;
    }

    return WithOptions;

  })();

  WithView = (function() {
    function WithView(view) {
      this.view = view;
    }

    return WithView;

  })();

  util.extend(module.exports, {
    WithAux: WithAux,
    WithOptions: WithOptions,
    WithView: WithView
  });

}).call(this);

},{"../util/util":84}],83:[function(require,module,exports){
(function() {
  var Continuous, Coverage, Range, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('./util');

  Varying = require('../core/varying').Varying;

  Coverage = (function() {
    function Coverage(children) {
      var child, _i, _len;

      if (children == null) {
        children = [];
      }
      this.children = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        child = children[_i];
        this["with"](child);
      }
    }

    Coverage.prototype._with = function(range) {
      var idx, _ref, _ref1,
        _this = this;

      while ((idx = this._searchOverlap(range)) != null) {
        range = this.children.splice(idx, 1)._with(range);
      }
      this.children.push(range);
      this.lower = Math.min((_ref = this.lower) != null ? _ref : range.lower, range.lower);
      this.upper = Math.max((_ref1 = this.upper) != null ? _ref1 : range.upper, range.upper);
      range.on('split', function(newCoverage) {
        idx = _this.children.indexOf(range);
        if (idx < 0) {
          return range.destroy();
        } else {
          return _this.children[idx] = newCoverage;
        }
      });
      return this;
    };

    Coverage.prototype.add = Coverage.prototype._with;

    Coverage.prototype.overlaps = function(lower, upper) {
      return (lower <= this.upper) && (upper >= this.lower);
    };

    Coverage.prototype.within = function(lower, upper) {
      if (lower == null) {
        lower = this.lower;
      }
      if (upper == null) {
        upper = this.upper;
      }
      return util.foldLeft([])(this.children, function(result, child) {
        return result.concat(!child.overlaps(lower, upper) ? [] : child instanceof Range ? [child] : child.within(idx, length));
      });
    };

    Coverage.prototype.gaps = function(lower, upper) {
      var child, gaps, _i, _len, _ref;

      if (lower == null) {
        lower = this.lower;
      }
      if (upper == null) {
        upper = this.upper;
      }
      this.children.sort(function(a, b) {
        return a.lower - b.lower;
      });
      gaps = [];
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (lower < child.lower) {
          gaps.push([lower, child.lower - 1]);
          lower = child.lower;
        }
        if (lower < child.upper) {
          if ((child instanceof Range) || (child instanceof Continuous)) {
            lower = child.upper + 1;
          } else {
            gaps = gaps.concat(child.gaps(lower, upper));
            lower = child.upper + 1;
          }
        }
        if (lower >= upper) {
          break;
        }
      }
      if (lower < upper) {
        gaps.push([lower, upper]);
      }
      return gaps;
    };

    Coverage.prototype.fills = function(lower, upper) {
      if (lower == null) {
        lower = this.lower;
      }
      if (upper == null) {
        upper = this.upper;
      }
      return util.foldLeft([])(this.children, function(result, child) {
        return result.concat(!child.overlaps(lower, upper) ? [] : (child instanceof Continuous) || (child instanceof Range) ? [child.lower, child.upper] : child.fills(lower, upper));
      });
    };

    Coverage.prototype._searchOverlap = function(range) {
      var child, idx, _i, _len, _ref;

      _ref = this.children;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        child = _ref[idx];
        if (child.overlaps(range.lower, range.upper)) {
          return idx;
        }
      }
      return null;
    };

    return Coverage;

  })();

  Continuous = (function(_super) {
    __extends(Continuous, _super);

    function Continuous(children) {
      var child, range, _fn, _i, _len, _ref,
        _this = this;

      this.children = children != null ? children : [];
      this.lower = util.reduceLeft((function() {
        var _i, _len, _ref, _results;

        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.lower);
        }
        return _results;
      }).call(this), Math.min);
      this.upper = util.reduceLeft((function() {
        var _i, _len, _ref, _results;

        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.upper);
        }
        return _results;
      }).call(this), Math.max);
      _ref = this.children;
      _fn = function(range) {
        return range.on('destroying', function() {
          return _this.emit('split', _this._without(range));
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        range = _ref[_i];
        _fn(range);
      }
    }

    Continuous.prototype._with = function(range) {
      return new Continuous(this.children.concat[range]);
    };

    Continuous.prototype._without = function(deadRange) {
      var range;

      return new Coverage((function() {
        var _i, _len, _ref, _results;

        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          range = _ref[_i];
          if (range !== deadRange) {
            _results.push(range);
          }
        }
        return _results;
      }).call(this));
    };

    return Continuous;

  })(Coverage);

  Range = (function(_super) {
    __extends(Range, _super);

    function Range(lower, upper, value) {
      this.lower = lower;
      this.upper = upper;
      Range.__super__.constructor.call(this, value);
    }

    Range.prototype.overlaps = function(lower, upper) {
      return (lower <= this.upper) && (upper >= this.lower);
    };

    Range.prototype._with = function(other) {
      return new Continuous([this, other]);
    };

    Range.prototype.map = function(f) {
      var result,
        _this = this;

      result = new Range(this.lower, this.upper, this.value);
      this.on('changed', function(value) {
        return result.setValue(value);
      });
      return result;
    };

    return Range;

  })(Varying);

  util.extend(module.exports, {
    Coverage: Coverage,
    Continuous: Continuous,
    Range: Range
  });

}).call(this);

},{"../core/varying":69,"./util":84}],84:[function(require,module,exports){
(function() {
  var toString, type, util, _fn, _i, _len, _ref, _ref1,
    __slice = [].slice;

  util = {
    isArray: (_ref = Array.isArray) != null ? _ref : function(obj) {
      return toString.call(obj) === '[object Array]';
    },
    isNumber: function(obj) {
      return toString.call(obj) === '[object Number]' && !isNaN(obj);
    },
    isPlainObject: function(obj) {
      return (obj != null) && (typeof obj === 'object') && (obj.constructor === Object);
    },
    isPrimitive: function(obj) {
      return util.isString(obj) || util.isNumber(obj) || obj === true || obj === false;
    },
    _uniqueId: 0,
    uniqueId: function() {
      return util._uniqueId++;
    },
    once: function(f) {
      var run;

      run = false;
      return function() {
        var args;

        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (run === true) {
          return;
        }
        run = true;
        return f.apply(null, args);
      };
    },
    foldLeft: function(value) {
      return function(arr, f) {
        var elem, _i, _len;

        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          elem = arr[_i];
          value = f(value, elem);
        }
        return value;
      };
    },
    reduceLeft: function(arr, f) {
      return util.foldLeft(arr[0])(arr, f);
    },
    first: function(arr) {
      return arr[0];
    },
    last: function(arr) {
      return arr[arr.length - 1];
    },
    resplice: function(arr, pull, push) {
      var idx;

      idx = arr.indexOf(pull);
      if (idx < 0) {
        idx = arr.length;
      }
      return arr.splice.apply(arr, [idx, 1].concat(__slice.call(push)));
    },
    extend: function() {
      var dest, k, src, srcs, v, _i, _len;

      dest = arguments[0], srcs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = srcs.length; _i < _len; _i++) {
        src = srcs[_i];
        for (k in src) {
          v = src[k];
          dest[k] = v;
        }
      }
      return null;
    },
    extendNew: function() {
      var obj, srcs;

      srcs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      obj = {};
      util.extend.apply(util, [obj].concat(__slice.call(srcs)));
      return obj;
    },
    hasProperties: function(obj) {
      var k;

      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return true;
        }
      }
      return false;
    },
    normalizePath: function(path) {
      if (path.length !== 1) {
        return path;
      } else {
        if (util.isString(path[0])) {
          return path[0].split('.');
        } else if (util.isArray(path[0])) {
          return path[0];
        }
      }
    },
    deepGet: function() {
      var idx, obj, path;

      obj = arguments[0], path = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      path = util.normalizePath(path);
      if (path == null) {
        return null;
      }
      idx = 0;
      while ((obj != null) && idx < path.length) {
        obj = obj[path[idx++]];
      }
      return obj != null ? obj : null;
    },
    deepSet: function() {
      var idx, obj, path, _name, _ref1;

      obj = arguments[0], path = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      path = util.normalizePath(path);
      if (path == null) {
        return null;
      }
      idx = 0;
      while ((idx + 1) < path.length) {
        obj = (_ref1 = obj[_name = path[idx++]]) != null ? _ref1 : obj[_name] = {};
      }
      return function(x) {
        if (util.isFunction(x)) {
          return x(obj, path[idx]);
        } else {
          return obj[path[idx]] = x;
        }
      };
    },
    traverse: function(obj, f, path) {
      var k, subpath, v;

      if (path == null) {
        path = [];
      }
      for (k in obj) {
        v = obj[k];
        subpath = path.concat([k]);
        if ((v != null) && util.isPlainObject(v)) {
          util.traverse(v, f, subpath);
        } else {
          f(subpath, v);
        }
      }
      return obj;
    },
    traverseAll: function(obj, f, path) {
      var k, subpath, v;

      if (path == null) {
        path = [];
      }
      for (k in obj) {
        v = obj[k];
        subpath = path.concat([k]);
        f(subpath, v);
        if ((obj[k] != null) && util.isPlainObject(obj[k])) {
          util.traverseAll(obj[k], f, subpath);
        }
      }
      return obj;
    }
  };

  toString = Object.prototype.toString;

  _ref1 = ['Arguments', 'Function', 'String', 'Date', 'RegExp'];
  _fn = function(type) {
    return util['is' + type] = function(obj) {
      return toString.call(obj) === ("[object " + type + "]");
    };
  };
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    type = _ref1[_i];
    _fn(type);
  }

  if (typeof /./ !== 'function') {
    util.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  util.extend(module.exports, util);

}).call(this);

},{}],85:[function(require,module,exports){
(function() {
  var DomView, List, View, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  View = require('./view').View;

  List = require('../collection/list').List;

  DomView = (function(_super) {
    __extends(DomView, _super);

    DomView.prototype.templateClass = null;

    function DomView(subject, options) {
      var _this = this;

      this.subject = subject;
      this.options = options != null ? options : {};
      DomView.__super__.constructor.call(this, this.subject, this.options);
      this._subviews = new List();
      this.on('appended', function() {
        var subview, _i, _len, _ref;

        if (_this.artifact().closest('body').length > 0) {
          _this.emit('appendedToDocument');
          _ref = _this._subviews.list;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            subview = _ref[_i];
            subview.emit('appended');
          }
        }
        return null;
      });
      this.destroyWith(this.subject);
    }

    DomView.prototype.markup = function() {
      var node;

      return ((function() {
        var _i, _len, _ref, _results;

        _ref = this.artifact().get();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(node.outerHTML);
        }
        return _results;
      }).call(this)).join('');
    };

    DomView.prototype._render = function() {
      var dom;

      this._templater = new this.templateClass(util.extendNew({
        app: this._app()
      }, this._templaterOptions()));
      dom = this._templater.dom();
      this._setTemplaterData();
      return dom;
    };

    DomView.prototype._templaterOptions = function() {
      return {};
    };

    DomView.prototype._bind = function(dom) {
      this._templater = new this.templateClass({
        app: this._app(),
        dom: dom
      });
      this._setTemplaterData(false);
      return null;
    };

    DomView.prototype._setTemplaterData = function(shouldRender) {
      return this._templater.data(this.subject, this._auxData(), shouldRender);
    };

    DomView.prototype._auxData = function() {
      var _ref;

      return (_ref = this.options.aux) != null ? _ref : {};
    };

    DomView.prototype._app = function() {
      var _ref,
        _this = this;

      return (_ref = this._app$) != null ? _ref : this._app$ = (function() {
        var library;

        library = _this.options.app.get('views').newEventBindings();
        library.destroyWith(_this);
        _this.listenTo(library, 'got', function(view) {
          if (_this._wired === true) {
            view.wireEvents();
          }
          return _this._subviews.add(view);
        });
        return _this.options.app.withViewLibrary(library);
      })();
    };

    DomView.prototype.wireEvents = function() {
      var dom, view, _i, _len, _ref;

      if (this._wired === true) {
        return;
      }
      this._wired = true;
      dom = this.artifact();
      dom.data('view', this);
      this._wireEvents();
      if (this._subviews != null) {
        _ref = this._subviews.list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          if (view != null) {
            view.wireEvents();
          }
        }
      }
      return null;
    };

    DomView.prototype.destroy = function() {
      var _base;

      if (this._artifact != null) {
        if (typeof (_base = this.artifact()).trigger === "function") {
          _base.trigger('destroying');
        }
        this.artifact().remove();
      }
      return DomView.__super__.destroy.call(this);
    };

    return DomView;

  })(View);

  util.extend(module.exports, {
    DomView: DomView
  });

}).call(this);

},{"../collection/list":60,"../util/util":84,"./view":91}],86:[function(require,module,exports){
(function() {
  var DomView, ListEditItem, ListEditItemTemplate, ListEditView, ListView, Templater, templater, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  DomView = require('../dom-view').DomView;

  templater = require('../../templater/package');

  Templater = require('../../templater/templater').Templater;

  ListView = require('./list').ListView;

  ListEditView = (function(_super) {
    __extends(ListEditView, _super);

    function ListEditView() {
      _ref = ListEditView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListEditView.prototype._initialize = function() {
      var _ref1;

      ListEditView.__super__._initialize.call(this);
      this.options.childOpts = util.extendNew(this.options.childOpts, {
        context: this.options.itemContext,
        list: this.subject
      });
      return this.options.itemContext = (_ref1 = this.options.editWrapperContext) != null ? _ref1 : 'edit-wrapper';
    };

    return ListEditView;

  })(ListView);

  ListEditItemTemplate = (function(_super) {
    __extends(ListEditItemTemplate, _super);

    function ListEditItemTemplate() {
      _ref1 = ListEditItemTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ListEditItemTemplate.prototype._binding = function() {
      var binding;

      binding = ListEditItemTemplate.__super__._binding.call(this);
      binding.find('.editItem').render(this.options.app).fromSelf().andAux('context').flatMap(function(item, context) {
        return new templater.WithOptions(item, {
          context: context != null ? context : 'edit'
        });
      });
      return binding;
    };

    return ListEditItemTemplate;

  })(Templater);

  ListEditItem = (function(_super) {
    __extends(ListEditItem, _super);

    function ListEditItem() {
      _ref2 = ListEditItem.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ListEditItem.prototype.templateClass = ListEditItemTemplate;

    ListEditItem.prototype._auxData = function() {
      return {
        context: this.options.context
      };
    };

    ListEditItem.prototype._wireEvents = function() {
      var dom,
        _this = this;

      dom = this.artifact();
      return dom.find('> .editRemove').on('click', function(event) {
        event.preventDefault();
        return _this.options.list.remove(_this.subject);
      });
    };

    return ListEditItem;

  })(DomView);

  util.extend(module.exports, {
    ListEditView: ListEditView,
    ListEditItemTemplate: ListEditItemTemplate,
    ListEditItem: ListEditItem
  });

}).call(this);

},{"../../templater/package":80,"../../templater/templater":81,"../../util/util":84,"../dom-view":85,"./list":87}],87:[function(require,module,exports){
(function() {
  var ListView, Varying, ViewContainer, reference, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  ViewContainer = require('./view-container').ViewContainer;

  reference = require('../../model/reference');

  Varying = require('../../core/varying').Varying;

  ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      _ref = ListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListView.prototype._render = function() {
      var dom,
        _this = this;

      dom = this._dom = ListView.__super__._render.call(this);
      this._add(this.subject.list);
      this.listenTo(this.subject, 'added', function(item, idx) {
        return _this._add(item, idx);
      });
      this.listenTo(this.subject, 'removed', function(item) {
        return _this._remove(item);
      });
      return dom;
    };

    ListView.prototype._target = function() {
      return this._dom;
    };

    ListView.prototype._add = function(items, idx) {
      var afterDom, insert, item, target, _fn, _i, _len,
        _this = this;

      if (!util.isArray(items)) {
        items = [items];
      }
      afterDom = null;
      target = this._target();
      insert = function(elem) {
        if (target.children().length === 0) {
          target.append(elem);
        } else if (afterDom != null) {
          afterDom.after(elem);
        } else if (util.isNumber(idx)) {
          if (idx === 0) {
            target.prepend(elem);
          } else {
            afterDom = target.children(":nth-child(" + idx + ")");
            afterDom.after(elem);
          }
        } else {
          afterDom = target.children(':last-child');
          afterDom.after(elem);
        }
        return afterDom = elem;
      };
      _fn = function(item) {
        var view, viewDom, _ref1;

        view = viewDom = null;
        if (item instanceof reference.RequestReference && item.value instanceof reference.RequestResolver) {
          item.value.resolve(_this.options.app);
        }
        view = _this._getView(item);
        viewDom = (_ref1 = view != null ? view.artifact() : void 0) != null ? _ref1 : _this._emptyDom();
        insert(viewDom);
        if (view != null) {
          view.emit('appended');
          if (_this._wired === true) {
            return view.wireEvents();
          }
        }
      };
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _fn(item);
      }
      return null;
    };

    ListView.prototype._remove = function(items) {
      var item, _i, _len;

      if (!util.isArray(items)) {
        items = [items];
      }
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this._removeView(item);
      }
      return null;
    };

    return ListView;

  })(ViewContainer);

  util.extend(module.exports, {
    ListView: ListView
  });

}).call(this);

},{"../../core/varying":69,"../../model/reference":77,"../../util/util":84,"./view-container":89}],88:[function(require,module,exports){
(function() {
  var VaryingView, ViewContainer, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  ViewContainer = require('./view-container').ViewContainer;

  VaryingView = (function(_super) {
    __extends(VaryingView, _super);

    function VaryingView() {
      _ref = VaryingView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VaryingView.prototype._render = function() {
      var dom, handleValue, replaceWith,
        _this = this;

      dom = VaryingView.__super__._render.call(this);
      replaceWith = function(newDom) {
        dom.replaceWith(newDom);
        return dom = newDom;
      };
      handleValue = function(newValue) {
        var newView;

        if (_this._value != null) {
          replaceWith(_this._templater.dom());
          _this._removeView(_this._value);
        }
        if (newValue != null) {
          newView = _this._getView(newValue);
          if (newView != null) {
            replaceWith(newView.artifact());
            newView.emit('appended');
          }
        }
        return _this._value = newValue;
      };
      this.subject.on('changed', handleValue);
      handleValue(this.subject.value);
      return dom;
    };

    VaryingView.prototype._childContext = function() {
      var _ref1;

      return (_ref1 = this.options.itemContext) != null ? _ref1 : this.options.libraryContext;
    };

    return VaryingView;

  })(ViewContainer);

  util.extend(module.exports, {
    VaryingView: VaryingView
  });

}).call(this);

},{"../../util/util":84,"./view-container":89}],89:[function(require,module,exports){
(function() {
  var DomView, Varying, ViewContainer, reference, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  DomView = require('../dom-view').DomView;

  reference = require('../../model/reference');

  Varying = require('../../core/varying').Varying;

  ViewContainer = (function(_super) {
    __extends(ViewContainer, _super);

    function ViewContainer() {
      _ref = ViewContainer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ViewContainer.prototype._initialize = function() {
      var _base, _ref1;

      this._views = {};
      return (_ref1 = (_base = this.options).childOpts) != null ? _ref1 : _base.childOpts = {};
    };

    ViewContainer.prototype._removeView = function(subject) {
      var _ref1;

      if ((_ref1 = this._views[subject._id]) != null) {
        _ref1.destroy();
      }
      delete this._views[subject._id];
      return null;
    };

    ViewContainer.prototype._getView = function(subject) {
      var result, view;

      if (subject == null) {
        return null;
      }
      view = subject instanceof DomView ? (this._subviews.add(subject), subject) : this.options.itemView != null ? (result = new this.options.itemView(subject, util.extendNew(this.options.childOpts, {
        app: this.options.app
      })), this._subviews.add(result), result) : this._app().getView(subject, {
        context: this._childContext(),
        constructorOpts: this.options.childOpts
      });
      this._views[subject._id] = view;
      if (this._wired === true) {
        if (view != null) {
          view.wireEvents();
        }
      }
      return view;
    };

    ViewContainer.prototype._childContext = function() {
      return this.options.itemContext;
    };

    return ViewContainer;

  })(DomView);

  util.extend(module.exports, {
    ViewContainer: ViewContainer
  });

}).call(this);

},{"../../core/varying":69,"../../model/reference":77,"../../util/util":84,"../dom-view":85}],90:[function(require,module,exports){
(function() {


}).call(this);

},{}],91:[function(require,module,exports){
(function() {
  var Base, View, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  util = require('../util/util');

  View = (function(_super) {
    __extends(View, _super);

    function View(subject, options) {
      this.subject = subject;
      this.options = options != null ? options : {};
      View.__super__.constructor.call(this);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    View.prototype.artifact = function() {
      var _ref;

      return (_ref = this._artifact) != null ? _ref : this._artifact = this._render();
    };

    View.prototype._render = function() {};

    View.prototype.wireEvents = function() {
      if (!this._wired) {
        this._wireEvents();
      }
      this._wired = true;
      return null;
    };

    View.prototype._wireEvents = function() {};

    View.prototype.bind = function(artifact) {
      this._artifact = artifact;
      this._bind(artifact);
      return null;
    };

    View.prototype._bind = function() {};

    return View;

  })(Base);

  util.extend(module.exports, {
    View: View
  });

}).call(this);

},{"../core/base":67,"../util/util":84}],92:[function(require,module,exports){
var process=require("__browserify_process");;!function(exports, undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || this._all;
    }
    else {
      return this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if(!this._all) {
      this._all = [];
    }

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return EventEmitter;
    });
  } else {
    exports.EventEmitter2 = EventEmitter;
  }

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);

},{"__browserify_process":27}],93:[function(require,module,exports){
(function() {
  var App, Model, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('../model/model').Model;

  util = require('../util/util');

  App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype._get = function(library) {
      var _this = this;

      return function(obj, options) {
        if (options == null) {
          options = {};
        }
        return library.get(obj, util.extendNew(options, {
          constructorOpts: util.extendNew(options.constructorOpts, {
            app: _this
          })
        }));
      };
    };

    App.prototype.getView = function(obj, options) {
      return this._get(this.get('views'))(obj, options);
    };

    App.prototype.getStore = function(obj, options) {
      return this._get(this.get('stores'))(obj, options);
    };

    App.prototype.withViewLibrary = function(viewLibrary) {
      var result;

      result = this.shadow();
      result.set('views', viewLibrary);
      this.emit('derived', result);
      return result;
    };

    App.prototype.withStoreLibrary = function(storeLibrary) {
      var result;

      result = this.shadow();
      result.set('stores', storeLibrary);
      this.emit('derived', result);
      return result;
    };

    return App;

  })(Model);

  util.extend(module.exports, {
    App: App
  });

}).call(this);

},{"../model/model":117,"../util/util":126}],94:[function(require,module,exports){
(function() {
  var App, Base, Endpoint, EndpointResponse, ForbiddenResponse, InternalErrorResponse, InvalidRequestResponse, NotFoundResponse, OkResponse, Request, StoreManifest, UnauthorizedResponse, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Request = require('../model/store').Request;

  App = require('./app').App;

  StoreManifest = require('./manifest').StoreManifest;

  EndpointResponse = (function() {
    function EndpointResponse(content) {
      this.content = content;
    }

    return EndpointResponse;

  })();

  OkResponse = (function(_super) {
    __extends(OkResponse, _super);

    function OkResponse() {
      _ref = OkResponse.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OkResponse.prototype.httpCode = 200;

    return OkResponse;

  })(EndpointResponse);

  InvalidRequestResponse = (function(_super) {
    __extends(InvalidRequestResponse, _super);

    function InvalidRequestResponse() {
      _ref1 = InvalidRequestResponse.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    InvalidRequestResponse.prototype.httpCode = 400;

    return InvalidRequestResponse;

  })(EndpointResponse);

  UnauthorizedResponse = (function(_super) {
    __extends(UnauthorizedResponse, _super);

    function UnauthorizedResponse() {
      _ref2 = UnauthorizedResponse.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    UnauthorizedResponse.prototype.httpCode = 401;

    return UnauthorizedResponse;

  })(EndpointResponse);

  ForbiddenResponse = (function(_super) {
    __extends(ForbiddenResponse, _super);

    function ForbiddenResponse() {
      _ref3 = ForbiddenResponse.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    ForbiddenResponse.prototype.httpCode = 403;

    return ForbiddenResponse;

  })(EndpointResponse);

  NotFoundResponse = (function(_super) {
    __extends(NotFoundResponse, _super);

    function NotFoundResponse() {
      _ref4 = NotFoundResponse.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    NotFoundResponse.prototype.httpCode = 404;

    return NotFoundResponse;

  })(EndpointResponse);

  InternalErrorResponse = (function(_super) {
    __extends(InternalErrorResponse, _super);

    function InternalErrorResponse() {
      _ref5 = InternalErrorResponse.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    InternalErrorResponse.prototype.httpCode = 500;

    return InternalErrorResponse;

  })(EndpointResponse);

  Endpoint = (function(_super) {
    __extends(Endpoint, _super);

    function Endpoint(pageModelClass, pageLibrary, app) {
      this.pageModelClass = pageModelClass;
      this.pageLibrary = pageLibrary;
      this.app = app;
      Endpoint.__super__.constructor.call(this);
    }

    Endpoint.prototype.handle = function(env, respond) {
      var app, dom, manifest, pageModel, pageView,
        _this = this;

      app = this.initApp(env);
      manifest = new StoreManifest(app.get('stores'));
      manifest.on('allComplete', function() {
        return _this.finish(pageModel, pageView, manifest, respond);
      });
      manifest.on('requestComplete', function(request) {
        if (request.value instanceof Request.state.type.Error && request.options.fatal === true) {
          return _this.error(request, respond);
        }
      });
      pageModel = this.initPageModel(env, app, respond);
      pageView = this.pageLibrary.get(pageModel, {
        context: env.context,
        constructorOpts: {
          app: app
        }
      });
      dom = this.initPageView(pageView, env);
      pageModel.resolve();
      return dom;
    };

    Endpoint.prototype.initApp = function(env) {
      var storeLibrary;

      storeLibrary = this.app.get('stores').newEventBindings();
      return this.app.withStoreLibrary(storeLibrary);
    };

    Endpoint.prototype.initPageModel = function(env, app, respond) {
      return new this.pageModelClass({
        env: env
      }, {
        app: app
      });
    };

    Endpoint.prototype.initPageView = function(pageView, env) {
      return pageView.artifact();
    };

    Endpoint.prototype.finish = function(pageModel, pageView, manifest, respond) {
      return respond(new OkResponse(pageView.markup()));
    };

    Endpoint.prototype.error = function(request, respond) {
      return respond(new InternalErrorResponse());
    };

    Endpoint.factoryWith = function(pageLibrary, app) {
      var self;

      self = this;
      return function(pageModelClass) {
        return new self(pageModelClass, pageLibrary, app);
      };
    };

    return Endpoint;

  })(Base);

  util.extend(module.exports, {
    Endpoint: Endpoint,
    responses: {
      EndpointResponse: EndpointResponse,
      OkResponse: OkResponse,
      InvalidRequestResponse: InvalidRequestResponse,
      UnauthorizedResponse: UnauthorizedResponse,
      ForbiddenResponse: ForbiddenResponse,
      NotFoundResponse: NotFoundResponse,
      InternalErrorResponse: InternalErrorResponse
    }
  });

}).call(this);

},{"../core/base":109,"../model/store":120,"../util/util":126,"./app":93,"./manifest":96}],95:[function(require,module,exports){
(function() {
  var Base, Endpoint, Handler, HttpHandler, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  util = require('../util/util');

  Base = require('../core/base').Base;

  Endpoint = require('./endpoint').Endpoint;

  Handler = (function(_super) {
    __extends(Handler, _super);

    function Handler() {
      Handler.__super__.constructor.call(this);
    }

    Handler.prototype.handler = function() {
      return function() {};
    };

    return Handler;

  })(Base);

  HttpHandler = (function(_super) {
    __extends(HttpHandler, _super);

    function HttpHandler(endpoint) {
      this.endpoint = endpoint;
      HttpHandler.__super__.constructor.call(this);
    }

    HttpHandler.prototype.handle = function(request, response, params) {
      var handled;

      handled = false;
      return this.endpoint.handle({
        url: request.url,
        params: params,
        headers: request.headers,
        requestStream: request.request,
        responseStream: response.response
      }, function(result) {
        if (handled === true) {
          return;
        }
        handled = true;
        response.writeHead(result.httpCode, {
          'Content-Type': 'text/html'
        });
        response.write(result.content);
        return response.end();
      });
    };

    HttpHandler.prototype.handler = function() {
      var self;

      self = this;
      return function() {
        var params;

        params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return self.handle(this.req, this.res, params);
      };
    };

    return HttpHandler;

  })(Handler);

  util.extend(module.exports, {
    Handler: Handler,
    HttpHandler: HttpHandler
  });

}).call(this);

},{"../core/base":109,"../util/util":126,"./endpoint":94}],96:[function(require,module,exports){
(function() {
  var Base, Manifest, Request, StoreManifest, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Request = require('../model/store').Request;

  Manifest = (function(_super) {
    __extends(Manifest, _super);

    function Manifest() {
      Manifest.__super__.constructor.call(this);
      this._requestCount = 0;
      this.requests = [];
      this.objects = [];
      this._setHook();
    }

    Manifest.prototype.requested = function(request) {
      var handleChange,
        _this = this;

      this._requestCount += 1;
      this.requests.push(request);
      this.emit('requestStart', request);
      handleChange = function(state) {
        if (state instanceof Request.state.type.Complete) {
          if (state instanceof Request.state.type.Success) {
            _this.objects.push(state.result);
          }
          _this.emit('requestComplete', request, state.result);
          _this._requestCount -= 1;
          return _this._setHook();
        }
      };
      request.on('changed', handleChange);
      handleChange(request.value);
      return null;
    };

    Manifest.prototype._setHook = function() {
      var _this = this;

      if (this._hookSet === true) {
        return;
      }
      this._hookSet = true;
      return setTimeout((function() {
        _this._hookSet = false;
        if (_this._requestCount === 0) {
          return _this.emit('allComplete');
        }
      }), 0);
    };

    return Manifest;

  })(Base);

  StoreManifest = (function(_super) {
    __extends(StoreManifest, _super);

    function StoreManifest(library) {
      var _this = this;

      this.library = library;
      StoreManifest.__super__.constructor.call(this);
      this.listenTo(this.library, 'got', function(store) {
        return store.on('requesting', function(request) {
          return _this.requested(request);
        });
      });
    }

    return StoreManifest;

  })(Manifest);

  util.extend(module.exports, {
    Manifest: Manifest,
    StoreManifest: StoreManifest
  });

}).call(this);

},{"../core/base":109,"../model/store":120,"../util/util":126}],97:[function(require,module,exports){
(function() {
  var CattedList, DerivedList, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  util = require('../util/util');

  CattedList = (function(_super) {
    __extends(CattedList, _super);

    function CattedList(lists, options) {
      var list, listIdx, _fn, _i, _len, _ref,
        _this = this;

      this.lists = lists;
      this.options = options != null ? options : {};
      CattedList.__super__.constructor.call(this);
      this.list = util.foldLeft([])(this.lists, function(elems, list) {
        return elems.concat(list.list);
      });
      _ref = this.lists;
      _fn = function(list, listIdx) {
        var getOverallIdx;

        getOverallIdx = function(itemIdx) {
          return util.foldLeft(0)(_this.lists.slice(0, listIdx), function(length, list) {
            return length + list.list.length;
          }) + itemIdx;
        };
        list.on('added', function(elem, idx) {
          return _this._add(elem, getOverallIdx(idx));
        });
        return list.on('removed', function(_, idx) {
          return _this._removeAt(getOverallIdx(idx));
        });
      };
      for (listIdx = _i = 0, _len = _ref.length; _i < _len; listIdx = ++_i) {
        list = _ref[listIdx];
        _fn(list, listIdx);
      }
    }

    return CattedList;

  })(DerivedList);

  util.extend(module.exports, {
    CattedList: CattedList
  });

}).call(this);

},{"../util/util":126,"./list":102}],98:[function(require,module,exports){
(function() {
  var util;

  util = require('../util/util');

  util.extend(module.exports, {
    Collection: require('./types').Collection,
    OrderedCollection: require('./types').OrderedCollection,
    List: require('./list').List,
    DerivedList: require('./list').DerivedList,
    MappedList: require('./mapped-list').MappedList,
    FilteredList: require('./filtered-list').FilteredList,
    CattedList: require('./catted-list').CattedList,
    PartitionedList: require('./partitioned-list').PartitionedList,
    UniqList: require('./uniq-list').UniqList,
    Set: require('./set').Set,
    IndefiniteList: require('./indefinite-list').IndefiniteList,
    LazyList: require('./lazy-list').LazyList,
    CachedLazyList: require('./lazy-list').CachedLazyList,
    Window: require('./window').Window
  });

}).call(this);

},{"../util/util":126,"./catted-list":97,"./filtered-list":99,"./indefinite-list":100,"./lazy-list":101,"./list":102,"./mapped-list":103,"./partitioned-list":104,"./set":105,"./types":106,"./uniq-list":107,"./window":108}],99:[function(require,module,exports){
(function() {
  var DerivedList, FilteredList, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  FilteredList = (function(_super) {
    __extends(FilteredList, _super);

    function FilteredList(parent, isMember, options) {
      var _this = this;

      this.parent = parent;
      this.isMember = isMember;
      this.options = options != null ? options : {};
      FilteredList.__super__.constructor.call(this);
      this._initElems(this.parent.list);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
      this.parent.on('added', function(elem) {
        return _this._initElems(elem);
      });
      this.parent.on('removed', function(_, idx) {
        return _this._removeAt(idx);
      });
    }

    FilteredList.prototype._initElems = function(elems) {
      var elem, result, _i, _len,
        _this = this;

      if (!util.isArray(elems)) {
        elems = [elems];
      }
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        result = this.isMember(elem);
        if (result instanceof Varying) {
          (function(elem) {
            var lastMembership;

            lastMembership = false;
            return result.reactNow(function(membership) {
              if (lastMembership !== membership) {
                if (membership === true) {
                  _this._add(elem);
                } else {
                  _this._removeAt(_this.list.indexOf(elem));
                }
                return lastMembership = membership;
              }
            });
          })(elem);
        } else if (result === true) {
          this._add(elem);
        }
      }
      return elems;
    };

    return FilteredList;

  })(DerivedList);

  util.extend(module.exports, {
    FilteredList: FilteredList
  });

}).call(this);

},{"../core/varying":111,"../util/util":126,"./list":102}],100:[function(require,module,exports){
(function() {
  var Base, Indefinite, IndefiniteList, Many, One, OrderedCollection, StepResult, Termination, Varying, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  OrderedCollection = require('./types').OrderedCollection;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  StepResult = (function() {
    function StepResult() {}

    return StepResult;

  })();

  One = (function(_super) {
    __extends(One, _super);

    function One(elem, step) {
      this.elem = elem;
      this.step = step;
    }

    return One;

  })(StepResult);

  Many = (function(_super) {
    __extends(Many, _super);

    function Many(elems, step) {
      this.elems = elems;
      this.step = step;
    }

    return Many;

  })(StepResult);

  Indefinite = (function(_super) {
    __extends(Indefinite, _super);

    function Indefinite() {
      _ref = Indefinite.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Indefinite;

  })(StepResult);

  Termination = (function(_super) {
    __extends(Termination, _super);

    function Termination() {
      _ref1 = Termination.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return Termination;

  })(StepResult);

  IndefiniteList = (function(_super) {
    __extends(IndefiniteList, _super);

    function IndefiniteList(step, options) {
      this.options = options != null ? options : {};
      IndefiniteList.__super__.constructor.call(this);
      this.list = [];
      this._step(step, 0);
    }

    IndefiniteList.prototype.at = function(idx) {
      return this.list[idx];
    };

    IndefiniteList.prototype._step = function(step, idx) {
      var process, result,
        _this = this;

      result = step();
      process = function(result) {
        var elem, subidx, _base, _i, _len, _ref2;

        _this._truncate(idx);
        if (result instanceof One) {
          _this.list.push(result.elem);
          _this.emit('added', result.elem, idx);
          if (typeof (_base = result.elem).emit === "function") {
            _base.emit('addedTo', _this, idx);
          }
          return _this._step(result.step, idx + 1);
        } else if (result instanceof Many) {
          _this.list = _this.list.concat(result.elems);
          _ref2 = result.elems;
          for (subidx = _i = 0, _len = _ref2.length; _i < _len; subidx = ++_i) {
            elem = _ref2[subidx];
            _this.emit('added', elem, idx + subidx);
            if (typeof elem.emit === "function") {
              elem.emit('addedTo', _this, idx + subidx);
            }
          }
          return _this._step(result.step, idx + result.elems.length);
        } else if (result instanceof Indefinite) {
          return _this.set('completion', Indefinite);
        } else if (result instanceof Termination) {
          return _this.set('completion', Termination);
        }
      };
      if (result instanceof Varying) {
        result.on('changed', function(newResult) {
          return process(newResult);
        });
        return process(result.value);
      } else {
        return process(result);
      }
    };

    IndefiniteList.prototype._truncate = function(idx) {
      var elem, removed, subidx, _i, _len;

      removed = this.list.splice(idx, this.list.length - idx);
      for (subidx = _i = 0, _len = removed.length; _i < _len; subidx = ++_i) {
        elem = removed[subidx];
        this.emit('removed', elem, idx + subidx);
        if (typeof elem.emit === "function") {
          elem.emit('removedFrom', this, idx + subidx);
        }
      }
      return null;
    };

    IndefiniteList.One = function(elem, step) {
      return new One(elem, step);
    };

    IndefiniteList.Many = function(elems, step) {
      return new Many(elems, step);
    };

    IndefiniteList.Indefinite = new Indefinite;

    IndefiniteList.Termination = new Termination;

    return IndefiniteList;

  })(OrderedCollection);

  util.extend(module.exports, {
    IndefiniteList: IndefiniteList,
    result: {
      StepResult: StepResult,
      One: One,
      Many: Many,
      Indefinite: Indefinite,
      Termination: Termination
    }
  });

}).call(this);

},{"../core/base":109,"../core/varying":111,"../util/util":126,"./types":106}],101:[function(require,module,exports){
(function() {
  var CachedLazyList, Coverage, LazyList, List, Model, Range, Varying, rangeUpdater, util, wrapAndSealFate, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  _ref = require('../util/range'), Coverage = _ref.Coverage, Range = _ref.Range;

  List = require('./list').List;

  Model = require('../model/model').Model;

  Varying = require('../core/varying').Varying;

  wrapAndSealFate = function(range, f) {
    var wrapped;

    wrapped = new Range(range.lower, range.upper, range);
    wrapped.on('destroying', function() {
      return range.destroy();
    });
    return wrapped;
  };

  rangeUpdater = function(from, to) {
    return function() {
      if (from.value instanceof List) {
        return to.value.put(Math.max(from.lower - to.lower, 0), from.value.slice(Math.max(to.lower - from.lower, 0), +(from.upper - to.lower) + 1 || 9e9));
      }
    };
  };

  LazyList = (function(_super) {
    __extends(LazyList, _super);

    LazyList.bind('signature').fromVarying(function() {
      return this._signature();
    });

    function LazyList(_, options) {
      this.options = options;
      LazyList.__super__.constructor.call(this, [], this.options);
      this._activeRanges = new List();
      this._watchSignature();
    }

    LazyList.prototype._watchSignature = function() {
      var _this = this;

      return this.watch('signature').on('changed', function(key) {
        var range, _i, _len, _ref1, _results;

        _ref1 = _this._activeRanges.list;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          range = _ref1[_i];
          _results.push(range.setValue(_this._range(range.lower, range.upper)));
        }
        return _results;
      });
    };

    LazyList.prototype.at = function(idx) {
      return this.range(idx, idx).map(function(result) {
        if (result instanceof List) {
          return result[0];
        } else {
          return result;
        }
      });
    };

    LazyList.prototype.range = function(lower, upper) {
      var inner, range;

      inner = this._range(lower, upper);
      range = new Range(lower, upper, inner);
      range.on('destroying', function() {
        return inner.destroy();
      });
      this._activeRanges.add(range);
      return range;
    };

    LazyList.prototype._range = function(lower, upper) {};

    LazyList.prototype.length = function() {
      return this.watch('length');
    };

    LazyList.prototype._signature = function() {
      return new Varying('');
    };

    return LazyList;

  })(Model);

  CachedLazyList = (function(_super) {
    __extends(CachedLazyList, _super);

    function CachedLazyList() {
      var _this = this;

      CachedLazyList.__super__.constructor.call(this);
      this._extCoverage = new Coverage();
      this._intCoverages = {};
      this._activeRanges.on('added', function(range) {
        return _this._extCoverages.add(range);
      });
      this._initSignature(this.get('signature'));
    }

    CachedLazyList.prototype._watchSignature = function() {
      return this.watch('signature').on('changed', function(signature) {
        var range, _i, _len, _ref1, _results;

        if (this._intCoverages[signature] != null) {
          _ref1 = this._activeRanges.list;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            range = _ref1[_i];
            _results.push(this._fetchRange(range));
          }
          return _results;
        } else {
          return this._initSignature(signature);
        }
      });
    };

    CachedLazyList.prototype._initSignature = function(signature) {
      var lower, range, upper, _i, _j, _len, _len1, _ref1, _ref2, _ref3;

      this._intCoverages[signature] = new Coverage();
      _ref1 = this._extCoverages.fills();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        _ref2 = _ref1[_i], lower = _ref2[0], upper = _ref2[1];
        this.range(lower, upper);
      }
      _ref3 = this._activeRanges.list;
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        range = _ref3[_j];
        range.setValue(this._fetchRange(new Range(range.lower, range.upper, new List())));
      }
      return null;
    };

    CachedLazyList.prototype.range = function(lower, upper) {
      var result, wrapped;

      result = new Range(lower, upper, new List());
      wrapped = wrapAndSealFate(result);
      this._fetchRange(result);
      this._activeRanges.add(wrapped);
      return wrapped;
    };

    CachedLazyList.prototype._fetchRange = function(result) {
      var gaps, intCoverage, lower, range, upper, _fn, _fn1, _i, _j, _len, _len1, _ref1, _ref2;

      intCoverage = this._intCoverage[this.get('signature')];
      _ref1 = intCoverage.within(lower, upper);
      _fn = function(range) {
        var update;

        update = rangeUpdater(range, result);
        update();
        return range.on('changed', update);
      };
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        range = _ref1[_i];
        _fn(range);
      }
      gaps = intCoverage.gaps(lower, upper);
      _fn1 = function() {
        var update;

        range = this._range(lower, upper);
        update = rangeUpdater(range, result);
        update();
        return range.on('changed', update);
      };
      for (_j = 0, _len1 = gaps.length; _j < _len1; _j++) {
        _ref2 = gaps[_j], lower = _ref2[0], upper = _ref2[1];
        _fn1();
      }
      return result;
    };

    return CachedLazyList;

  })(LazyList);

  util.extend(module.exports, {
    LazyList: LazyList,
    CachedLazyList: CachedLazyList
  });

}).call(this);

},{"../core/varying":111,"../model/model":117,"../util/range":125,"../util/util":126,"./list":102}],102:[function(require,module,exports){
(function() {
  var Base, DerivedList, List, Model, OrderedCollection, Reference, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Base = require('../core/base').Base;

  Varying = require('../core/varying').Varying;

  OrderedCollection = require('./types').OrderedCollection;

  Model = require('../model/model').Model;

  Reference = require('../model/reference').Reference;

  util = require('../util/util');

  List = (function(_super) {
    __extends(List, _super);

    function List(list, options) {
      if (list == null) {
        list = [];
      }
      this.options = options != null ? options : {};
      List.__super__.constructor.call(this, {}, this.options);
      this.list = [];
      this.add(list);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    List.prototype.add = function(elems, idx) {
      var elem, subidx, _i, _len,
        _this = this;

      if (idx == null) {
        idx = this.list.length;
      }
      if (!util.isArray(elems)) {
        elems = [elems];
      }
      elems = this._processElements(elems);
      Array.prototype.splice.apply(this.list, [idx, 0].concat(elems));
      for (subidx = _i = 0, _len = elems.length; _i < _len; subidx = ++_i) {
        elem = elems[subidx];
        this.emit('added', elem, idx + subidx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('addedTo', this, idx + subidx);
          }
        }
        if (elem instanceof Base) {
          (function(elem) {
            return _this.listenTo(elem, 'destroying', function() {
              return _this.remove(elem);
            });
          })(elem);
        }
      }
      return elems;
    };

    List.prototype.remove = function(which) {
      var idx;

      idx = this.list.indexOf(which);
      if (!(util.isNumber(idx) && idx >= 0)) {
        return false;
      }
      return this.removeAt(idx);
    };

    List.prototype.removeAt = function(idx) {
      var removed;

      removed = this.list.splice(idx, 1)[0];
      this.emit('removed', removed, idx);
      if (removed != null) {
        if (typeof removed.emit === "function") {
          removed.emit('removedFrom', this, idx);
        }
      }
      return removed;
    };

    List.prototype.move = function(elem, idx) {
      var oldIdx;

      oldIdx = this.list.indexOf(elem);
      if (!(oldIdx >= 0)) {
        return;
      }
      this.list.splice(oldIdx, 1);
      this.list.splice(idx, 0, elem);
      this.emit('moved', elem, idx, oldIdx);
      if (elem != null) {
        if (typeof elem.emit === "function") {
          elem.emit('movedIn', this.list, idx, oldIdx);
        }
      }
      return elem;
    };

    List.prototype.removeAll = function() {
      var elem, idx, _i, _len, _ref;

      _ref = this.list;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        elem = _ref[idx];
        this.emit('removed', elem, idx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('removedFrom', this, idx);
          }
        }
      }
      return this.list.splice(0, this.list.length);
    };

    List.prototype.at = function(idx) {
      if (idx >= 0) {
        return this.list[idx];
      } else {
        return this.list[this.list.length + idx];
      }
    };

    List.prototype.watchAt = function(idx) {
      var result;

      result = new Varying(this.at(idx));
      this.on('added', function() {
        return result.setValue(this.at(idx));
      });
      this.on('removed', function() {
        return result.setValue(this.at(idx));
      });
      return result;
    };

    List.prototype.watchLength = function() {
      var result;

      result = new Varying(this.list.length);
      this.on('added', function() {
        return result.setValue(this.list.length);
      });
      this.on('removed', function() {
        return result.setValue(this.list.length);
      });
      return result;
    };

    List.prototype.put = function() {
      var elem, elems, idx, removed, subidx, _i, _j, _len, _len1, _ref;

      idx = arguments[0], elems = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.list[idx] == null) {
        this.list[idx] = null;
        delete this.list[idx];
      }
      elems = this._processElements(elems);
      removed = (_ref = this.list).splice.apply(_ref, [idx, elems.length].concat(__slice.call(elems)));
      for (subidx = _i = 0, _len = removed.length; _i < _len; subidx = ++_i) {
        elem = removed[subidx];
        if (!(elem != null)) {
          continue;
        }
        this.emit('removed', elem, idx + subidx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('removedFrom', this, idx + subidx);
          }
        }
      }
      for (subidx = _j = 0, _len1 = elems.length; _j < _len1; subidx = ++_j) {
        elem = elems[subidx];
        this.emit('added', elem, idx + subidx);
        if (elem != null) {
          if (typeof elem.emit === "function") {
            elem.emit('addedTo', this, idx + subidx);
          }
        }
      }
      return removed;
    };

    List.prototype.putAll = function(list) {
      var elem, i, oldIdx, oldList, _i, _j, _len, _len1;

      oldList = this.list.slice();
      for (_i = 0, _len = oldList.length; _i < _len; _i++) {
        elem = oldList[_i];
        if (!(list.indexOf(elem) >= 0)) {
          this.remove(elem);
        }
      }
      for (i = _j = 0, _len1 = list.length; _j < _len1; i = ++_j) {
        elem = list[i];
        if (this.list[i] === elem) {
          continue;
        }
        oldIdx = this.list.indexOf(elem);
        if (oldIdx >= 0) {
          this.move(elem, i);
        } else {
          this.add(this._processElements([elem])[0], i);
        }
      }
      return list;
    };

    List.prototype.shadow = function() {
      var item, newArray;

      newArray = (function() {
        var _i, _len, _ref, _results;

        _ref = this.list;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item instanceof Model) {
            _results.push(item.shadow());
          } else {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
      return new this.constructor(newArray, util.extendNew(this.options, {
        parent: this
      }));
    };

    List.prototype.modified = function(deep) {
      var i, isDeep, parentValue, value, _i, _len, _ref, _ref1, _ref2;

      if (this._parent == null) {
        return false;
      }
      if (this._parent.list.length !== this.list.length) {
        return true;
      }
      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this) : deep === true;
      _ref = this.list;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        value = _ref[i];
        parentValue = this._parent.list[i];
        if (value instanceof Reference) {
          value = (_ref1 = value.value) != null ? _ref1 : value.flatValue;
        }
        if (parentValue instanceof Reference) {
          parentValue = (_ref2 = parentValue.value) != null ? _ref2 : parentValue.flatValue;
        }
        if (value instanceof Model) {
          if (__indexOf.call(value.originals(), parentValue) < 0) {
            return true;
          }
          if (isDeep === true && value.modified(deep)) {
            return true;
          }
        } else {
          if (parentValue !== value && !((parentValue == null) && (value == null))) {
            return true;
          }
        }
      }
      return false;
    };

    List.prototype.watchModified = function(deep) {
      var isDeep, _ref, _ref1,
        _this = this;

      if (this._parent == null) {
        return new Varying(false);
      }
      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this) : deep === true;
      if (isDeep === true) {
        return (_ref = this._watchModifiedDeep$) != null ? _ref : this._watchModifiedDeep$ = (function() {
          var model, react, result, uniqSubmodels, watchModel, _i, _len, _ref1;

          result = new Varying(_this.modified(deep));
          react = function() {
            return result.setValue(_this.modified(deep));
          };
          _this.on('added', react);
          _this.on('removed', react);
          _this.on('moved', react);
          watchModel = function(model) {
            return result.listenTo(model.watchModified(deep), 'changed', function(isChanged) {
              if (isChanged === true) {
                return result.setValue(true);
              } else {
                return react();
              }
            });
          };
          uniqSubmodels = _this.map(function(elem) {
            return elem;
          }).filter(function(elem) {
            return elem instanceof Model;
          }).uniq();
          _ref1 = uniqSubmodels.list;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            model = _ref1[_i];
            watchModel(model);
          }
          uniqSubmodels.on('added', function(newModel) {
            return watchModel(newModel);
          });
          uniqSubmodels.on('removed', function(oldModel) {
            return result.unlistenTo(oldModel.watchModified(deep));
          });
          return result;
        })();
      } else {
        return (_ref1 = this._watchModified$) != null ? _ref1 : this._watchModified$ = (function() {
          var react, result;

          result = new Varying(_this.modified(deep));
          react = function() {
            if (_this.list.length !== _this._parent.list.length) {
              return result.setValue(true);
            } else {
              return result.setValue(_this.modified(deep));
            }
          };
          _this.on('added', react);
          _this.on('removed', react);
          return result;
        })();
      }
    };

    List.prototype._processElements = function(elems) {
      var elem, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        if (this._parent != null) {
          if (elem instanceof Model) {
            _results.push(elem.shadow());
          } else if (elem instanceof Reference) {
            _results.push(elem.map(function(value) {
              if (value instanceof Model) {
                return value.shadow();
              } else {
                return value;
              }
            }));
          } else {
            _results.push(elem);
          }
        } else {
          _results.push(elem);
        }
      }
      return _results;
    };

    List.deserialize = function(data) {
      var datum, items;

      items = (function() {
        var _i, _len, _results;

        if ((this.modelClass != null) && (this.modelClass.prototype instanceof Model || this.modelClass.prototype instanceof OrderedCollection)) {
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            datum = data[_i];
            _results.push(this.modelClass.deserialize(datum));
          }
          return _results;
        } else {
          return data.slice();
        }
      }).call(this);
      return new this(items);
    };

    List.serialize = function(list) {
      var child, _i, _len, _ref, _results;

      _ref = list.list;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child instanceof Reference) {
          child = child.value instanceof Model ? child.value : child.flatValue;
        }
        if (child.serialize != null) {
          _results.push(child.serialize());
        } else {
          _results.push(child);
        }
      }
      return _results;
    };

    return List;

  })(OrderedCollection);

  DerivedList = (function(_super) {
    var method, _i, _len, _ref1;

    __extends(DerivedList, _super);

    function DerivedList() {
      _ref = DerivedList.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _ref1 = ['add', 'remove', 'removeAt', 'removeAll', 'put', 'putAll', 'move'];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      method = _ref1[_i];
      DerivedList.prototype["_" + method] = DerivedList.__super__[method];
      DerivedList.prototype[method] = (function() {});
    }

    DerivedList.prototype.shadow = function() {
      return this;
    };

    return DerivedList;

  })(List);

  util.extend(module.exports, {
    List: List,
    DerivedList: DerivedList
  });

}).call(this);

},{"../core/base":109,"../core/varying":111,"../model/model":117,"../model/reference":119,"../util/util":126,"./types":106}],103:[function(require,module,exports){
(function() {
  var DerivedList, List, MappedList, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('./list'), List = _ref.List, DerivedList = _ref.DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  MappedList = (function(_super) {
    __extends(MappedList, _super);

    function MappedList(parent, mapper, options) {
      var elem, _i, _len, _ref1,
        _this = this;

      this.parent = parent;
      this.mapper = mapper;
      this.options = options != null ? options : {};
      MappedList.__super__.constructor.call(this);
      this._mappers = new List();
      _ref1 = this.parent.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        this._add(elem);
      }
      this.parent.on('added', function(elem, idx) {
        return _this._add(elem, idx);
      });
      this.parent.on('removed', function(_, idx) {
        return _this._removeAt(idx);
      });
    }

    MappedList.prototype._add = function(elem, idx) {
      var mapped, wrapped,
        _this = this;

      wrapped = Varying.ly(elem);
      mapped = wrapped.map(this.mapper);
      mapped.destroyWith(wrapped);
      this._mappers.add(mapped, idx);
      mapped.on('changed', function(newValue) {
        return _this._put(_this._mappers.list.indexOf(mapped), newValue);
      });
      return MappedList.__super__._add.call(this, mapped.value, idx);
    };

    MappedList.prototype._removeAt = function(idx) {
      var _ref1;

      if ((_ref1 = this._mappers.removeAt(idx)) != null) {
        _ref1.destroy();
      }
      return MappedList.__super__._removeAt.call(this, idx);
    };

    return MappedList;

  })(DerivedList);

  util.extend(module.exports, {
    MappedList: MappedList
  });

}).call(this);

},{"../core/varying":111,"../util/util":126,"./list":102}],104:[function(require,module,exports){
(function() {
  var DerivedList, List, PartitionedList, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('./list'), List = _ref.List, DerivedList = _ref.DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  PartitionedList = (function(_super) {
    __extends(PartitionedList, _super);

    function PartitionedList(parent, partitioner, options) {
      var elem, _i, _len, _ref1,
        _this = this;

      this.parent = parent;
      this.partitioner = partitioner;
      this.options = options != null ? options : {};
      PartitionedList.__super__.constructor.call(this);
      this._partitions = {};
      _ref1 = this.parent.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        this._add(elem);
      }
      this.parent.on('added', function(elem, idx) {
        return _this._add(elem, idx);
      });
      this.parent.on('removed', function(_, idx) {
        return _this._removeAt(idx);
      });
    }

    PartitionedList.prototype._add = function(elem, idx) {};

    return PartitionedList;

  })(DerivedList);

  util.extend(module.exports, {
    PartitionedList: PartitionedList
  });

}).call(this);

},{"../core/varying":111,"../util/util":126,"./list":102}],105:[function(require,module,exports){
(function() {
  var Base, List, Set, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  List = require('./list').List;

  util = require('../util/util');

  Set = (function(_super) {
    __extends(Set, _super);

    function Set() {
      _ref = Set.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Set.prototype.has = function(elem) {
      return this.list.indexOf(elem) >= 0;
    };

    Set.prototype.add = function(elems) {
      var elem, _i, _len, _results,
        _this = this;

      if (!util.isArray(elems)) {
        elems = [elems];
      }
      _results = [];
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        if (this.has(elem)) {
          continue;
        }
        this.list.push(elem);
        this.emit('added', elem);
        if (typeof elem.emit === "function") {
          elem.emit('addedTo', this);
        }
        if (elem instanceof Base) {
          _results.push((function() {
            return _this.listenTo(elem, 'destroying', function() {
              return _this.remove(elem);
            });
          })());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Set;

  })(List);

  util.extend(module.exports, {
    Set: Set
  });

}).call(this);

},{"../core/base":109,"../util/util":126,"./list":102}],106:[function(require,module,exports){
(function() {
  var Collection, Model, OrderedCollection, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Model = require('../model/model').Model;

  util = require('../util/util');

  Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Collection.prototype.filter = function(f) {
      return new (require('./filtered-list').FilteredList)(this, f);
    };

    Collection.prototype.map = function(f) {
      return new (require('./mapped-list').MappedList)(this, f);
    };

    Collection.prototype.concat = function() {
      var lists;

      lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (util.isArray(lists[0]) && lists.length === 1) {
        lists = lists[0];
      }
      return new (require('./catted-list').CattedList)([this].concat(lists));
    };

    Collection.prototype.partition = function(f) {
      return new (require('./partitioned-list').PartitionedList)(this, f);
    };

    Collection.prototype.uniq = function() {
      return new (require('./uniq-list').UniqList)(this);
    };

    Collection.prototype.react = function(f) {
      return this.on('added', f);
    };

    Collection.prototype.reactNow = function(f) {
      var elem, _i, _len, _ref1;

      _ref1 = this.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        f(elem);
      }
      return this.on('added', f);
    };

    return Collection;

  })(Model);

  OrderedCollection = (function(_super) {
    __extends(OrderedCollection, _super);

    function OrderedCollection() {
      _ref1 = OrderedCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return OrderedCollection;

  })(Collection);

  util.extend(module.exports, {
    Collection: Collection,
    OrderedCollection: OrderedCollection
  });

}).call(this);

},{"../model/model":117,"../util/util":126,"./catted-list":97,"./filtered-list":99,"./mapped-list":103,"./partitioned-list":104,"./uniq-list":107}],107:[function(require,module,exports){
(function() {
  var DerivedList, UniqList, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  util = require('../util/util');

  UniqList = (function(_super) {
    __extends(UniqList, _super);

    function UniqList(parent, options) {
      var elem, _i, _len, _ref,
        _this = this;

      this.parent = parent;
      this.options = options != null ? options : {};
      UniqList.__super__.constructor.call(this);
      this.counts = [];
      _ref = parent.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        this._tryAdd(elem);
      }
      parent.on('added', function(elem) {
        return _this._tryAdd(elem);
      });
      parent.on('removed', function(elem) {
        return _this._tryRemove(elem);
      });
    }

    UniqList.prototype._tryAdd = function(elem) {
      var idx;

      idx = this.list.indexOf(elem);
      if (idx >= 0) {
        return this.counts[idx] += 1;
      } else {
        this.counts[this.counts.length] = 1;
        return this._add(elem);
      }
    };

    UniqList.prototype._tryRemove = function(elem) {
      var idx;

      idx = this.list.indexOf(elem);
      if (idx >= 0) {
        this.counts[idx] -= 1;
        if (this.counts[idx] === 0) {
          this.counts.splice(idx, 1);
          return this._removeAt(idx);
        }
      }
    };

    return UniqList;

  })(DerivedList);

  util.extend(module.exports, {
    UniqList: UniqList
  });

}).call(this);

},{"../util/util":126,"./list":102}],108:[function(require,module,exports){
(function() {
  var List, Model, Varying, Window, attribute, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Model = require('../model/model').Model;

  attribute = require('../model/attribute');

  List = require('./list').List;

  Varying = require('../core/varying').Varying;

  Window = (function(_super) {
    var _ref1;

    __extends(Window, _super);

    function Window() {
      _ref = Window.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Window.attribute('page', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref1 = _Class.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      _Class.prototype.values = function() {
        return this.model.watch('pageCount').map(function(count) {
          var _i, _results;

          return new List((function() {
            _results = [];
            for (var _i = 1; 1 <= count ? _i <= count : _i >= count; 1 <= count ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this));
        });
      };

      _Class.prototype["default"] = function() {
        return 1;
      };

      return _Class;

    })(attribute.EnumAttribute));

    Window.bind('pageCount').fromVarying(function() {
      return this.watch('parent').map(function(lazyList) {
        return lazyList.length();
      });
    }).and('pageSize').flatMap(function(total, pageSize) {
      return Math.ceil(total / pageSize);
    });

    Window.bind('list').fromVarying(function() {
      var range,
        _this = this;

      range = null;
      return Varying.combine([this.watch('parent'), this.watch('page'), this.watch('pageSize')], function(parent, page, pageSize) {
        if (range != null) {
          range.destroy();
        }
        return range = (parent != null) && (page != null) && (pageSize != null) ? parent.range(page * pageSize, page * pageSize + pageSize) : null;
      });
    });

    return Window;

  })(Model);

  util.extend(module.exports, {
    Window: Window
  });

}).call(this);

},{"../core/varying":111,"../model/attribute":114,"../model/model":117,"../util/util":126,"./list":102}],109:[function(require,module,exports){
(function() {
  var Base, EventEmitter, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('eventemitter2').EventEmitter2;

  util = require('../util/util');

  Base = (function(_super) {
    __extends(Base, _super);

    function Base() {
      Base.__super__.constructor.call(this, {
        delimiter: ':',
        maxListeners: 0
      });
      this.setMaxListeners(0);
      this._outwardListeners = [];
      this._id = util.uniqueId();
      null;
    }

    Base.prototype.listenTo = function(target, event, handler) {
      this._outwardListeners.push(arguments);
      if (target != null) {
        if (typeof target.on === "function") {
          target.on(event, handler);
        }
      }
      return this;
    };

    Base.prototype.unlistenTo = function(tgt) {
      var event, handler, target, _i, _len, _ref, _ref1;

      _ref = this._outwardListeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], target = _ref1[0], event = _ref1[1], handler = _ref1[2];
        if (target === tgt) {
          if (target != null) {
            if (typeof target.off === "function") {
              target.off(event, handler);
            }
          }
        }
      }
      return this;
    };

    Base.prototype.destroy = function() {
      var event, handler, target, _i, _len, _ref, _ref1;

      this.emit('destroying');
      _ref = this._outwardListeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], target = _ref1[0], event = _ref1[1], handler = _ref1[2];
        if (target != null) {
          if (typeof target.off === "function") {
            target.off(event, handler);
          }
        }
      }
      return this.removeAllListeners();
    };

    Base.prototype.destroyWith = function(other) {
      var _this = this;

      return this.listenTo(other, 'destroying', function() {
        return _this.destroy();
      });
    };

    return Base;

  })(EventEmitter);

  util.extend(module.exports, {
    Base: Base
  });

}).call(this);

},{"../util/util":126,"eventemitter2":134}],110:[function(require,module,exports){
(function() {
  var Chainer, util,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Chainer = function() {
    var InnerChain, OuterChain, params;

    params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    InnerChain = (function() {
      var param, _fn, _i, _len,
        _this = this;

      function InnerChain(parent, key, value) {
        this.parent = parent;
        this.key = key;
        this.value = value;
      }

      _fn = function(param) {
        return InnerChain.prototype[param] = function(value) {
          return new InnerChain(this, param, value);
        };
      };
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        _fn(param);
      }

      InnerChain.prototype.all = function(data) {
        if (data == null) {
          data = {};
        }
        if ((this.key != null) && (this.value != null)) {
          data[this.key] = this.value;
        }
        return this.parent.all(data);
      };

      InnerChain.prototype.get = function(key) {
        if (this.key === key) {
          return this.value;
        } else {
          return this.parent.get(key);
        }
      };

      return InnerChain;

    }).call(this);
    return OuterChain = (function(_super) {
      __extends(OuterChain, _super);

      function OuterChain() {}

      OuterChain.prototype.all = function(data) {
        return data;
      };

      OuterChain.prototype.get = null;

      return OuterChain;

    })(InnerChain);
  };

  Chainer.augment = function(proto) {
    return function() {
      var Chain, param, params, _i, _len, _results,
        _this = this;

      params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      Chain = Chainer.apply(null, params);
      _results = [];
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        _results.push((function(param) {
          return proto[param] = function(value) {
            var _ref;

            this._chain = ((_ref = this._chain) != null ? _ref : new Chain())[param](value);
            return this;
          };
        })(param));
      }
      return _results;
    };
  };

  util.extend(module.exports, {
    Chainer: Chainer
  });

}).call(this);

},{"../util/util":126}],111:[function(require,module,exports){
(function() {
  var Base, MultiVarying, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  util = require('../util/util');

  Varying = (function(_super) {
    __extends(Varying, _super);

    function Varying(value) {
      Varying.__super__.constructor.call(this);
      this.setValue(value);
    }

    Varying.prototype.setValue = function(value, force) {
      var _this = this;

      if (this._childVarying != null) {
        this.unlistenTo(this._childVarying);
        this._childVarying = null;
      }
      if (value === this) {
        value = null;
      } else if (value instanceof Varying) {
        this._childVarying = value;
        value = this._childVarying.value;
        this.listenTo(this._childVarying, 'changed', function(newValue) {
          return _this._doSetValue(newValue, true);
        });
      }
      return this._doSetValue(value, force);
    };

    Varying.prototype.map = function(f) {
      var result,
        _this = this;

      result = new Varying(f(this.value));
      result.listenTo(this, 'changed', function(value) {
        return result.setValue(f(value));
      });
      result._parent = this;
      result._mapper = f;
      return result;
    };

    Varying.prototype.react = function(f) {
      return this.on('changed', f);
    };

    Varying.prototype.reactNow = function(f) {
      f(this.value);
      return this.on('changed', f);
    };

    Varying.prototype.trace = function(name) {
      if (name == null) {
        name = this._id;
      }
      this.on('changed', function(value) {
        console.log("Varying " + name + " changed:");
        return console.log(value);
      });
      return this;
    };

    Varying.prototype.debug = function() {
      this.on('changed', function(value) {
        debugger;
      });
      return this;
    };

    Varying.prototype._doSetValue = function(value, force) {
      var oldValue;

      if (force == null) {
        force = false;
      }
      oldValue = this.value;
      if (force === true || value !== oldValue) {
        this.value = value;
        this.emit('changed', value, oldValue);
      }
      return value;
    };

    Varying.combine = function(varyings, transform) {
      return new MultiVarying(varyings, transform);
    };

    Varying.ly = function(val) {
      if (val instanceof Varying) {
        return val;
      } else {
        return new Varying(val);
      }
    };

    Varying.lie = {
      sticky: function(source, delays) {
        var lookup, result, timer;

        result = new Varying(source.value);
        result._parent = source;
        lookup = util.isFunction(delays) ? function(x) {
          return delays(x);
        } : function(x) {
          return delays[x];
        };
        timer = null;
        source.on('changed', function(newValue) {
          var delay;

          if (timer != null) {
            return;
          }
          delay = lookup(result.value);
          if (delay != null) {
            clearTimeout(timer);
            return timer = setTimeout((function() {
              timer = null;
              return result.setValue(source.value);
            }), delay);
          } else {
            return result.setValue(newValue);
          }
        });
        return result;
      }
    };

    return Varying;

  })(Base);

  MultiVarying = (function(_super) {
    __extends(MultiVarying, _super);

    function MultiVarying(varyings, flatMap) {
      var i, varying, _fn, _i, _len, _ref,
        _this = this;

      this.varyings = varyings != null ? varyings : [];
      this.flatMap = flatMap;
      MultiVarying.__super__.constructor.call(this);
      this.values = [];
      _ref = this.varyings;
      _fn = function(varying, i) {
        _this.values[i] = varying.value;
        return varying.on('changed', function(value) {
          _this.values[i] = value;
          return _this.update();
        });
      };
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        varying = _ref[i];
        _fn(varying, i);
      }
      this.update();
    }

    MultiVarying.prototype.update = function() {
      var value;

      value = this.values;
      if (this.flatMap != null) {
        value = this.flatMap.apply(this, value);
      }
      return this.setValue(value);
    };

    return MultiVarying;

  })(Varying);

  util.extend(module.exports, {
    Varying: Varying,
    MultiVarying: MultiVarying
  });

}).call(this);

},{"../core/base":109,"../util/util":126}],112:[function(require,module,exports){
var global=self;(function() {
  var janus, util, _base, _ref;

  util = require('./util/util');

  janus = (_ref = (_base = typeof window !== "undefined" && window !== null ? window : global)._janus$) != null ? _ref : _base._janus$ = {
    util: util,
    Base: require('./core/base').Base,
    Model: require('./model/model').Model,
    reference: require('./model/reference'),
    attribute: require('./model/attribute'),
    Issue: require('./model/issue').Issue,
    store: require('./model/store'),
    collection: require('./collection/collection'),
    View: require('./view/view').View,
    DomView: require('./view/dom-view').DomView,
    Templater: require('./templater/templater').Templater,
    templater: require('./templater/package'),
    Library: require('./library/library').Library,
    varying: require('./core/varying'),
    Chainer: require('./core/chain').Chainer,
    application: {
      App: require('./application/app').App,
      endpoint: require('./application/endpoint'),
      handler: require('./application/handler'),
      manifest: require('./application/manifest'),
      PageModel: require('./model/page-model').PageModel,
      PageView: require('./view/page-view').PageView,
      VaryingView: require('./view/impl/varying').VaryingView,
      ListView: require('./view/impl/list').ListView,
      listEdit: require('./view/impl/list-edit')
    }
  };

  util.extend(module.exports, janus);

  /*
          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                  Version 2, December 2004
  
  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
  
  Everyone is permitted to copy and distribute verbatim or modified
  copies of this license document, and changing it is allowed as long
  as the name is changed.
  
             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
  
   0. You just DO WHAT THE FUCK YOU WANT TO.
  */


}).call(this);

},{"./application/app":93,"./application/endpoint":94,"./application/handler":95,"./application/manifest":96,"./collection/collection":98,"./core/base":109,"./core/chain":110,"./core/varying":111,"./library/library":113,"./model/attribute":114,"./model/issue":116,"./model/model":117,"./model/page-model":118,"./model/reference":119,"./model/store":120,"./templater/package":122,"./templater/templater":123,"./util/util":126,"./view/dom-view":127,"./view/impl/list":129,"./view/impl/list-edit":128,"./view/impl/varying":130,"./view/page-view":132,"./view/view":133}],113:[function(require,module,exports){
(function() {
  var Base, Library, match, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Library = (function(_super) {
    __extends(Library, _super);

    Library.prototype._defaultContext = 'default';

    function Library(options) {
      var _base, _ref;

      this.options = options != null ? options : {};
      Library.__super__.constructor.call(this);
      this.bookcase = {};
      if ((_ref = (_base = this.options).handler) == null) {
        _base.handler = function(obj, book, options) {
          return new book(obj, util.extendNew(options.constructorOpts, {
            libraryContext: options.context
          }));
        };
      }
    }

    Library.prototype.register = function(klass, book, options) {
      var bookId, classShelf, contextShelf, _base, _name, _ref, _ref1, _ref2;

      if (options == null) {
        options = {};
      }
      bookId = Library._classId(klass);
      classShelf = (_ref = (_base = this.bookcase)[bookId]) != null ? _ref : _base[bookId] = {};
      contextShelf = (_ref1 = classShelf[_name = (_ref2 = options.context) != null ? _ref2 : 'default']) != null ? _ref1 : classShelf[_name] = [];
      contextShelf.push({
        book: book,
        options: options
      });
      if (options.priority != null) {
        contextShelf.sort(function(a, b) {
          var _ref3, _ref4;

          return ((_ref3 = b.options.priority) != null ? _ref3 : 0) - ((_ref4 = a.options.priority) != null ? _ref4 : 0);
        });
      }
      return book;
    };

    Library.prototype.get = function(obj, options) {
      var book, result, _ref, _ref1, _ref2;

      if (options == null) {
        options = {};
      }
      if (obj == null) {
        return null;
      }
      if (options.debug === true) {
        debugger;
      }
      book = (_ref = this._get(obj, obj.constructor, (_ref1 = options.context) != null ? _ref1 : this._defaultContext, options)) != null ? _ref : this._get(obj, obj.constructor, 'default', options);
      if (book != null) {
        result = ((_ref2 = options.handler) != null ? _ref2 : this.options.handler)(obj, book, options);
        this.emit('got', result, obj, book, options);
      } else {
        this.emit('missed', obj, options);
      }
      return result != null ? result : null;
    };

    Library.prototype._get = function(obj, klass, context, options) {
      var bookId, contextShelf, record, _i, _len, _ref;

      bookId = util.isNumber(obj) ? 'number' : util.isString(obj) ? 'string' : util.isFunction(obj) ? 'function' : obj === true || obj === false ? 'boolean' : Library._classId(klass);
      contextShelf = (_ref = this.bookcase[bookId]) != null ? _ref[context] : void 0;
      if (contextShelf != null) {
        for (_i = 0, _len = contextShelf.length; _i < _len; _i++) {
          record = contextShelf[_i];
          if (match(obj, record, options.attributes)) {
            return record.book;
          }
        }
      }
      if (klass.__super__ != null) {
        return this._get(obj, klass.__super__.constructor, context, options);
      }
    };

    Library.prototype.newEventBindings = function() {
      var newLibrary;

      newLibrary = Object.create(this);
      newLibrary._events = {};
      return newLibrary;
    };

    Library.classKey = "__janus_classId" + (new Date().getTime());

    Library.classMap = {};

    Library._classId = function(klass) {
      var id;

      if (klass === Number) {
        return 'number';
      } else if (klass === String) {
        return 'string';
      } else if (klass === Function) {
        return 'function';
      } else if (klass === Boolean) {
        return 'boolean';
      } else {
        id = klass[this.classKey];
        if ((id != null) && this.classMap[id] === klass) {
          return klass[this.classKey];
        } else {
          id = util.uniqueId();
          this.classMap[id] = klass;
          return klass[this.classKey] = id;
        }
      }
    };

    return Library;

  })(Base);

  match = function(obj, record, attributes) {
    var isMatch, _base;

    if ((typeof (_base = record.options).rejector === "function" ? _base.rejector(obj) : void 0) === true) {
      return false;
    }
    if ((record.options.acceptor != null) && (record.options.acceptor(obj) !== true)) {
      return false;
    }
    isMatch = true;
    if (attributes) {
      util.traverse(attributes, function(subpath, value) {
        if (util.deepGet(record.options.attributes, subpath) !== value) {
          return isMatch = false;
        }
      });
    }
    return isMatch;
  };

  util.extend(module.exports, {
    Library: Library
  });

}).call(this);

},{"../core/base":109,"../util/util":126}],114:[function(require,module,exports){
(function() {
  var Attribute, BooleanAttribute, CollectionAttribute, DateAttribute, EnumAttribute, List, Model, ModelAttribute, NumberAttribute, ObjectAttribute, ShellModel, TextAttribute, Varying, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Model = require('./model').Model;

  Varying = require('../core/varying').Varying;

  List = require('../collection/list').List;

  Attribute = (function(_super) {
    __extends(Attribute, _super);

    function Attribute(model, key) {
      this.model = model;
      this.key = key;
      Attribute.__super__.constructor.call(this);
      if (this.model == null) {
        this.model = new ShellModel(this);
      }
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    Attribute.prototype.setValue = function(value) {
      return this.model.set(this.key, value);
    };

    Attribute.prototype.unsetValue = function() {
      return this.model.unset(this.key);
    };

    Attribute.prototype.getValue = function() {
      var value;

      value = this.model.get(this.key, true);
      if ((value == null) && (this["default"] != null)) {
        value = this["default"]();
        if (this.writeDefault === true) {
          this.setValue(value);
        }
      }
      return value;
    };

    Attribute.prototype.watchValue = function() {
      return this.model.watch(this.key);
    };

    Attribute.prototype["default"] = function() {};

    Attribute.prototype.writeDefault = false;

    Attribute.prototype.transient = false;

    Attribute.deserialize = function(data) {
      return data;
    };

    Attribute.prototype.serialize = function() {
      if (this.transient !== true) {
        return this.getValue();
      }
    };

    return Attribute;

  })(Model);

  TextAttribute = (function(_super) {
    __extends(TextAttribute, _super);

    function TextAttribute() {
      _ref = TextAttribute.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return TextAttribute;

  })(Attribute);

  ObjectAttribute = (function(_super) {
    __extends(ObjectAttribute, _super);

    function ObjectAttribute() {
      _ref1 = ObjectAttribute.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return ObjectAttribute;

  })(Attribute);

  EnumAttribute = (function(_super) {
    __extends(EnumAttribute, _super);

    function EnumAttribute() {
      _ref2 = EnumAttribute.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    EnumAttribute.prototype.values = function() {
      return new List([]);
    };

    EnumAttribute.prototype.nullable = false;

    return EnumAttribute;

  })(Attribute);

  NumberAttribute = (function(_super) {
    __extends(NumberAttribute, _super);

    function NumberAttribute() {
      _ref3 = NumberAttribute.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    return NumberAttribute;

  })(Attribute);

  BooleanAttribute = (function(_super) {
    __extends(BooleanAttribute, _super);

    function BooleanAttribute() {
      _ref4 = BooleanAttribute.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    return BooleanAttribute;

  })(Attribute);

  DateAttribute = (function(_super) {
    __extends(DateAttribute, _super);

    function DateAttribute() {
      _ref5 = DateAttribute.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    DateAttribute.deserialize = function(data) {
      return new Date(data);
    };

    return DateAttribute;

  })(Attribute);

  ModelAttribute = (function(_super) {
    __extends(ModelAttribute, _super);

    function ModelAttribute() {
      _ref6 = ModelAttribute.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    ModelAttribute.modelClass = Model;

    ModelAttribute.deserialize = function(data) {
      return this.modelClass.deserialize(data);
    };

    ModelAttribute.prototype.serialize = function() {
      if (this.transient !== true) {
        return this.constructor.modelClass.serialize(this.getValue());
      }
    };

    return ModelAttribute;

  })(Attribute);

  CollectionAttribute = (function(_super) {
    __extends(CollectionAttribute, _super);

    function CollectionAttribute() {
      _ref7 = CollectionAttribute.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    CollectionAttribute.collectionClass = Array;

    CollectionAttribute.deserialize = function(data) {
      return this.collectionClass.deserialize(data);
    };

    CollectionAttribute.prototype.serialize = function() {
      if (this.transient !== true) {
        return this.constructor.collectionClass.serialize(this.getValue());
      }
    };

    return CollectionAttribute;

  })(Attribute);

  ShellModel = (function() {
    function ShellModel(attribute) {
      this.attribute = attribute;
    }

    ShellModel.prototype.get = function() {
      if (this._value != null) {
        return this._value;
      } else if (this.attribute["default"] != null) {
        return this.attribute["default"]();
      } else {
        return null;
      }
    };

    ShellModel.prototype.set = function(_, value) {
      var _ref8;

      this._value = value;
      return (_ref8 = this._watcher) != null ? _ref8.setValue(value) : void 0;
    };

    ShellModel.prototype.watch = function() {
      var _ref8;

      return (_ref8 = this._watcher) != null ? _ref8 : this._watcher = new Varying(this._value);
    };

    return ShellModel;

  })();

  util.extend(module.exports, {
    Attribute: Attribute,
    TextAttribute: TextAttribute,
    ObjectAttribute: ObjectAttribute,
    EnumAttribute: EnumAttribute,
    NumberAttribute: NumberAttribute,
    BooleanAttribute: BooleanAttribute,
    DateAttribute: DateAttribute,
    ModelAttribute: ModelAttribute,
    CollectionAttribute: CollectionAttribute,
    ShellModel: ShellModel
  });

}).call(this);

},{"../collection/list":102,"../core/varying":111,"../util/util":126,"./model":117}],115:[function(require,module,exports){
(function() {
  var Base, Binder, MultiVarying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  util = require('../util/util');

  Base = require('../core/base');

  MultiVarying = require('../core/varying').MultiVarying;

  Binder = (function(_super) {
    __extends(Binder, _super);

    function Binder(key) {
      this._key = key;
      this._generators = [];
    }

    Binder.prototype.from = function() {
      var path;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._generators.push(function() {
        var next;

        next = function(idx) {
          return function(result) {
            if (path[idx + 1] != null) {
              return result != null ? result.watch(path[idx]).map(next(idx + 1)) : void 0;
            } else {
              return result != null ? result.watch(path[idx]) : void 0;
            }
          };
        };
        return next(0)(this._model);
      });
      return this;
    };

    Binder.prototype.fromVarying = function(f) {
      this._generators.push(function() {
        return f.call(this._model);
      });
      return this;
    };

    Binder.prototype.and = Binder.prototype.from;

    Binder.prototype.andVarying = Binder.prototype.fromVarying;

    Binder.prototype.flatMap = function(f) {
      this._flatMap = f;
      return this;
    };

    Binder.prototype.fallback = function(fallback) {
      this._fallback = fallback;
      return this;
    };

    Binder.prototype.asDefault = function() {
      this._defaultOnly = true;
      return this;
    };

    Binder.prototype.bind = function(model) {
      var bound;

      bound = Object.create(this);
      bound._model = model;
      if (this._defaultOnly === true && (model.get(this._key) != null)) {
        return;
      }
      bound.apply();
      return bound;
    };

    Binder.prototype.apply = function() {
      var data, _ref,
        _this = this;

      if ((_ref = this._varying) != null) {
        _ref.destroy();
      }
      return this._varying = new MultiVarying((function() {
        var _i, _len, _ref1, _results;

        _ref1 = this._generators;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          data = _ref1[_i];
          _results.push(data.call(this));
        }
        return _results;
      }).call(this), function() {
        var result, values;

        values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        result = util.isFunction(_this._flatMap) ? _this._flatMap.apply(_this._model, values) : values.length === 1 ? values[0] : values;
        if (result == null) {
          result = _this._fallback;
        }
        return _this._model.set(_this._key, result);
      });
    };

    return Binder;

  })(Base);

  util.extend(module.exports, {
    Binder: Binder
  });

}).call(this);

},{"../core/base":109,"../core/varying":111,"../util/util":126}],116:[function(require,module,exports){
(function() {
  var Base, Issue, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  Issue = (function(_super) {
    __extends(Issue, _super);

    function Issue(_arg) {
      var active, message, severity, target, _ref;

      _ref = _arg != null ? _arg : {}, active = _ref.active, severity = _ref.severity, message = _ref.message, target = _ref.target;
      this.active = Varying.ly(active != null ? active : false);
      this.severity = Varying.ly(severity != null ? severity : 0);
      this.message = Varying.ly(message != null ? message : '');
      this.target = Varying.ly(target);
    }

    return Issue;

  })(Base);

  util.extend(module.exports, {
    Issue: Issue
  });

}).call(this);

},{"../core/base":109,"../core/varying":111,"../util/util":126}],117:[function(require,module,exports){
(function() {
  var Base, Binder, Model, Null, NullClass, Reference, Resolver, Varying, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Base = require('../core/base').Base;

  Varying = require('../core/varying').Varying;

  _ref = require('./reference'), Reference = _ref.Reference, Resolver = _ref.Resolver;

  util = require('../util/util');

  Binder = require('./binder').Binder;

  NullClass = (function() {
    function NullClass() {}

    return NullClass;

  })();

  Null = new NullClass();

  Model = (function(_super) {
    __extends(Model, _super);

    function Model(attributes, options) {
      if (attributes == null) {
        attributes = {};
      }
      this.options = options != null ? options : {};
      Model.__super__.constructor.call(this);
      this.attributes = {};
      this._attributes = {};
      this._watches = {};
      this._parent = this.options.parent;
      if (typeof this._preinitialize === "function") {
        this._preinitialize();
      }
      this.set(attributes);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
      this._bind();
    }

    Model.prototype.get = function(key, bypassAttribute) {
      var attribute, mappedValue, value, _ref1;

      if (bypassAttribute == null) {
        bypassAttribute = false;
      }
      value = util.deepGet(this.attributes, key);
      if (value == null) {
        value = (_ref1 = this._parent) != null ? _ref1.get(key) : void 0;
        if (value instanceof Model) {
          value = this.set(key, value.shadow());
        } else if (value instanceof Reference) {
          mappedValue = value.map(function(inner) {
            if (inner instanceof Model) {
              return inner.shadow();
            } else {
              return inner;
            }
          });
          value = this.set(key, mappedValue);
        }
      }
      if ((value == null) && bypassAttribute === false) {
        attribute = this.attribute(key);
        value = attribute != null ? attribute.writeDefault === true ? this.set(key, attribute["default"]()) : attribute["default"]() : void 0;
      }
      if (value == null) {
        value = null;
      }
      if (value === Null) {
        return null;
      } else {
        return value;
      }
    };

    Model.prototype.set = function() {
      var args, key, oldValue, value,
        _this = this;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length === 1 && util.isPlainObject(args[0])) {
        return util.traverse(args[0], function(path, value) {
          return _this.set(path, value);
        });
      } else if (args.length === 2) {
        key = args[0], value = args[1];
        oldValue = util.deepGet(this.attributes, key);
        if (oldValue === value) {
          return value;
        }
        util.deepSet(this.attributes, key)(value === Null ? null : value);
        this._emitChange(key, value, oldValue);
        return value;
      }
    };

    Model.prototype.unset = function(key) {
      var oldValue;

      if (this._parent != null) {
        oldValue = this.get(key);
        util.deepSet(this.attributes, key)(Null);
        if (oldValue !== null) {
          this._emitChange(key, null, oldValue);
        }
      } else {
        this._deleteAttr(key);
      }
      return oldValue;
    };

    Model.prototype.setAll = function(attrs) {
      var _this = this;

      util.traverseAll(this.attributes, function(path, value) {
        if (util.deepGet(attrs, path) == null) {
          return _this.unset(path.join('.'));
        }
      });
      this.set(attrs);
      return null;
    };

    Model.prototype.watch = function(key) {
      var _base, _ref1,
        _this = this;

      return (_ref1 = (_base = this._watches)[key]) != null ? _ref1 : _base[key] = (function() {
        var varying;

        varying = new Varying(_this.get(key));
        if (_this._parent != null) {
          varying.listenTo(_this._parent, "changed:" + key, function() {
            return varying.setValue(_this.get(key));
          });
        }
        return varying.listenTo(_this, "changed:" + key, function(newValue) {
          return varying.setValue(newValue);
        });
      })();
    };

    Model.prototype.watchAll = function() {
      var varying,
        _this = this;

      varying = new Varying(this);
      return varying.listenTo(this, 'anyChanged', function() {
        return varying.setValue(_this, true);
      });
    };

    Model.attributes = function() {
      if (this._attributesAgainst !== this) {
        this._attributesAgainst = this;
        this._attributes = {};
      }
      return this._attributes;
    };

    Model.allAttributes = function() {
      var attrs, recurse,
        _this = this;

      attrs = {};
      recurse = function(obj) {
        var attr, key, _ref1;

        if (obj.attributes == null) {
          return;
        }
        if (obj.__super__ != null) {
          recurse(obj.__super__.constructor);
        }
        _ref1 = obj.attributes();
        for (key in _ref1) {
          attr = _ref1[key];
          attrs[key] = attr;
        }
        return null;
      };
      recurse(this);
      return attrs;
    };

    Model.attribute = function(key, attribute) {
      return this.attributes()[key] = attribute;
    };

    Model.prototype.attribute = function(key) {
      var recurse, _base, _ref1,
        _this = this;

      recurse = function(obj) {
        var result, _base;

        if (obj.attributes == null) {
          return;
        }
        result = typeof (_base = (obj.attributes()[key])) === "function" ? new _base(_this, key) : void 0;
        if (result != null) {
          return result;
        } else if (obj.__super__ != null) {
          return recurse(obj.__super__.constructor);
        }
      };
      if (util.isArray(key)) {
        key = key.join('.');
      }
      return (_ref1 = (_base = this._attributes)[key]) != null ? _ref1 : _base[key] = recurse(this.constructor);
    };

    Model.prototype.attributeClass = function(key) {
      return this.constructor.attributes()[key];
    };

    Model.prototype.allAttributes = function() {
      var key, _results;

      _results = [];
      for (key in this.constructor.allAttributes()) {
        _results.push(this.attribute(key));
      }
      return _results;
    };

    Model.binders = function() {
      if (this._bindersAgainst !== this) {
        this._bindersAgainst = this;
        this._binders = [];
      }
      return this._binders;
    };

    Model.bind = function(key) {
      var binder;

      binder = new Binder(key);
      this.binders().push(binder);
      return binder;
    };

    Model.prototype._bind = function() {
      var recurse,
        _this = this;

      this._binders = {};
      recurse = function(obj) {
        var binder, _i, _len, _ref1;

        _ref1 = obj.binders();
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binder = _ref1[_i];
          if (_this._binders[binder._key] == null) {
            _this._binders[binder._key] = binder.bind(_this);
          }
        }
        if ((obj.__super__ != null) && (obj.__super__.constructor.binders != null)) {
          recurse(obj.__super__.constructor);
        }
        return null;
      };
      recurse(this.constructor);
      return null;
    };

    Model.prototype.rebind = function(key) {
      var _ref1;

      return (_ref1 = this._binders[key]) != null ? _ref1.apply() : void 0;
    };

    Model.prototype.revert = function(key) {
      if (this._parent == null) {
        return;
      }
      return this._deleteAttr(key);
    };

    Model.prototype.shadow = function() {
      return new this.constructor({}, util.extendNew(this.options, {
        parent: this
      }));
    };

    Model.prototype.modified = function(deep) {
      var result,
        _this = this;

      if (deep == null) {
        deep = true;
      }
      if (this._parent == null) {
        return false;
      }
      result = false;
      util.traverse(this.attributes, function(path) {
        if (_this.attrModified(path, deep)) {
          return result = true;
        }
      });
      return result;
    };

    Model.prototype.attrModified = function(path, deep) {
      var attribute, isDeep, parentValue, transient, value, _ref1, _ref2;

      if (this._parent == null) {
        return false;
      }
      value = util.deepGet(this.attributes, path);
      if (value == null) {
        return false;
      }
      if (value === Null) {
        value = null;
      }
      if (value instanceof Reference) {
        value = (_ref1 = value.value) != null ? _ref1 : value.flatValue;
      }
      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this, path, value) : deep === true;
      attribute = this.attribute(path);
      transient = (attribute != null) && attribute.transient === true;
      if (!transient) {
        parentValue = this._parent.get(path);
        if (parentValue instanceof Reference) {
          parentValue = (_ref2 = parentValue.value) != null ? _ref2 : parentValue.flatValue;
        }
        if (value instanceof Model) {
          if (isDeep === true) {
            return value.modified(deep);
          } else {
            return !(__indexOf.call(value.originals(), parentValue) >= 0);
          }
        } else {
          return parentValue !== value && !((parentValue == null) && (value == null));
        }
      } else {
        return false;
      }
    };

    Model.prototype.watchModified = function(deep) {
      var isDeep, _ref1, _ref2,
        _this = this;

      isDeep = deep == null ? true : util.isFunction(deep) ? deep(this) : deep === true;
      if (isDeep === true) {
        return (_ref1 = this._watchModifiedDeep$) != null ? _ref1 : this._watchModifiedDeep$ = (function() {
          var model, result, uniqSubmodels, watchModel, _i, _len, _ref2;

          if (_this._watchModifiedDeep$init === true) {
            return;
          }
          _this._watchModifiedDeep$init = true;
          result = new Varying(_this.modified(deep));
          _this.on('anyChanged', function(path) {
            if (_this.attrModified(path, deep)) {
              return result.setValue(true);
            } else {
              return result.setValue(_this.modified(deep));
            }
          });
          watchModel = function(model) {
            return result.listenTo(model.watchModified(deep), 'changed', function(isChanged) {
              if (isChanged === true) {
                return result.setValue(true);
              } else {
                return result.setValue(_this.modified(deep));
              }
            });
          };
          uniqSubmodels = _this._submodels().uniq();
          _ref2 = uniqSubmodels.list;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            model = _ref2[_i];
            watchModel(model);
          }
          uniqSubmodels.on('added', function(newModel) {
            return watchModel(newModel);
          });
          uniqSubmodels.on('removed', function(oldModel) {
            return result.unlistenTo(oldModel.watchModified(deep));
          });
          return result;
        })();
      } else {
        return (_ref2 = this._watchModified$) != null ? _ref2 : this._watchModified$ = (function() {
          var result;

          result = new Varying(_this.modified(deep));
          _this.on('anyChanged', function(path) {
            if (_this.attrModified(path, deep)) {
              return result.setValue(true);
            } else {
              return result.setValue(_this.modified(deep));
            }
          });
          return result;
        })();
      }
    };

    Model.prototype.original = function() {
      var _ref1, _ref2;

      return (_ref1 = (_ref2 = this._parent) != null ? _ref2.original() : void 0) != null ? _ref1 : this;
    };

    Model.prototype.originals = function() {
      var cur, _results;

      cur = this;
      _results = [];
      while (cur._parent != null) {
        _results.push(cur = cur._parent);
      }
      return _results;
    };

    Model.prototype.merge = function() {
      var _ref1;

      if ((_ref1 = this._parent) != null) {
        _ref1.set(this.attributes);
      }
      return null;
    };

    Model.prototype.issues = function() {
      var _ref1,
        _this = this;

      return (_ref1 = this.issues$) != null ? _ref1 : this.issues$ = (function() {
        var attr, issueList;

        issueList = (function() {
          var _i, _len, _ref2, _results;

          _ref2 = this.allAttributes();
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            attr = _ref2[_i];
            if (attr.issues != null) {
              _results.push(attr.issues());
            }
          }
          return _results;
        }).call(_this);
        if (_this._issues != null) {
          issueList.unshift(_this._issues());
        }
        return (new (require('../collection/collection').CattedList)(issueList)).filter(function(issue) {
          return issue.active;
        });
      })();
    };

    Model.prototype.valid = function(severity) {
      if (severity == null) {
        severity = 0;
      }
      return this.issues().filter(function(issue) {
        return issue.severity.map(function(issueSev) {
          return issueSev <= severity;
        });
      }).watchLength().map(function(length) {
        return length === 0;
      });
    };

    Model.deserialize = function(data) {
      var attribute, key, prop, _ref1;

      _ref1 = this.allAttributes();
      for (key in _ref1) {
        attribute = _ref1[key];
        prop = util.deepGet(data, key);
        if (prop != null) {
          util.deepSet(data, key)(attribute.deserialize(prop));
        }
      }
      return new this(data);
    };

    Model.serialize = function(model, opts) {
      var result, walkAttrs,
        _this = this;

      if (opts == null) {
        opts = {};
      }
      walkAttrs = function(keys, src, target) {
        var attribute, innerResult, result, strKey, subKey, thisKey, value, _ref1;

        for (subKey in src) {
          value = src[subKey];
          thisKey = keys.concat([subKey]);
          strKey = thisKey.join('.');
          attribute = model.attribute(strKey);
          result = value === Null ? void 0 : (attribute != null) && (attribute.serialize != null) ? attribute.serialize(opts) : util.isPlainObject(value) ? (innerResult = (_ref1 = target[subKey]) != null ? _ref1 : {}, walkAttrs(thisKey, value, innerResult), innerResult) : value;
          if (result instanceof Reference) {
            result = result.flatValue;
          }
          target[subKey] = result;
        }
        return target;
      };
      result = model._parent != null ? Model.serialize(model._parent, opts) : {};
      walkAttrs([], model.attributes, result);
      return result;
    };

    Model.prototype.serialize = function() {
      return this.constructor.serialize(this);
    };

    Model.prototype._deleteAttr = function(key) {
      var _this = this;

      return util.deepSet(this.attributes, key)(function(obj, subkey) {
        var newValue, oldValue;

        if (obj == null) {
          return;
        }
        oldValue = obj[subkey];
        delete obj[subkey];
        newValue = _this.get(key);
        if (newValue !== oldValue) {
          _this._emitChange(key, newValue, oldValue);
        }
        return oldValue;
      });
    };

    Model.prototype._emitChange = function(key, newValue, oldValue) {
      var emit, parts,
        _this = this;

      parts = util.isArray(key) ? key : key.split('.');
      if (oldValue instanceof Model) {
        this._submodels().remove(oldValue);
      }
      if (newValue instanceof Model) {
        this._submodels().add(newValue);
      }
      emit = function(name, partKey) {
        return _this.emit("" + name + ":" + partKey, newValue, oldValue, partKey);
      };
      emit('changed', parts.join('.'));
      while (parts.length > 1) {
        parts.pop();
        emit('subKeyChanged', parts.join('.'));
      }
      this.emit('anyChanged', key, newValue, oldValue);
      return null;
    };

    Model.prototype._submodels = function() {
      var _ref1;

      return (_ref1 = this._submodels$) != null ? _ref1 : this._submodels$ = new (require('../collection/list').List)();
    };

    return Model;

  })(Base);

  util.extend(module.exports, {
    Model: Model
  });

}).call(this);

},{"../collection/collection":98,"../collection/list":102,"../core/base":109,"../core/varying":111,"../util/util":126,"./binder":115,"./reference":119}],118:[function(require,module,exports){
(function() {
  var Model, PageModel, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Model = require('./model').Model;

  PageModel = (function(_super) {
    __extends(PageModel, _super);

    function PageModel() {
      _ref = PageModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PageModel.prototype.resolve = function() {
      return this._render();
    };

    PageModel.prototype._render = function() {};

    return PageModel;

  })(Model);

  util.extend(module.exports, {
    PageModel: PageModel
  });

}).call(this);

},{"../util/util":126,"./model":117}],119:[function(require,module,exports){
(function() {
  var ModelReference, ModelResolver, Reference, RequestReference, RequestResolver, Resolver, Varying, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  Resolver = (function() {
    function Resolver(parent, value, options) {
      this.parent = parent;
      this.value = value;
      this.options = options != null ? options : {};
    }

    Resolver.prototype.resolve = function() {
      return this.parent.setValue(this.value);
    };

    Resolver.prototype.get = function() {};

    Resolver.prototype.watch = function(key) {
      return this.parent.watch(key);
    };

    Resolver.prototype.watchAll = function() {
      return this.parent.watchAll();
    };

    return Resolver;

  })();

  Reference = (function(_super) {
    __extends(Reference, _super);

    Reference.resolverClass = Resolver;

    function Reference(inner, flatValue, options) {
      this.inner = inner;
      this.flatValue = flatValue;
      this.options = options != null ? options : {};
      Reference.__super__.constructor.call(this, this._resolver());
    }

    Reference.prototype._resolver = function() {
      return new this.constructor.resolverClass(this, this.inner, this.options);
    };

    Reference.prototype.map = function(f) {
      var result;

      result = new this.constructor(this.inner, this.flatValue, this.options);
      this.reactNow(function(val) {
        return result.setValue(f(val));
      });
      result._parent = this;
      result._mapper = f;
      return result;
    };

    Reference.prototype.get = function() {};

    Reference.prototype.watch = function(key) {
      return this.map(function(val) {
        if (val instanceof require('./model').Model) {
          return val.watch(key);
        } else if (val instanceof Resolver) {
          return null;
        } else {
          return val;
        }
      });
    };

    Reference.prototype.watchAll = function() {
      return this.map(function(val) {
        if (val instanceof require('./model').Model) {
          return val.watchAll();
        } else {
          return null;
        }
      });
    };

    return Reference;

  })(Varying);

  RequestResolver = (function(_super) {
    __extends(RequestResolver, _super);

    function RequestResolver(parent, request, options) {
      var _base, _ref;

      this.parent = parent;
      this.request = request;
      this.options = options != null ? options : {};
      if ((_ref = (_base = this.options).map) == null) {
        _base.map = function(request) {
          return request.map(function(result) {
            return result.successOrElse(null);
          });
        };
      }
    }

    RequestResolver.prototype.resolve = function(app) {
      var store;

      store = app.getStore(this.request);
      if (store != null) {
        store.handle();
        return this.parent.setValue(this.options.map(this.request));
      } else {
        return this.parent.setValue(null);
      }
    };

    return RequestResolver;

  })(Resolver);

  RequestReference = (function(_super) {
    __extends(RequestReference, _super);

    function RequestReference() {
      _ref = RequestReference.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RequestReference.resolverClass = RequestResolver;

    return RequestReference;

  })(Reference);

  ModelResolver = (function(_super) {
    __extends(ModelResolver, _super);

    function ModelResolver(parent, map, options) {
      this.parent = parent;
      this.map = map;
      this.options = options != null ? options : {};
    }

    ModelResolver.prototype.resolve = function(model) {
      return this.parent.setValue(this.map(model));
    };

    return ModelResolver;

  })(Resolver);

  ModelReference = (function(_super) {
    __extends(ModelReference, _super);

    function ModelReference() {
      _ref1 = ModelReference.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ModelReference.resolverClass = ModelResolver;

    return ModelReference;

  })(Reference);

  util.extend(module.exports, {
    Reference: Reference,
    RequestReference: RequestReference,
    ModelReference: ModelReference,
    Resolver: Resolver,
    RequestResolver: RequestResolver,
    ModelResolver: ModelResolver
  });

}).call(this);

},{"../core/varying":111,"../util/util":126,"./model":117}],120:[function(require,module,exports){
(function() {
  var Base, CompleteState, CreateRequest, DeleteRequest, ErrorState, FetchRequest, InitState, List, MemoryCacheStore, Model, OnPageCacheStore, OneOfStore, PendingState, ProgressState, Request, RequestState, ServiceErrorState, Store, SuccessState, UpdateRequest, UserErrorState, Varying, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  Base = require('../core/base').Base;

  Model = require('../model/model').Model;

  List = require('../collection/list').List;

  Varying = require('../core/varying').Varying;

  RequestState = (function() {
    function RequestState() {}

    RequestState.prototype.flatSuccess = function() {
      return this;
    };

    RequestState.prototype.successOrElse = function(x) {
      if (util.isFunction(x)) {
        return x(this);
      } else {
        return x;
      }
    };

    return RequestState;

  })();

  InitState = (function(_super) {
    __extends(InitState, _super);

    function InitState() {
      _ref = InitState.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return InitState;

  })(RequestState);

  PendingState = (function(_super) {
    __extends(PendingState, _super);

    function PendingState() {
      _ref1 = PendingState.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return PendingState;

  })(RequestState);

  ProgressState = (function(_super) {
    __extends(ProgressState, _super);

    function ProgressState(progress) {
      this.progress = progress;
    }

    ProgressState.prototype.map = function(f) {
      return new ProgressState(f(this.progress));
    };

    return ProgressState;

  })(PendingState);

  CompleteState = (function(_super) {
    __extends(CompleteState, _super);

    function CompleteState(result) {
      this.result = result;
    }

    CompleteState.prototype.map = function(f) {
      return new CompleteState(f(this.error));
    };

    return CompleteState;

  })(RequestState);

  SuccessState = (function(_super) {
    __extends(SuccessState, _super);

    function SuccessState(result) {
      this.result = result;
    }

    SuccessState.prototype.map = function(f) {
      return new SuccessState(f(this.result));
    };

    SuccessState.prototype.flatSuccess = function() {
      return this.result;
    };

    SuccessState.prototype.successOrElse = function() {
      return this.result;
    };

    return SuccessState;

  })(CompleteState);

  ErrorState = (function(_super) {
    __extends(ErrorState, _super);

    function ErrorState(error) {
      this.error = error;
    }

    ErrorState.prototype.map = function(f) {
      return new ErrorState(f(this.error));
    };

    return ErrorState;

  })(CompleteState);

  UserErrorState = (function(_super) {
    __extends(UserErrorState, _super);

    function UserErrorState() {
      _ref2 = UserErrorState.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    return UserErrorState;

  })(ErrorState);

  ServiceErrorState = (function(_super) {
    __extends(ServiceErrorState, _super);

    function ServiceErrorState() {
      _ref3 = ServiceErrorState.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    return ServiceErrorState;

  })(ErrorState);

  Request = (function(_super) {
    __extends(Request, _super);

    function Request(options) {
      this.options = options != null ? options : {};
      Request.__super__.constructor.call(this);
      this.value = Request.state.Init;
    }

    Request.prototype.signature = function() {};

    Request.prototype.setValue = function(response) {
      return Request.__super__.setValue.call(this, this.deserialize(response));
    };

    Request.prototype.deserialize = function(response) {
      var _this = this;

      if (response instanceof Request.state.type.Success) {
        return response.map(function(data) {
          return _this.constructor.modelClass.deserialize(data);
        });
      } else {
        return response;
      }
    };

    Request.modelClass = Model;

    Request.state = {
      Init: new InitState(),
      Pending: new PendingState(),
      Progress: function(progress) {
        return new ProgressState(progress);
      },
      Complete: function(result) {
        return new CompleteState(result);
      },
      Success: function(result) {
        return new SuccessState(result);
      },
      Error: function(error) {
        return new ErrorState(error);
      },
      UserError: function(error) {
        return new UserErrorState(error);
      },
      ServiceError: function(error) {
        return new ServiceErrorState(error);
      },
      type: {
        Init: InitState,
        Pending: PendingState,
        Progress: ProgressState,
        Complete: CompleteState,
        Success: SuccessState,
        Error: ErrorState,
        UserError: UserErrorState,
        ServiceError: ServiceErrorState
      }
    };

    return Request;

  })(Varying);

  Store = (function(_super) {
    __extends(Store, _super);

    function Store(request, options) {
      this.request = request;
      this.options = options != null ? options : {};
      Store.__super__.constructor.call(this);
    }

    Store.prototype.handle = function() {
      var handled;

      handled = this._handle();
      if (handled === Store.Handled) {
        this.emit('requesting', this.request);
        this.request.emit('requesting', this);
      }
      return handled;
    };

    Store.Handled = {};

    Store.Unhandled = {};

    return Store;

  })(Base);

  FetchRequest = (function(_super) {
    __extends(FetchRequest, _super);

    function FetchRequest() {
      _ref4 = FetchRequest.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    return FetchRequest;

  })(Request);

  CreateRequest = (function(_super) {
    __extends(CreateRequest, _super);

    function CreateRequest() {
      _ref5 = CreateRequest.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    return CreateRequest;

  })(Request);

  UpdateRequest = (function(_super) {
    __extends(UpdateRequest, _super);

    function UpdateRequest() {
      _ref6 = UpdateRequest.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    return UpdateRequest;

  })(Request);

  DeleteRequest = (function(_super) {
    __extends(DeleteRequest, _super);

    function DeleteRequest() {
      _ref7 = DeleteRequest.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    return DeleteRequest;

  })(Request);

  OneOfStore = (function(_super) {
    __extends(OneOfStore, _super);

    function OneOfStore(request, maybeStores, options) {
      this.request = request;
      this.maybeStores = maybeStores != null ? maybeStores : [];
      this.options = options != null ? options : {};
      OneOfStore.__super__.constructor.call(this, this.request, this.options);
    }

    OneOfStore.prototype._handle = function() {
      var handled, maybeStore, _i, _len, _ref8;

      handled = Store.Unhandled;
      _ref8 = this.maybeStores;
      for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
        maybeStore = _ref8[_i];
        if (handled !== Store.Handled) {
          handled = maybeStore.handle(this.request);
        }
      }
      if (handled === Store.Unhandled) {
        request.setValue(Request.state.Error("No handler was available!"));
      }
      return handled;
    };

    return OneOfStore;

  })(Store);

  MemoryCacheStore = (function(_super) {
    __extends(MemoryCacheStore, _super);

    function MemoryCacheStore() {
      MemoryCacheStore.__super__.constructor.call(this);
    }

    MemoryCacheStore.prototype._cache = function() {
      var _ref8;

      return (_ref8 = this._cache$) != null ? _ref8 : this._cache$ = {};
    };

    MemoryCacheStore.prototype._invalidates = function() {
      var _ref8;

      return (_ref8 = this._invalidates$) != null ? _ref8 : this._invalidates$ = new List();
    };

    MemoryCacheStore.prototype.handle = function(request) {
      var after, cached, hit, signature, _i, _len, _ref8,
        _this = this;

      signature = request.signature();
      if ((request instanceof CreateRequest) || (request instanceof UpdateRequest) || (request instanceof DeleteRequest)) {
        _ref8 = this._invalidates().list.slice();
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          cached = _ref8[_i];
          if (!(cached.invalidate(request))) {
            continue;
          }
          delete this._cache()[cached.signature()];
          this._invalidates().remove(cached);
        }
      }
      if (signature != null) {
        if (request instanceof FetchRequest) {
          hit = this._cache()[signature];
          if (hit != null) {
            if (hit !== request) {
              setTimeout((function() {
                return request.setValue(hit);
              }), 0);
            }
            return Store.Handled;
          } else {
            this._cache()[signature] = request;
            if (request.expires != null) {
              after = util.isFunction(request.expires) ? request.expires() : request.expires;
              if (util.isNumber(after)) {
                setTimeout((function() {
                  return delete _this._cache()[signature];
                }), after * 1000);
              }
            }
            if (request.invalidate != null) {
              this._invalidates().add(request);
            }
            return Store.Unhandled;
          }
        } else if ((request instanceof CreateRequest) || (request instanceof UpdateRequest) || (request instanceof DeleteRequest)) {
          delete this._cache()[signature];
          if (request.cacheResult !== false && !(request instanceof DeleteRequest)) {
            request.on('changed', function(state) {
              if (state instanceof Request.state.type.Success) {
                return _this._cache()[signature] = state;
              }
            });
          }
          return Store.Unhandled;
        } else {
          delete this._cache()[signature];
          return Store.Unhandled;
        }
      } else {
        return Store.Unhandled;
      }
    };

    return MemoryCacheStore;

  })(Store);

  OnPageCacheStore = (function(_super) {
    __extends(OnPageCacheStore, _super);

    function OnPageCacheStore() {
      OnPageCacheStore.__super__.constructor.call(this);
    }

    OnPageCacheStore.prototype._dom = function() {};

    OnPageCacheStore.prototype.handle = function(request) {
      var cacheDom, signature;

      signature = request.signature();
      if (signature != null) {
        cacheDom = this._dom().find("> #" + signature);
        if (cacheDom.length > 0) {
          if (request instanceof FetchRequest) {
            request.setValue(Request.state.Success(cacheDom.text()));
            return Store.Handled;
          } else {
            cacheDom.remove();
            return Store.Unhandled;
          }
        } else {
          return Store.Unhandled;
        }
      } else {
        return Store.Unhandled;
      }
    };

    return OnPageCacheStore;

  })(Store);

  util.extend(module.exports, {
    Request: Request,
    Store: Store,
    OneOfStore: OneOfStore,
    MemoryCacheStore: MemoryCacheStore,
    OnPageCacheStore: OnPageCacheStore,
    request: {
      FetchRequest: FetchRequest,
      CreateRequest: CreateRequest,
      UpdateRequest: UpdateRequest,
      DeleteRequest: DeleteRequest
    }
  });

}).call(this);

},{"../collection/list":102,"../core/base":109,"../core/varying":111,"../model/model":117,"../util/util":126}],121:[function(require,module,exports){
(function() {
  var ApplyMutator, AttrMutator, Base, Binder, ClassGroupMutator, ClassMutator, CssMutator, HtmlMutator, MultiVarying, Mutator, RenderMutator, TextMutator, Varying, reference, types, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  util = require('../util/util');

  Base = require('../core/base').Base;

  _ref = require('../core/varying'), Varying = _ref.Varying, MultiVarying = _ref.MultiVarying;

  types = require('./types');

  reference = require('../model/reference');

  Binder = (function(_super) {
    __extends(Binder, _super);

    function Binder(dom, options) {
      this.dom = dom;
      this.options = options != null ? options : {};
      Binder.__super__.constructor.call(this);
      this._children = {};
      this._mutatorIndex = {};
      this._mutators = [];
    }

    Binder.prototype.find = function(selector) {
      var _base, _ref1;

      return (_ref1 = (_base = this._children)[selector]) != null ? _ref1 : _base[selector] = new Binder(this.dom.find(selector), util.extendNew(this.options, {
        parent: this
      }));
    };

    Binder.prototype.classed = function(className) {
      return this._attachMutator(ClassMutator, [className]);
    };

    Binder.prototype.classGroup = function(classPrefix) {
      return this._attachMutator(ClassGroupMutator, [classPrefix]);
    };

    Binder.prototype.attr = function(attrName) {
      return this._attachMutator(AttrMutator, [attrName]);
    };

    Binder.prototype.css = function(cssAttr) {
      return this._attachMutator(CssMutator, [cssAttr]);
    };

    Binder.prototype.text = function() {
      return this._attachMutator(TextMutator);
    };

    Binder.prototype.html = function() {
      return this._attachMutator(HtmlMutator);
    };

    Binder.prototype.render = function(app, options) {
      return this._attachMutator(RenderMutator, [app, options]);
    };

    Binder.prototype.apply = function(f) {
      return this._attachMutator(ApplyMutator, [f]);
    };

    Binder.prototype.from = function() {
      var path, _ref1;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref1 = this.text()).from.apply(_ref1, path);
    };

    Binder.prototype.fromVarying = function(func) {
      return this.text().fromVarying(func);
    };

    Binder.prototype.end = function() {
      return this.options.parent;
    };

    Binder.prototype.data = function(primary, aux, shouldRender) {
      var child, mutator, _, _i, _len, _ref1, _ref2;

      _ref1 = this._children;
      for (_ in _ref1) {
        child = _ref1[_];
        child.data(primary, aux, shouldRender);
      }
      _ref2 = this._mutators;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        mutator = _ref2[_i];
        mutator.data(primary, aux, shouldRender);
      }
      return null;
    };

    Binder.prototype._attachMutator = function(klass, param) {
      var existingMutator, identity, mutator, _base, _name, _ref1;

      identity = klass.identity(param);
      existingMutator = ((_ref1 = (_base = this._mutatorIndex)[_name = klass.name]) != null ? _ref1 : _base[_name] = {})[identity];
      mutator = new klass(this.dom, this, param, existingMutator);
      mutator.destroyWith(this);
      this._mutatorIndex[klass.name][identity] = mutator;
      this._mutators.push(mutator);
      return mutator;
    };

    return Binder;

  })(Base);

  Mutator = (function(_super) {
    __extends(Mutator, _super);

    function Mutator(dom, parentBinder, params, parentMutator) {
      var _ref1;

      this.dom = dom;
      this.parentBinder = parentBinder;
      this.params = params;
      this.parentMutator = parentMutator;
      Mutator.__super__.constructor.call(this);
      this._data = [];
      this._listeners = [];
      this._fallback = this._flatMap = this._value = null;
      if ((_ref1 = this._parentMutator) != null) {
        _ref1._isParent = true;
      }
      if (typeof this._namedParams === "function") {
        this._namedParams(this.params);
      }
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    Mutator.prototype.from = function() {
      var path,
        _this = this;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._data.push(function(primary) {
        return _this._from(primary, path);
      });
      return this;
    };

    Mutator.prototype.fromSelf = function() {
      this._data.push(function(primary) {
        return new Varying(primary);
      });
      return this;
    };

    Mutator.prototype.fromAux = function() {
      var key, path,
        _this = this;

      key = arguments[0], path = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((path != null) && path.length > 0) {
        this._data.push(function(_, aux) {
          return _this._from(util.deepGet(aux, key), path);
        });
      } else {
        this._data.push(function(_, aux) {
          return new Varying(util.deepGet(aux, key));
        });
      }
      return this;
    };

    Mutator.prototype.fromApp = function() {
      var path,
        _this = this;

      path = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._data.push(function() {
        return _this._from(_this.parentBinder.options.app, path);
      });
      return this;
    };

    Mutator.prototype.fromAttribute = function(key) {
      this._data.push(function(primary) {
        return new Varying(primary.attribute(key));
      });
      return this;
    };

    Mutator.prototype._from = function(obj, path) {
      var next, results, watched,
        _this = this;

      results = [];
      watched = {};
      next = function(idx) {
        return function(result) {
          var resolved;

          results[idx] = result;
          if (result instanceof reference.RequestResolver) {
            resolved = result.resolve(_this.parentBinder.options.app);
            if (resolved != null) {
              return next(0)(obj);
            }
          } else if (result instanceof reference.ModelResolver) {
            resolved = result.resolve(results[idx - 1]);
            if (resolved != null) {
              return next(0)(obj);
            }
          } else if (idx < path.length) {
            if ((result != null) && (result.watch == null)) {
              debugger;
            }
            if (result != null) {
              if (watched[result._id] != null) {
                return watched[result._id];
              } else {
                return watched[result._id] = result != null ? result.watch(path[idx]).map(next(idx + 1)) : void 0;
              }
            } else {
              return null;
            }
          } else {
            return result;
          }
        };
      };
      return next(0)(obj);
    };

    Mutator.prototype.fromVarying = function(varyingGenerator) {
      var _this = this;

      this._data.push(function(primary, aux) {
        return varyingGenerator.call(_this, primary, aux, _this.parentBinder.options.app);
      });
      return this;
    };

    Mutator.prototype.and = Mutator.prototype.from;

    Mutator.prototype.andSelf = Mutator.prototype.fromSelf;

    Mutator.prototype.andAux = Mutator.prototype.fromAux;

    Mutator.prototype.andApp = Mutator.prototype.fromApp;

    Mutator.prototype.andAttribute = Mutator.prototype.fromAttribute;

    Mutator.prototype.andVarying = Mutator.prototype.fromVarying;

    Mutator.prototype.andLast = function() {
      var _this = this;

      this._data.push(function() {
        _this.parentMutator.data(primary, aux);
        return _this.parentMutator._varying;
      });
      return this;
    };

    Mutator.prototype.flatMap = function(f) {
      this._flatMap = f;
      return this;
    };

    Mutator.prototype.fallback = function(fallback) {
      this._fallback = fallback;
      return this;
    };

    Mutator.prototype.data = function(primary, aux, shouldRender) {
      var datum, listener, process, _i, _len, _ref1,
        _this = this;

      _ref1 = this._listeners;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        listener = _ref1[_i];
        listener.destroy();
        this.unlistenTo(listener);
      }
      this._listeners = (function() {
        var _j, _len1, _ref2, _results;

        _ref2 = this._data;
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          datum = _ref2[_j];
          _results.push(datum(primary, aux));
        }
        return _results;
      }).call(this);
      process = function() {
        var values;

        values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (_this._flatMap != null) {
          return _this._flatMap.apply(_this, values);
        } else if (values.length === 1) {
          return values[0];
        } else {
          return values;
        }
      };
      this._varying = new MultiVarying(this._listeners, process);
      this._varying.destroyWith(this);
      this.listenTo(this._varying, 'changed', function() {
        return _this.apply();
      });
      this.apply(shouldRender);
      shouldRender = true;
      return this;
    };

    Mutator.prototype.calculate = function() {
      var _ref1, _ref2;

      return (_ref1 = (_ref2 = this._varying) != null ? _ref2.value : void 0) != null ? _ref1 : this._fallback;
    };

    Mutator.prototype.apply = function(shouldRender) {
      if (shouldRender == null) {
        shouldRender = true;
      }
      if (this._isParent !== true && shouldRender === true) {
        return this._apply(this.calculate());
      }
    };

    Mutator.prototype.end = function() {
      return this.parentBinder;
    };

    Mutator.identity = function() {
      return util.uniqueId();
    };

    Mutator.prototype._apply = function() {};

    return Mutator;

  })(Base);

  ClassMutator = (function(_super) {
    __extends(ClassMutator, _super);

    function ClassMutator() {
      _ref1 = ClassMutator.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ClassMutator.identity = function(_arg) {
      var className;

      className = _arg[0];
      return className;
    };

    ClassMutator.prototype._namedParams = function(_arg) {
      this.className = _arg[0];
    };

    ClassMutator.prototype._apply = function(bool) {
      return this.dom.toggleClass(this.className, bool != null ? bool : false);
    };

    return ClassMutator;

  })(Mutator);

  ClassGroupMutator = (function(_super) {
    __extends(ClassGroupMutator, _super);

    function ClassGroupMutator() {
      _ref2 = ClassGroupMutator.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ClassGroupMutator.identity = function(_arg) {
      var classPrefix;

      classPrefix = _arg[0];
      return classPrefix;
    };

    ClassGroupMutator.prototype._namedParams = function(_arg) {
      this.classPrefix = _arg[0];
    };

    ClassGroupMutator.prototype._apply = function(value) {
      var className, existingClasses, _i, _len, _ref3;

      existingClasses = (_ref3 = this.dom.attr('class')) != null ? _ref3.split(' ') : void 0;
      if (existingClasses != null) {
        for (_i = 0, _len = existingClasses.length; _i < _len; _i++) {
          className = existingClasses[_i];
          if (className.indexOf(this.classPrefix) === 0) {
            this.dom.removeClass(className);
          }
        }
      }
      if ((value != null) && util.isPrimitive(value)) {
        return this.dom.addClass("" + this.classPrefix + value);
      }
    };

    return ClassGroupMutator;

  })(Mutator);

  AttrMutator = (function(_super) {
    __extends(AttrMutator, _super);

    function AttrMutator() {
      _ref3 = AttrMutator.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    AttrMutator.identity = function(_arg) {
      var attr;

      attr = _arg[0];
      return attr;
    };

    AttrMutator.prototype._namedParams = function(_arg) {
      this.attr = _arg[0];
    };

    AttrMutator.prototype._apply = function(value) {
      return this.dom.attr(this.attr, util.isPrimitive(value) ? value : '');
    };

    return AttrMutator;

  })(Mutator);

  CssMutator = (function(_super) {
    __extends(CssMutator, _super);

    function CssMutator() {
      _ref4 = CssMutator.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    CssMutator.identity = function(_arg) {
      var cssAttr;

      cssAttr = _arg[0];
      return cssAttr;
    };

    CssMutator.prototype._namedParams = function(_arg) {
      this.cssAttr = _arg[0];
    };

    CssMutator.prototype._apply = function(value) {
      return this.dom.css(this.cssAttr, util.isPrimitive(value) ? value : '');
    };

    return CssMutator;

  })(Mutator);

  TextMutator = (function(_super) {
    __extends(TextMutator, _super);

    function TextMutator() {
      _ref5 = TextMutator.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    TextMutator.identity = function() {
      return 'text';
    };

    TextMutator.prototype._apply = function(text) {
      return this.dom.text(util.isPrimitive(text) ? text.toString() : '');
    };

    return TextMutator;

  })(Mutator);

  HtmlMutator = (function(_super) {
    __extends(HtmlMutator, _super);

    function HtmlMutator() {
      _ref6 = HtmlMutator.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    HtmlMutator.identity = function() {
      return 'html';
    };

    HtmlMutator.prototype._apply = function(html) {
      return this.dom.html(util.isPrimitive(html) ? html.toString() : '');
    };

    return HtmlMutator;

  })(Mutator);

  RenderMutator = (function(_super) {
    __extends(RenderMutator, _super);

    function RenderMutator() {
      _ref7 = RenderMutator.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    RenderMutator.prototype._namedParams = function(_arg) {
      this.app = _arg[0], this.options = _arg[1];
    };

    RenderMutator.prototype.apply = function(shouldRender) {
      if (shouldRender == null) {
        shouldRender = true;
      }
      if (!this._isParent) {
        return this._render(this._viewFromResult(this.calculate()), shouldRender);
      }
    };

    RenderMutator.prototype._viewFromResult = function(result) {
      var constructorOpts, lastKlass;

      lastKlass = this._lastKlass;
      delete this._lastKlass;
      if (result == null) {
        return null;
      } else if (result instanceof types.WithOptions) {
        return this.app.getView(result.model, result.options);
      } else if (result instanceof types.WithView) {
        return result.view;
      } else if (result instanceof types.WithAux && (result.primary != null)) {
        constructorOpts = util.extendNew(this.options.constructorOpts, {
          aux: result.aux
        });
        return this.app.getView(result.primary, util.extendNew(this.options, {
          constructorOpts: constructorOpts
        }));
      } else {
        return this.app.getView(result, this.options);
      }
    };

    RenderMutator.prototype._render = function(view, shouldRender) {
      this._clear();
      this._lastView = view;
      if (view != null) {
        view.destroyWith(this);
        if (shouldRender === true) {
          this.dom.children().each(function() {
            var _ref8;

            return (_ref8 = $(this).data('view')) != null ? typeof _ref8.destroy === "function" ? _ref8.destroy() : void 0 : void 0;
          });
          this.dom.empty();
          this.dom.append(view.artifact());
          return view.emit('appended');
        } else {
          return view.bind(this.dom.contents());
        }
      }
    };

    RenderMutator.prototype._clear = function() {
      if (this._lastView != null) {
        return this._lastView.destroy();
      }
    };

    return RenderMutator;

  })(Mutator);

  ApplyMutator = (function(_super) {
    __extends(ApplyMutator, _super);

    function ApplyMutator() {
      _ref8 = ApplyMutator.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    ApplyMutator.prototype._namedParams = function(_arg) {
      this.f = _arg[0];
    };

    ApplyMutator.prototype._apply = function(value) {
      return this.f(this.dom, value);
    };

    return ApplyMutator;

  })(Mutator);

  util.extend(module.exports, {
    Binder: Binder,
    Mutator: Mutator,
    mutators: {
      ClassMutator: ClassMutator,
      ClassGroupMutator: ClassGroupMutator,
      AttrMutator: AttrMutator,
      CssMutator: CssMutator,
      TextMutator: TextMutator,
      HtmlMutator: HtmlMutator,
      RenderMutator: RenderMutator,
      ApplyMutator: ApplyMutator
    }
  });

}).call(this);

},{"../core/base":109,"../core/varying":111,"../model/reference":119,"../util/util":126,"./types":124}],122:[function(require,module,exports){
(function() {
  var util;

  util = require('../util/util');

  util.extend(module.exports, {
    WithAux: require('./types').WithAux,
    WithOptions: require('./types').WithOptions,
    WithView: require('./types').WithView,
    Templater: require('./templater').Templater
  });

}).call(this);

},{"../util/util":126,"./templater":123,"./types":124}],123:[function(require,module,exports){
(function() {
  var Binder, Templater, util;

  util = require('../util/util');

  Binder = require('./binder').Binder;

  Templater = (function() {
    function Templater(options) {
      this.options = options != null ? options : {};
      if (this.options.dom != null) {
        this._dom$ = this.options.dom;
      }
      this._binder = new Binder(this._wrappedDom(), {
        app: this.options.app
      });
      this._binding();
    }

    Templater.prototype._binding = function() {
      return this._binder;
    };

    Templater.prototype.markup = function() {
      return this._wrappedDom().get(0).innerHTML;
    };

    Templater.prototype.data = function(primary, aux, shouldRender) {
      return this._binder.data(primary, aux, shouldRender);
    };

    Templater.prototype.dom = function() {
      var _ref;

      return (_ref = this._dom$) != null ? _ref : this._dom$ = this._dom();
    };

    Templater.prototype._dom = function() {};

    Templater.prototype._wrappedDom = function() {
      var _ref;

      return (_ref = this._wrappedDom$) != null ? _ref : this._wrappedDom$ = this.dom().wrap('<div/>').parent();
    };

    return Templater;

  })();

  util.extend(module.exports, {
    Templater: Templater
  });

}).call(this);

},{"../util/util":126,"./binder":121}],124:[function(require,module,exports){
(function() {
  var WithAux, WithOptions, WithView, util;

  util = require('../util/util');

  WithAux = (function() {
    function WithAux(primary, aux) {
      this.primary = primary;
      this.aux = aux != null ? aux : {};
    }

    return WithAux;

  })();

  WithOptions = (function() {
    function WithOptions(model, options) {
      this.model = model;
      this.options = options;
    }

    return WithOptions;

  })();

  WithView = (function() {
    function WithView(view) {
      this.view = view;
    }

    return WithView;

  })();

  util.extend(module.exports, {
    WithAux: WithAux,
    WithOptions: WithOptions,
    WithView: WithView
  });

}).call(this);

},{"../util/util":126}],125:[function(require,module,exports){
(function() {
  var Continuous, Coverage, Range, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('./util');

  Varying = require('../core/varying').Varying;

  Coverage = (function() {
    function Coverage(children) {
      var child, _i, _len;

      if (children == null) {
        children = [];
      }
      this.children = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        child = children[_i];
        this["with"](child);
      }
    }

    Coverage.prototype._with = function(range) {
      var idx, _ref, _ref1,
        _this = this;

      while ((idx = this._searchOverlap(range)) != null) {
        range = this.children.splice(idx, 1)._with(range);
      }
      this.children.push(range);
      this.lower = Math.min((_ref = this.lower) != null ? _ref : range.lower, range.lower);
      this.upper = Math.max((_ref1 = this.upper) != null ? _ref1 : range.upper, range.upper);
      range.on('split', function(newCoverage) {
        idx = _this.children.indexOf(range);
        if (idx < 0) {
          return range.destroy();
        } else {
          return _this.children[idx] = newCoverage;
        }
      });
      return this;
    };

    Coverage.prototype.add = Coverage.prototype._with;

    Coverage.prototype.overlaps = function(lower, upper) {
      return (lower <= this.upper) && (upper >= this.lower);
    };

    Coverage.prototype.within = function(lower, upper) {
      if (lower == null) {
        lower = this.lower;
      }
      if (upper == null) {
        upper = this.upper;
      }
      return util.foldLeft([])(this.children, function(result, child) {
        return result.concat(!child.overlaps(lower, upper) ? [] : child instanceof Range ? [child] : child.within(idx, length));
      });
    };

    Coverage.prototype.gaps = function(lower, upper) {
      var child, gaps, _i, _len, _ref;

      if (lower == null) {
        lower = this.lower;
      }
      if (upper == null) {
        upper = this.upper;
      }
      this.children.sort(function(a, b) {
        return a.lower - b.lower;
      });
      gaps = [];
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (lower < child.lower) {
          gaps.push([lower, child.lower - 1]);
          lower = child.lower;
        }
        if (lower < child.upper) {
          if ((child instanceof Range) || (child instanceof Continuous)) {
            lower = child.upper + 1;
          } else {
            gaps = gaps.concat(child.gaps(lower, upper));
            lower = child.upper + 1;
          }
        }
        if (lower >= upper) {
          break;
        }
      }
      if (lower < upper) {
        gaps.push([lower, upper]);
      }
      return gaps;
    };

    Coverage.prototype.fills = function(lower, upper) {
      if (lower == null) {
        lower = this.lower;
      }
      if (upper == null) {
        upper = this.upper;
      }
      return util.foldLeft([])(this.children, function(result, child) {
        return result.concat(!child.overlaps(lower, upper) ? [] : (child instanceof Continuous) || (child instanceof Range) ? [child.lower, child.upper] : child.fills(lower, upper));
      });
    };

    Coverage.prototype._searchOverlap = function(range) {
      var child, idx, _i, _len, _ref;

      _ref = this.children;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        child = _ref[idx];
        if (child.overlaps(range.lower, range.upper)) {
          return idx;
        }
      }
      return null;
    };

    return Coverage;

  })();

  Continuous = (function(_super) {
    __extends(Continuous, _super);

    function Continuous(children) {
      var child, range, _fn, _i, _len, _ref,
        _this = this;

      this.children = children != null ? children : [];
      this.lower = util.reduceLeft((function() {
        var _i, _len, _ref, _results;

        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.lower);
        }
        return _results;
      }).call(this), Math.min);
      this.upper = util.reduceLeft((function() {
        var _i, _len, _ref, _results;

        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.upper);
        }
        return _results;
      }).call(this), Math.max);
      _ref = this.children;
      _fn = function(range) {
        return range.on('destroying', function() {
          return _this.emit('split', _this._without(range));
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        range = _ref[_i];
        _fn(range);
      }
    }

    Continuous.prototype._with = function(range) {
      return new Continuous(this.children.concat[range]);
    };

    Continuous.prototype._without = function(deadRange) {
      var range;

      return new Coverage((function() {
        var _i, _len, _ref, _results;

        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          range = _ref[_i];
          if (range !== deadRange) {
            _results.push(range);
          }
        }
        return _results;
      }).call(this));
    };

    return Continuous;

  })(Coverage);

  Range = (function(_super) {
    __extends(Range, _super);

    function Range(lower, upper, value) {
      this.lower = lower;
      this.upper = upper;
      Range.__super__.constructor.call(this, value);
    }

    Range.prototype.overlaps = function(lower, upper) {
      return (lower <= this.upper) && (upper >= this.lower);
    };

    Range.prototype._with = function(other) {
      return new Continuous([this, other]);
    };

    Range.prototype.map = function(f) {
      var result,
        _this = this;

      result = new Range(this.lower, this.upper, this.value);
      this.on('changed', function(value) {
        return result.setValue(value);
      });
      return result;
    };

    return Range;

  })(Varying);

  util.extend(module.exports, {
    Coverage: Coverage,
    Continuous: Continuous,
    Range: Range
  });

}).call(this);

},{"../core/varying":111,"./util":126}],126:[function(require,module,exports){
(function() {
  var toString, type, util, _fn, _i, _len, _ref, _ref1,
    __slice = [].slice;

  util = {
    isArray: (_ref = Array.isArray) != null ? _ref : function(obj) {
      return toString.call(obj) === '[object Array]';
    },
    isNumber: function(obj) {
      return toString.call(obj) === '[object Number]' && !isNaN(obj);
    },
    isPlainObject: function(obj) {
      return (obj != null) && (typeof obj === 'object') && (obj.constructor === Object);
    },
    isPrimitive: function(obj) {
      return util.isString(obj) || util.isNumber(obj) || obj === true || obj === false;
    },
    _uniqueId: 0,
    uniqueId: function() {
      return util._uniqueId++;
    },
    once: function(f) {
      var run;

      run = false;
      return function() {
        var args;

        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (run === true) {
          return;
        }
        run = true;
        return f.apply(null, args);
      };
    },
    foldLeft: function(value) {
      return function(arr, f) {
        var elem, _i, _len;

        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          elem = arr[_i];
          value = f(value, elem);
        }
        return value;
      };
    },
    reduceLeft: function(arr, f) {
      return util.foldLeft(arr[0])(arr, f);
    },
    first: function(arr) {
      return arr[0];
    },
    last: function(arr) {
      return arr[arr.length - 1];
    },
    resplice: function(arr, pull, push) {
      var idx;

      idx = arr.indexOf(pull);
      if (idx < 0) {
        idx = arr.length;
      }
      return arr.splice.apply(arr, [idx, 1].concat(__slice.call(push)));
    },
    extend: function() {
      var dest, k, src, srcs, v, _i, _len;

      dest = arguments[0], srcs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = srcs.length; _i < _len; _i++) {
        src = srcs[_i];
        for (k in src) {
          v = src[k];
          dest[k] = v;
        }
      }
      return null;
    },
    extendNew: function() {
      var obj, srcs;

      srcs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      obj = {};
      util.extend.apply(util, [obj].concat(__slice.call(srcs)));
      return obj;
    },
    hasProperties: function(obj) {
      var k;

      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return true;
        }
      }
      return false;
    },
    normalizePath: function(path) {
      if (path.length !== 1) {
        return path;
      } else {
        if (util.isString(path[0])) {
          return path[0].split('.');
        } else if (util.isArray(path[0])) {
          return path[0];
        }
      }
    },
    deepGet: function() {
      var idx, obj, path;

      obj = arguments[0], path = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      path = util.normalizePath(path);
      if (path == null) {
        return null;
      }
      idx = 0;
      while ((obj != null) && idx < path.length) {
        obj = obj[path[idx++]];
      }
      return obj != null ? obj : null;
    },
    deepSet: function() {
      var idx, obj, path, _name, _ref1;

      obj = arguments[0], path = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      path = util.normalizePath(path);
      if (path == null) {
        return null;
      }
      idx = 0;
      while ((idx + 1) < path.length) {
        obj = (_ref1 = obj[_name = path[idx++]]) != null ? _ref1 : obj[_name] = {};
      }
      return function(x) {
        if (util.isFunction(x)) {
          return x(obj, path[idx]);
        } else {
          return obj[path[idx]] = x;
        }
      };
    },
    traverse: function(obj, f, path) {
      var k, subpath, v;

      if (path == null) {
        path = [];
      }
      for (k in obj) {
        v = obj[k];
        subpath = path.concat([k]);
        if ((v != null) && util.isPlainObject(v)) {
          util.traverse(v, f, subpath);
        } else {
          f(subpath, v);
        }
      }
      return obj;
    },
    traverseAll: function(obj, f, path) {
      var k, subpath, v;

      if (path == null) {
        path = [];
      }
      for (k in obj) {
        v = obj[k];
        subpath = path.concat([k]);
        f(subpath, v);
        if ((obj[k] != null) && util.isPlainObject(obj[k])) {
          util.traverseAll(obj[k], f, subpath);
        }
      }
      return obj;
    }
  };

  toString = Object.prototype.toString;

  _ref1 = ['Arguments', 'Function', 'String', 'Date', 'RegExp'];
  _fn = function(type) {
    return util['is' + type] = function(obj) {
      return toString.call(obj) === ("[object " + type + "]");
    };
  };
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    type = _ref1[_i];
    _fn(type);
  }

  if (typeof /./ !== 'function') {
    util.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  util.extend(module.exports, util);

}).call(this);

},{}],127:[function(require,module,exports){
(function() {
  var DomView, List, View, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../util/util');

  View = require('./view').View;

  List = require('../collection/list').List;

  DomView = (function(_super) {
    __extends(DomView, _super);

    DomView.prototype.templateClass = null;

    function DomView(subject, options) {
      var _this = this;

      this.subject = subject;
      this.options = options != null ? options : {};
      DomView.__super__.constructor.call(this, this.subject, this.options);
      this._subviews = new List();
      this.on('appended', function() {
        var subview, _i, _len, _ref;

        if (_this.artifact().closest('body').length > 0) {
          _this.emit('appendedToDocument');
          _ref = _this._subviews.list;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            subview = _ref[_i];
            subview.emit('appended');
          }
        }
        return null;
      });
      this.destroyWith(this.subject);
    }

    DomView.prototype.markup = function() {
      var node;

      return ((function() {
        var _i, _len, _ref, _results;

        _ref = this.artifact().get();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(node.outerHTML);
        }
        return _results;
      }).call(this)).join('');
    };

    DomView.prototype._render = function() {
      var dom;

      this._templater = new this.templateClass(util.extendNew({
        app: this._app()
      }, this._templaterOptions()));
      dom = this._templater.dom();
      this._setTemplaterData();
      return dom;
    };

    DomView.prototype._templaterOptions = function() {
      return {};
    };

    DomView.prototype._bind = function(dom) {
      this._templater = new this.templateClass({
        app: this._app(),
        dom: dom
      });
      this._setTemplaterData(false);
      return null;
    };

    DomView.prototype._setTemplaterData = function(shouldRender) {
      return this._templater.data(this.subject, this._auxData(), shouldRender);
    };

    DomView.prototype._auxData = function() {
      var _ref;

      return (_ref = this.options.aux) != null ? _ref : {};
    };

    DomView.prototype._app = function() {
      var _ref,
        _this = this;

      return (_ref = this._app$) != null ? _ref : this._app$ = (function() {
        var library;

        library = _this.options.app.get('views').newEventBindings();
        library.destroyWith(_this);
        _this.listenTo(library, 'got', function(view) {
          if (_this._wired === true) {
            view.wireEvents();
          }
          return _this._subviews.add(view);
        });
        return _this.options.app.withViewLibrary(library);
      })();
    };

    DomView.prototype.wireEvents = function() {
      var dom, view, _i, _len, _ref;

      if (this._wired === true) {
        return;
      }
      this._wired = true;
      dom = this.artifact();
      dom.data('view', this);
      this._wireEvents();
      if (this._subviews != null) {
        _ref = this._subviews.list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          if (view != null) {
            view.wireEvents();
          }
        }
      }
      return null;
    };

    DomView.prototype.destroy = function() {
      var _base;

      if (this._artifact != null) {
        if (typeof (_base = this.artifact()).trigger === "function") {
          _base.trigger('destroying');
        }
        this.artifact().remove();
      }
      return DomView.__super__.destroy.call(this);
    };

    return DomView;

  })(View);

  util.extend(module.exports, {
    DomView: DomView
  });

}).call(this);

},{"../collection/list":102,"../util/util":126,"./view":133}],128:[function(require,module,exports){
(function() {
  var DomView, ListEditItem, ListEditItemTemplate, ListEditView, ListView, Templater, templater, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  DomView = require('../dom-view').DomView;

  templater = require('../../templater/package');

  Templater = require('../../templater/templater').Templater;

  ListView = require('./list').ListView;

  ListEditView = (function(_super) {
    __extends(ListEditView, _super);

    function ListEditView() {
      _ref = ListEditView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListEditView.prototype._initialize = function() {
      var _ref1;

      ListEditView.__super__._initialize.call(this);
      this.options.childOpts = util.extendNew(this.options.childOpts, {
        context: this.options.itemContext,
        list: this.subject
      });
      return this.options.itemContext = (_ref1 = this.options.editWrapperContext) != null ? _ref1 : 'edit-wrapper';
    };

    return ListEditView;

  })(ListView);

  ListEditItemTemplate = (function(_super) {
    __extends(ListEditItemTemplate, _super);

    function ListEditItemTemplate() {
      _ref1 = ListEditItemTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ListEditItemTemplate.prototype._binding = function() {
      var binding;

      binding = ListEditItemTemplate.__super__._binding.call(this);
      binding.find('.editItem').render(this.options.app).fromSelf().andAux('context').flatMap(function(item, context) {
        return new templater.WithOptions(item, {
          context: context != null ? context : 'edit'
        });
      });
      return binding;
    };

    return ListEditItemTemplate;

  })(Templater);

  ListEditItem = (function(_super) {
    __extends(ListEditItem, _super);

    function ListEditItem() {
      _ref2 = ListEditItem.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ListEditItem.prototype.templateClass = ListEditItemTemplate;

    ListEditItem.prototype._auxData = function() {
      return {
        context: this.options.context
      };
    };

    ListEditItem.prototype._wireEvents = function() {
      var dom,
        _this = this;

      dom = this.artifact();
      return dom.find('> .editRemove').on('click', function(event) {
        event.preventDefault();
        return _this.options.list.remove(_this.subject);
      });
    };

    return ListEditItem;

  })(DomView);

  util.extend(module.exports, {
    ListEditView: ListEditView,
    ListEditItemTemplate: ListEditItemTemplate,
    ListEditItem: ListEditItem
  });

}).call(this);

},{"../../templater/package":122,"../../templater/templater":123,"../../util/util":126,"../dom-view":127,"./list":129}],129:[function(require,module,exports){
(function() {
  var ListView, Varying, ViewContainer, reference, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  ViewContainer = require('./view-container').ViewContainer;

  reference = require('../../model/reference');

  Varying = require('../../core/varying').Varying;

  ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      _ref = ListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListView.prototype._render = function() {
      var dom,
        _this = this;

      dom = this._dom = ListView.__super__._render.call(this);
      this._add(this.subject.list);
      this.listenTo(this.subject, 'added', function(item, idx) {
        return _this._add(item, idx);
      });
      this.listenTo(this.subject, 'removed', function(item) {
        return _this._remove(item);
      });
      return dom;
    };

    ListView.prototype._target = function() {
      return this._dom;
    };

    ListView.prototype._add = function(items, idx) {
      var afterDom, insert, item, target, _fn, _i, _len,
        _this = this;

      if (!util.isArray(items)) {
        items = [items];
      }
      afterDom = null;
      target = this._target();
      insert = function(elem) {
        if (target.children().length === 0) {
          target.append(elem);
        } else if (afterDom != null) {
          afterDom.after(elem);
        } else if (util.isNumber(idx)) {
          if (idx === 0) {
            target.prepend(elem);
          } else {
            afterDom = target.children(":nth-child(" + idx + ")");
            afterDom.after(elem);
          }
        } else {
          afterDom = target.children(':last-child');
          afterDom.after(elem);
        }
        return afterDom = elem;
      };
      _fn = function(item) {
        var view, viewDom, _ref1;

        view = viewDom = null;
        if (item instanceof reference.RequestReference && item.value instanceof reference.RequestResolver) {
          item.value.resolve(_this.options.app);
        }
        view = _this._getView(item);
        viewDom = (_ref1 = view != null ? view.artifact() : void 0) != null ? _ref1 : _this._emptyDom();
        insert(viewDom);
        if (view != null) {
          view.emit('appended');
          if (_this._wired === true) {
            return view.wireEvents();
          }
        }
      };
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _fn(item);
      }
      return null;
    };

    ListView.prototype._remove = function(items) {
      var item, _i, _len;

      if (!util.isArray(items)) {
        items = [items];
      }
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this._removeView(item);
      }
      return null;
    };

    return ListView;

  })(ViewContainer);

  util.extend(module.exports, {
    ListView: ListView
  });

}).call(this);

},{"../../core/varying":111,"../../model/reference":119,"../../util/util":126,"./view-container":131}],130:[function(require,module,exports){
(function() {
  var VaryingView, ViewContainer, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  ViewContainer = require('./view-container').ViewContainer;

  VaryingView = (function(_super) {
    __extends(VaryingView, _super);

    function VaryingView() {
      _ref = VaryingView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VaryingView.prototype._render = function() {
      var dom, handleValue, replaceWith,
        _this = this;

      dom = VaryingView.__super__._render.call(this);
      replaceWith = function(newDom) {
        dom.replaceWith(newDom);
        return dom = newDom;
      };
      handleValue = function(newValue) {
        var newView;

        if (_this._value != null) {
          replaceWith(_this._templater.dom());
          _this._removeView(_this._value);
        }
        if (newValue != null) {
          newView = _this._getView(newValue);
          if (newView != null) {
            replaceWith(newView.artifact());
            newView.emit('appended');
          }
        }
        return _this._value = newValue;
      };
      this.subject.on('changed', handleValue);
      handleValue(this.subject.value);
      return dom;
    };

    VaryingView.prototype._childContext = function() {
      var _ref1;

      return (_ref1 = this.options.itemContext) != null ? _ref1 : this.options.libraryContext;
    };

    return VaryingView;

  })(ViewContainer);

  util.extend(module.exports, {
    VaryingView: VaryingView
  });

}).call(this);

},{"../../util/util":126,"./view-container":131}],131:[function(require,module,exports){
(function() {
  var DomView, Varying, ViewContainer, reference, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  util = require('../../util/util');

  DomView = require('../dom-view').DomView;

  reference = require('../../model/reference');

  Varying = require('../../core/varying').Varying;

  ViewContainer = (function(_super) {
    __extends(ViewContainer, _super);

    function ViewContainer() {
      _ref = ViewContainer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ViewContainer.prototype._initialize = function() {
      var _base, _ref1;

      this._views = {};
      return (_ref1 = (_base = this.options).childOpts) != null ? _ref1 : _base.childOpts = {};
    };

    ViewContainer.prototype._removeView = function(subject) {
      var _ref1;

      if ((_ref1 = this._views[subject._id]) != null) {
        _ref1.destroy();
      }
      delete this._views[subject._id];
      return null;
    };

    ViewContainer.prototype._getView = function(subject) {
      var result, view;

      if (subject == null) {
        return null;
      }
      view = subject instanceof DomView ? (this._subviews.add(subject), subject) : this.options.itemView != null ? (result = new this.options.itemView(subject, util.extendNew(this.options.childOpts, {
        app: this.options.app
      })), this._subviews.add(result), result) : this._app().getView(subject, {
        context: this._childContext(),
        constructorOpts: this.options.childOpts
      });
      this._views[subject._id] = view;
      if (this._wired === true) {
        if (view != null) {
          view.wireEvents();
        }
      }
      return view;
    };

    ViewContainer.prototype._childContext = function() {
      return this.options.itemContext;
    };

    return ViewContainer;

  })(DomView);

  util.extend(module.exports, {
    ViewContainer: ViewContainer
  });

}).call(this);

},{"../../core/varying":111,"../../model/reference":119,"../../util/util":126,"../dom-view":127}],132:[function(require,module,exports){
(function() {


}).call(this);

},{}],133:[function(require,module,exports){
(function() {
  var Base, View, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../core/base').Base;

  util = require('../util/util');

  View = (function(_super) {
    __extends(View, _super);

    function View(subject, options) {
      this.subject = subject;
      this.options = options != null ? options : {};
      View.__super__.constructor.call(this);
      if (typeof this._initialize === "function") {
        this._initialize();
      }
    }

    View.prototype.artifact = function() {
      var _ref;

      return (_ref = this._artifact) != null ? _ref : this._artifact = this._render();
    };

    View.prototype._render = function() {};

    View.prototype.wireEvents = function() {
      if (!this._wired) {
        this._wireEvents();
      }
      this._wired = true;
      return null;
    };

    View.prototype._wireEvents = function() {};

    View.prototype.bind = function(artifact) {
      this._artifact = artifact;
      this._bind(artifact);
      return null;
    };

    View.prototype._bind = function() {};

    return View;

  })(Base);

  util.extend(module.exports, {
    View: View
  });

}).call(this);

},{"../core/base":109,"../util/util":126}],134:[function(require,module,exports){
var process=require("__browserify_process");;!function(exports, undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || this._all;
    }
    else {
      return this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if(!this._all) {
      this._all = [];
    }

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return EventEmitter;
    });
  } else {
    exports.EventEmitter2 = EventEmitter;
  }

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);

},{"__browserify_process":27}]},{},[3])
;