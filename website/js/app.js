(function() {
  var AppView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.TemplateEngine = (function() {
    function TemplateEngine() {
      this.renderTemplate = __bind(this.renderTemplate, this);
      this.getRenderedTemplate = __bind(this.getRenderedTemplate, this);
      this.templateLoaded = __bind(this.templateLoaded, this);
      this.getTemplate = __bind(this.getTemplate, this);
      this.loadTemplates = __bind(this.loadTemplates, this);
    }

    TemplateEngine.prototype.templatesLoaded = 0;

    TemplateEngine.prototype.templatesToLoad = 0;

    TemplateEngine.prototype.templateLoadCallback = null;

    TemplateEngine.prototype.templates = [];

    TemplateEngine.prototype.loadTemplates = function(templatePath, templts, callback) {
      var key, templt, _i, _len, _results;
      this.templatesLoaded = 0;
      this.templatesToLoad = templts.length;
      this.templateLoadCallback = callback;
      _results = [];
      for (_i = 0, _len = templts.length; _i < _len; _i++) {
        templt = templts[_i];
        key = Object.keys(templt);
        _results.push(this.getTemplate(templatePath, templt[key], key));
      }
      return _results;
    };

    TemplateEngine.prototype.getTemplate = function(path, tmplt, key) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = (function(_this) {
        return function() {
          if (xhr.readyState === 4) {
            _this.templates[key] = xhr.responseText;
            return _this.templateLoaded();
          }
        };
      })(this);
      console.log("", path + "" + tmplt);
      xhr.open('GET', path + tmplt);
      return xhr.send();
    };

    TemplateEngine.prototype.templateLoaded = function() {
      this.templatesLoaded++;
      if (this.templatesLoaded >= this.templatesToLoad) {
        if (this.templateLoadCallback) {
          console.log("TEMPLATES LOADED");
          return this.templateLoadCallback();
        }
      }
    };

    TemplateEngine.prototype.getRenderedTemplate = function(key, values) {
      if (!this.templates[key]) {
        console.log("!! TEMPLATE DOESN'T EXISTS !!");
      }
      return this.renderTemplate(this.templates[key], values);
    };

    TemplateEngine.prototype.renderTemplate = function(tpl, data) {
      var match, re;
      re = /<%([^%>]+)?%>/g;
      while (match = re.exec(tpl)) {
        tpl = tpl.replace(match[0], data[match[1]]);
      }
      return tpl;
    };

    return TemplateEngine;

  })();

  AppView = (function() {
    AppView.prototype.$container = null;

    AppView.prototype.templatePath = 'template/';

    AppView.prototype.templateEngine = null;

    AppView.prototype.templatesToPreload = [
      {
        main: 'main-template.html'
      }
    ];

    AppView.prototype.videoPlayer = null;

    AppView.prototype.videoW = 854;

    AppView.prototype.videoH = 480;

    function AppView(el) {
      this.bgVideoCenter = __bind(this.bgVideoCenter, this);
      this.onResizeEvents = __bind(this.onResizeEvents, this);
      this.preloaded = __bind(this.preloaded, this);
      console.log("APP VIEW");
      this.$container = el;
      return;
    }

    AppView.prototype.init = function($wrapper) {
      console.log("INIT APP VIEW");
      this.templateEngine = new TemplateEngine();
      this.templateEngine.loadTemplates(this.templatePath, this.templatesToPreload, this.preloaded);
    };

    AppView.prototype.preloaded = function() {
      this.$container.html(this.templateEngine.getRenderedTemplate('main', {
        VIDEO_PATHNAME: 'data/trailer'
      }));
      this.videoPlayer = this.$container.find('#bg-video');
      $(window).resize(this.onResizeEvents);
      this.onResizeEvents();
    };

    AppView.prototype.onResizeEvents = function() {
      return this.bgVideoCenter();
    };

    AppView.prototype.bgVideoCenter = function() {
      var docH, docW, margin, vidEl, videoH, videoW;
      vidEl = this.videoPlayer;
      videoW = this.videoW;
      videoH = this.videoH;
      docH = this.$container.height();
      docW = this.$container.width();
      if (docW / docH < videoW / videoH) {
        margin = (docH * videoW / videoH - docW) / 2 * -1;
        $(vidEl).css({
          "height": docH + "px"
        });
        $(vidEl).css({
          "width": "auto"
        });
        $(vidEl).css({
          "margin-top": "0px"
        });
        $(vidEl).css({
          "margin-left": margin + "px"
        });
      } else {
        margin = (docW * videoH / videoW - docH) / 2 * -1;
        $(vidEl).css({
          "height": "auto"
        });
        $(vidEl).css({
          "width": docW + "px"
        });
        $(vidEl).css({
          "margin-left": "0px"
        });
        $(vidEl).css({
          "margin-top": margin + "px"
        });
      }
    };

    return AppView;

  })();

  window.app = {
    view: null,
    init: function() {
      app.initApp();
    },
    initApp: function() {
      console.log("INIT APP");
      app.view = new AppView($('#container'));
      app.view.init();
    }
  };

  app.init();

}).call(this);
