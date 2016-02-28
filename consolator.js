// Consolator - A javascript library for printing styled messages to your console.
//

(function () {
  var Consolator = (function () {

    var C = function (opts) {
      this.opts = opts = opts || {};
      this.opts.open = opts.open || '{{{';
      this.opts.close = opts.close || '}}}';
      this.opts.fallbackSupport = opts.fallbackSupport || false;

      // default styles
      this.opts.punctuation = opts.punctuation = opts.punctuation || { color: 'gray' };
      this.opts.boolean = opts.boolean || {};
      this.opts.brace = opts.brace || opts.punctuation;
      this.opts.bracket = opts.bracket || opts.punctuation;
      this.opts.colon = opts.colon || opts.punctuation;
      this.opts.comma = opts.comma || opts.punctuation;
      this.opts.hyphen = opts.hyphen || opts.punctuation;
      this.opts.key = opts.key || { 'font-weight': 'bold' };
      this.opts.number = opts.number || {};
      this.opts.quote = opts.quote || opts.punctuation;
      this.opts.string = opts.string || {};
      this.opts.time = opts.time || {};
      this.opts.type = opts.type || { 'font-weight': 'bold' };
    };

    // application & consumption
    var apply = function (data, opts) {
      if (typeof data === 'undefined') return;
      data = split(stringify(data), opts);
      var dataArray = [''];
      var i = data.length;
      while (i--) if (data[i]) {
        data[i] = objectify(data[i], opts);
        dataArray = env === 'browser' ? support.styles(opts.fallbackSupport) ? browser(dataArray, data[i]) : bypass(dataArray, data[i]) : server(dataArray, data[i]);
      }
      return dataArray;
    };
    var digest = function (data, attributes, opts) {
      if (typeof data === 'undefined' && !attributes['background-image']) return;
      data = split(stringify(data), opts);
      var dataString = '';
      var i = data.length;
      while (i--) if (data[i] || attributes['background-image']) {
        data[i] = objectify(data[i], opts);
        var attributeKeys = Object.keys(attributes), k = attributeKeys.length;
        while (k--) if (!data[i][attributeKeys[k]]) data[i][attributeKeys[k]] = attributes[attributeKeys[k]];
        dataString += opts.open + JSON.stringify(data[i]) + opts.close;
      }
      return dataString;
    };

    // context
    var bypass = function (dataArray, data) {
      dataArray[0] = dataArray[0] + data.msg;
      return dataArray;
    };
    var server = function (dataArray, data) {
      var csi = '\x1B[';
      var styles = [];
      var keys = Object.keys(data), i = keys.length;
      while (i--) if (keys[i] !== 'msg') styles.push(keys[i] !== 'background-color' ? ansiKeys[data[keys[i]]] || data[keys[i]] : ansiKeys[data[keys[i]]] + 10);
      dataArray[0] += csi + styles.join(';') + 'm' + data.msg + csi + '0m';
      return dataArray;
    };
    var browser = function (dataArray, data) {
      dataArray[0] = dataArray[0] + '%c' + data.msg;
      var styles = [];
      var keys = Object.keys(data), i = keys.length;
      while (i--) if (keys[i] !== 'msg') styles.push(keys[i] + ': ' + data[keys[i]]);
      dataArray.push(styles.join('; '));
      return dataArray;
    };

    // helpers
    var objectify = function (data, opts) {
      if (data.indexOf(opts.open + '{') === 0 && data.indexOf('}' + opts.close) === data.length - 4) data = JSON.parse(data.substr(3, data.length - 6));
      else data = { msg: data };
      return data;
    };
    var split = function (data, opts) {
      return data.match(new RegExp(opts.open + '{.*?}' + opts.close + '|.*?(?=' +  opts.open + '{)|.*', 'g')).reverse();
    };
    var stringify = function (data) {
      var type = typeof data;
      if (type === 'string' || type === 'number' || type === 'boolean') return String(data);
      if (type === 'object') return JSON.stringify(data);
      return '';
    };

    // finalizers
    C.prototype.concat = function (args) {
      if (!args) return;
      args = Array.prototype.slice.call(args, 0).reverse();
      var argString = '';
      var i = args.length;
      while (i--) {
        var type = typeof args[i];
        if (i !== args.length - 1) argString += ' ' + digest('-', this.opts.hyphen, this.opts) + ' ';
        if (type === 'string' || type === 'number' || type === 'boolean') argString += digest(String(args[i]), this.opts[type], this.opts);
        if (type === 'object') argString += this.object(args[i], { post: false });
      }
      return argString;
    };
    C.prototype.post = function (method, args, opts) {
      if (!support.console(method)) return;
      if (!args) return;
      args = typeof args === 'string' ? args : this.concat(args);
      if (support.apply(method)) return console[method].apply(console, apply(args, opts));
      return console[method](apply(args, opts).join(' '));
    };

    // extensions of the original console object
    C.prototype.log = function () {
      return this.post('log', arguments, this.opts);
    };
    C.prototype.error = function () {
      return this.post('error', arguments, this.opts);
    };
    C.prototype.info = function () {
      return this.post('info', arguments, this.opts);
    };
    C.prototype.warn = function () {
      return this.post('warn', arguments, this.opts);
    };

    // text colors
    C.prototype.black = function (data) {
      return digest(data, { color: 'black' }, this.opts);
    };
    C.prototype.red = function (data) {
      return digest(data, { color: 'red' }, this.opts);
    };
    C.prototype.green = function (data) {
      return digest(data, { color: 'green' }, this.opts);
    };
    C.prototype.yellow = function (data) {
      return digest(data, { color: 'yellow' }, this.opts);
    };
    C.prototype.blue = function (data) {
      return digest(data, { color: 'blue' }, this.opts);
    };
    C.prototype.magenta = function (data) {
      return digest(data, { color: 'magenta' }, this.opts);
    };
    C.prototype.cyan = function (data) {
      return digest(data, { color: 'cyan' }, this.opts);
    };
    C.prototype.gray = function (data) {
      return digest(data, { color: 'gray' }, this.opts);
    };

    C.prototype.darkGray = function (data) {
      return digest(data, { color: 'darkGray' }, this.opts);
    };
    C.prototype.brightRed = C.prototype.lightRed = function (data) {
      return digest(data, { color: 'lightRed' }, this.opts);
    };
    C.prototype.brightGreen = C.prototype.lightGreen = function (data) {
      return digest(data, { color: 'lightGreen' }, this.opts);
    };
    C.prototype.brightYellow = C.prototype.lightYellow = function (data) {
      return digest(data, { color: 'lightYellow' }, this.opts);
    };
    C.prototype.brightBlue = C.prototype.lightBlue = function (data) {
      return digest(data, { color: 'lightBlue' }, this.opts);
    };
    C.prototype.brightMagenta = C.prototype.lightMagenta = function (data) {
      return digest(data, { color: 'lightMagenta' }, this.opts);
    };
    C.prototype.brightCyan = C.prototype.lightCyan = function (data) {
      return digest(data, { color: 'lightCyan' }, this.opts);
    };
    C.prototype.white = function (data) {
      return digest(data, { color: 'white' }, this.opts);
    };

    // background colors
    C.prototype.blackBg = function (data) {
      return digest(data, { 'background-color': 'black' }, this.opts);
    };
    C.prototype.redBg = function (data) {
      return digest(data, { 'background-color': 'red' }, this.opts);
    };
    C.prototype.greenBg = function (data) {
      return digest(data, { 'background-color': 'green' }, this.opts);
    };
    C.prototype.yellowBg = function (data) {
      return digest(data, { 'background-color': 'yellow' }, this.opts);
    };
    C.prototype.blueBg = function (data) {
      return digest(data, { 'background-color': 'blue' }, this.opts);
    };
    C.prototype.magentaBg = function (data) {
      return digest(data, { 'background-color': 'magenta' }, this.opts);
    };
    C.prototype.cyanBg = function (data) {
      return digest(data, { 'background-color': 'cyan' }, this.opts);
    };
    C.prototype.grayBg = function (data) {
      return digest(data, { 'background-color': 'gray' }, this.opts);
    };

    C.prototype.darkGrayBg = function (data) {
      return digest(data, { 'background-color': 'darkGray' }, this.opts);
    };
    C.prototype.brightRedBg = C.prototype.lightRedBg = function (data) {
      return digest(data, { 'background-color': 'lightRed' }, this.opts);
    };
    C.prototype.brightGreenBg = C.prototype.lightGreenBg = function (data) {
      return digest(data, { 'background-color': 'lightGreen' }, this.opts);
    };
    C.prototype.brightYellowBg = C.prototype.lightYellowBg = function (data) {
      return digest(data, { 'background-color': 'lightYellow' }, this.opts);
    };
    C.prototype.brightBlueBg = C.prototype.lightBlueBg = function (data) {
      return digest(data, { 'background-color': 'lightBlue' }, this.opts);
    };
    C.prototype.brightMagentaBg = C.prototype.lightMagentaBg = function (data) {
      return digest(data, { 'background-color': 'lightMagenta' }, this.opts);
    };
    C.prototype.brightCyanBg = C.prototype.lightCyanBg = function (data) {
      return digest(data, { 'background-color': 'lightCyan' }, this.opts);
    };
    C.prototype.whiteBg = function (data) {
      return digest(data, { 'background-color': 'white' }, this.opts);
    };

    // styles
    C.prototype.bold = function (data) {
      return digest(data, { 'font-weight': 'bold' }, this.opts);
    };
    C.prototype.lighter = C.prototype.faint = function (data) {
      return digest(data, { 'font-weight': 'lighter' }, this.opts);
    };
    C.prototype.italic = function (data) {
      return digest(data, { 'font-style': 'italic' }, this.opts);
    };
    C.prototype.underline = function (data) {
      return digest(data, { 'text-decoration': 'underline' }, this.opts);
    };
    C.prototype.blink = function (data) {
      return digest(data, { blink: 'blink' }, this.opts);
    };
    C.prototype.blinkFast = function (data) {
      return digest(data, { blink: 'blinkFast' }, this.opts);
    };
    C.prototype.negative = C.prototype.inverse = function (data) {
      return digest(data, { negative: 'negative' }, this.opts);
    };
    C.prototype.hidden = C.prototype.conceal = function (data) {
      return digest(data, { visibility: 'hidden' }, this.opts);
    };
    C.prototype.lineThrough = C.prototype.crossedOut = function (data) {
      return digest(data, { 'text-decoration': 'line-through' }, this.opts);
    };

    // images
    C.prototype.image = function (url, opts) {
      if (env !== 'browser' || !url) return '';
      opts = opts || {};
      if (opts.post === false && opts.width && opts.height) { // return image or fallback text for display alongside other strings or consolator objects
        if (!support.images()) return opts.fallback || '';
        return digest('', imageStyles(url, opts.width, opts.height), this.opts);
      }
      var self = this;
      if (!support.images()) { // post fallback message
        window.setTimeout(function () {
          self.post(opts.method || 'log', opts.fallback || '', self.opts);
        }, 50);
        return;
      }
      var img = window.document.createElement('img');
      img.onload = function () { // post image when it has loaded
        var width = opts.width ? opts.width : opts.height ? opts.height * img.width / img.height : img.width;
        var height = opts.height ? opts.height : opts.width ? opts.width * img.height / img.width : img.height;
        self.post(opts.method || 'log', digest('', imageStyles(url, width, height), self.opts), self.opts);
      };
      img.src = url;
      return;
    };

    // timestamp
    C.prototype.date = C.prototype.time = function (opts) {
      opts = opts || {};
      var date = new Date();
      return digest(date.getDate() + ' ' + months[date.getMonth()].abbreviation + ' ' + twoChar(date.getHours()) + ':' + twoChar(date.getMinutes()) + ':' + twoChar(date.getSeconds()), opts.time || this.opts.time, this.opts);
    };

    // objects and arrays
    C.prototype.object = function (data, opts) {
      if (typeof data !== 'object') return;
      opts = opts || {};
      opts.indent = opts.indent || '';
      opts.method = opts.method || 'log';
      opts.post = opts.post === false ? false : true;
      opts.singleLine = opts.post === false ? true : opts.singleLine === true ? true : false;

      // punctuation
      var brace = [
        digest('{', opts.brace || opts.punctuation || this.opts.brace, this.opts),
        digest('}', opts.brace || opts.punctuation || this.opts.brace, this.opts)
      ];
      var bracket = [
        digest('[', opts.bracket || opts.punctuation || this.opts.bracket, this.opts),
        digest(']', opts.bracket || opts.punctuation || this.opts.bracket, this.opts)
      ];
      var colon = digest(':', opts.colon || opts.punctuation || this.opts.colon, this.opts);
      var comma = digest(',', opts.comma || opts.punctuation || this.opts.comma, this.opts);
      var quote = digest('"', opts.quote || opts.punctuation || this.opts.quote, this.opts);

      // preparation
      var dataString = '';
      var keys = Object.keys(data).reverse(), i = keys.length;
      if (!opts.singleLine) {
        var objectType = data instanceof Array ? 'Array' : 'Object';
        var objectTitle = opts.title ? digest(opts.title, opts.key || this.opts.key, this.opts) + colon : digest(objectType, opts.type || this.opts.type, this.opts);
        if (!support.console('group')) objectTitle = opts.indent + objectTitle;
        this.post(support.console('group') ? 'group' : opts.method, objectTitle, this.opts);
      }
      opts.indent = opts.indent + '    ';

      // iteration
      while (i--) {
        var line = support.console('group') || opts.singleLine ? '' : opts.indent;
        var type = typeof data[keys[i]];
        if (opts.singleLine && i !== keys.length - 1) line += comma + ' ';
        line += digest(keys[i], opts.key || opts.punctuation || this.opts.key, this.opts) + colon + ' ';
        switch (type) {
          case 'object':
            var _opts = Object.create(opts);
            var open = data[keys[i]] instanceof Array ? bracket[0] : brace[0];
            var close = data[keys[i]] instanceof Array ? bracket[1] : brace[1];
            _opts.title = keys[i];
            if (opts.singleLine) _opts.post = false;
            line += open + ' ' + this.object(data[keys[i]], _opts) + ' ' + close;
            break;
          case 'string':
          case 'boolean':
          case 'number':
            if (type === 'string') line += quote;
            line += digest(data[keys[i]], opts[type] || this.opts[type], this.opts);
            if (type === 'string') line += quote;
            if (opts.post && !opts.singleLine) this.post(opts.method, line, this.opts);
            break;
          default:
            break;
        }
        if (opts.singleLine) dataString += line;
      }

      // conclusion
      if (!opts.singleLine && support.console('groupEnd')) return console.groupEnd();
      if (!opts.post) return dataString;
      if (opts.singleLine) return this.post(opts.method, dataString, this.opts);
    };

    // manual
    C.prototype.ansi = function (code, data) {
      if (env !== 'server') return data;
      var obj = {};
      obj['ansi-' + code] = code;
      return digest(data, obj, this.opts);
    };
    C.prototype.css = function (css, data) {
      if (env !== 'browser') return data;
      return digest(data, css, this.opts);
    };

    // ansi keys
    var ansiKeys = {
      bold: 1,
      lighter: 2,
      italic: 3,
      underline: 4,
      blink: 5,
      blinkFast: 6,
      negative: 7,
      hidden: 8,
      'line-through': 9,
      black: 30,
      red: 31,
      green: 32,
      yellow: 33,
      blue: 34,
      magenta: 35,
      cyan: 36,
      gray: 37,
      darkGray: 90,
      lightRed: 91,
      lightGreen: 92,
      lightYellow: 93,
      lightBlue: 94,
      lightMagenta: 95,
      lightCyan: 96,
      white: 97
    };

    // styles required to properly display images in supported consoles; source: https://github.com/adriancooney/console.image
    var imageStyles = function (url, width, height) {
      return {
        padding: height / 2 + 'px ' + width / 2 + 'px ' + ( height / 2 - 1 ) + 'px',
        'background-image': 'url(' + url + ')',
        'background-size': width + 'px ' + height + 'px',
        'font-size': '1px',
        'line-height': height + 'px'
      };
    };

    // time helpers
    var months = [
      { abbreviation: 'Jan', name: 'January' },
      { abbreviation: 'Feb', name: 'February' },
      { abbreviation: 'Mar', name: 'March' },
      { abbreviation: 'Apr', name: 'April' },
      { abbreviation: 'May', name: 'May' },
      { abbreviation: 'Jun', name: 'June' },
      { abbreviation: 'Jul', name: 'July' },
      { abbreviation: 'Aug', name: 'August' },
      { abbreviation: 'Sep', name: 'September' },
      { abbreviation: 'Oct', name: 'October' },
      { abbreviation: 'Nov', name: 'November' },
      { abbreviation: 'Dec', name: 'December' }
    ];
    var twoChar = function (str) {
      if (!str) return '00';
      str = String(str);
      if (str.length === 1) return '0' + str;
      return str.substr(0, 2);
    };

    // environment/support
    var env = typeof window !== 'undefined' ? 'browser' : 'server';
    var support = {};
    support.apply = function (method) {
      return !!console[method].apply;
    };
    support.console = function (method) {
      return ( typeof console !== 'undefined' && console[method] );
    };
    support.images = function () {
      return !!window.chrome;
    };
    support.styles = function (fallbackSupport) {
      return !!window.chrome || !fallbackSupport;
    };

    // ensure Object method support; Object.keys source: http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html
    if (!Object.keys) Object.keys = function (o) {
      if (o !== Object(o)) throw new TypeError('Object.keys called on a non-object');
      var k=[], p;
      for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
      return k;
    };
    if (!Object.create) Object.create = function (o) {
      if (o !== Object(o)) throw new TypeError('Object.create called on a non-object');
      var _o = {}, k = Object.keys(o), i = k.length;
      while (i--) _o[k[i]] = o[k[i]];
      return _o;
    };

    C.create = function (opts) {
      return new C(opts);
    };

    return C;
  })();

  if (typeof module !== 'undefined' && module.exports) module.exports = Consolator;
  else if (typeof define === 'function' && define.amd) define([], function() { return Consolator; });
  else window.Consolator = Consolator;
})();
