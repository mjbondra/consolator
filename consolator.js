// Consolator - A javascript library for printing styled messages to your console.
//

(function () {
  var Consolator = (function () {

    var C = function (opts) {
      this.opts = opts = opts || {};
      this.opts.open = opts.open || '{{{';
      this.opts.close = opts.close || '}}}';
    };

    // application & consumption
    var apply = function (data, opts) {
      if (!data) return;
      data = split(stringify(data), opts);
      var dataArray = [''];
      var i = data.length;
      while (i--) if (data[i]) {
        data[i] = objectify(data[i], opts);
        dataArray = env === 'browser' ? support.styles() ? browser(dataArray, data[i]) : bypass(dataArray, data[i]) : server(dataArray, data[i]);
      }
      return dataArray;
    };
    var digest = function (data, attribute, value, opts) {
      if (!data) return;
      data = split(stringify(data), opts);
      var dataString = '';
      var i = data.length;
      while (i--) if (data[i]) {
        data[i] = objectify(data[i], opts);
        if (!data[i][attribute]) data[i][attribute] = value;
        dataString = dataString + opts.open + JSON.stringify(data[i]) + opts.close;
      }
      return dataString;
    };
    var post = function (method, args, opts) {
      if (!support.console(method)) return;
      if (support.apply(method)) return console[method].apply(console, apply(args, opts));
      return console[method](apply(args, opts).join(' '));
    };

    // context
    var bypass = function (dataArray, data) {
      dataArray[0] = dataArray[0] + data.msg;
      return dataArray;
    };
    var server = function (dataArray, data) {
      var csi = '\x1B[';
      var styles = [];
      var keys = Object.keys(data);
      var k = keys.length;
      while (k--) if (keys[k] !== 'msg') styles.push(keys[k] !== 'background-color' ? ansiKeys[data[keys[k]]] || data[keys[k]] : ansiKeys[data[keys[k]]] + 10);
      dataArray[0] = dataArray[0] + csi + styles.join(';') + 'm' + data.msg + csi + '0m';
      return dataArray;
    };
    var browser = function (dataArray, data) {
      dataArray[0] = dataArray[0] + '%c' + data.msg;
      var styles = [];
      var keys = Object.keys(data);
      var k = keys.length;
      while (k--) if (keys[k] !== 'msg') styles.push(keys[k] + ': ' + data[keys[k]]);
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
      if (type === 'object') return JSON.stringify(data);
      if (type === 'number') return data.toString();
      if (type === 'string') return data;
      return '';
    };

    // extentions of the original console object
    C.prototype.log = function (data) {
      return post('log', data, this.opts);
    };
    C.prototype.error = function (data) {
      return post('error', data, this.opts);
    };
    C.prototype.info = function (data) {
      return post('info', data, this.opts);
    };
    C.prototype.warn = function (data) {
      return post('warn', data, this.opts);
    };

    // text colors
    C.prototype.black = function (data) {
      return digest(data, 'color', 'black', this.opts);
    };
    C.prototype.red = function (data) {
      return digest(data, 'color', 'red', this.opts);
    };
    C.prototype.green = function (data) {
      return digest(data, 'color', 'green', this.opts);
    };
    C.prototype.yellow = function (data) {
      return digest(data, 'color', 'yellow', this.opts);
    };
    C.prototype.blue = function (data) {
      return digest(data, 'color', 'blue', this.opts);
    };
    C.prototype.magenta = function (data) {
      return digest(data, 'color', 'magenta', this.opts);
    };
    C.prototype.cyan = function (data) {
      return digest(data, 'color', 'cyan', this.opts);
    };
    C.prototype.gray = function (data) {
      return digest(data, 'color', 'gray', this.opts);
    };

    C.prototype.darkGray = function (data) {
      return digest(data, 'color', 'darkGray', this.opts);
    };
    C.prototype.brightRed = C.prototype.lightRed = function (data) {
      return digest(data, 'color', 'lightRed', this.opts);
    };
    C.prototype.brightGreen = C.prototype.lightGreen = function (data) {
      return digest(data, 'color', 'lightGreen', this.opts);
    };
    C.prototype.brightYellow = C.prototype.lightYellow = function (data) {
      return digest(data, 'color', 'lightYellow', this.opts);
    };
    C.prototype.brightBlue = C.prototype.lightBlue = function (data) {
      return digest(data, 'color', 'lightBlue', this.opts);
    };
    C.prototype.brightMagenta = C.prototype.lightMagenta = function (data) {
      return digest(data, 'color', 'lightMagenta', this.opts);
    };
    C.prototype.brightCyan = C.prototype.lightCyan = function (data) {
      return digest(data, 'color', 'lightCyan', this.opts);
    };
    C.prototype.white = function (data) {
      return digest(data, 'color', 'white', this.opts);
    };

    // background colors
    C.prototype.blackBg = function (data) {
      return digest(data, 'background-color', 'black', this.opts);
    };
    C.prototype.redBg = function (data) {
      return digest(data, 'background-color', 'red', this.opts);
    };
    C.prototype.greenBg = function (data) {
      return digest(data, 'background-color', 'green', this.opts);
    };
    C.prototype.yellowBg = function (data) {
      return digest(data, 'background-color', 'yellow', this.opts);
    };
    C.prototype.blueBg = function (data) {
      return digest(data, 'background-color', 'blue', this.opts);
    };
    C.prototype.magentaBg = function (data) {
      return digest(data, 'background-color', 'magenta', this.opts);
    };
    C.prototype.cyanBg = function (data) {
      return digest(data, 'background-color', 'cyan', this.opts);
    };
    C.prototype.grayBg = function (data) {
      return digest(data, 'background-color', 'gray', this.opts);
    };

    C.prototype.darkGrayBg = function (data) {
      return digest(data, 'background-color', 'darkGray', this.opts);
    };
    C.prototype.brightRedBg = C.prototype.lightRedBg = function (data) {
      return digest(data, 'background-color', 'lightRed', this.opts);
    };
    C.prototype.brightGreenBg = C.prototype.lightGreenBg = function (data) {
      return digest(data, 'background-color', 'lightGreen', this.opts);
    };
    C.prototype.brightYellowBg = C.prototype.lightYellowBg = function (data) {
      return digest(data, 'background-color', 'lightYellow', this.opts);
    };
    C.prototype.brightBlueBg = C.prototype.lightBlueBg = function (data) {
      return digest(data, 'background-color', 'lightBlue', this.opts);
    };
    C.prototype.brightMagentaBg = C.prototype.lightMagentaBg = function (data) {
      return digest(data, 'background-color', 'lightMagenta', this.opts);
    };
    C.prototype.brightCyanBg = C.prototype.lightCyanBg = function (data) {
      return digest(data, 'background-color', 'lightCyan', this.opts);
    };
    C.prototype.whiteBg = function (data) {
      return digest(data, 'background-color', 'white', this.opts);
    };

    // styles
    C.prototype.bold = function (data) {
      return digest(data, 'font-weight', 'bold', this.opts);
    };
    C.prototype.lighter = C.prototype.faint = function (data) {
      return digest(data, 'font-weight', 'lighter', this.opts);
    };
    C.prototype.italic = function (data) {
      return digest(data, 'font-style', 'italic', this.opts);
    };
    C.prototype.underline = function (data) {
      return digest(data, 'text-decoration', 'underline', this.opts);
    };
    C.prototype.blink = function (data) {
      return digest(data, 'blink', 'blink', this.opts);
    };
    C.prototype.blinkFast = function (data) {
      return digest(data, 'blink', 'blinkFast', this.opts);
    };
    C.prototype.negative = C.prototype.inverse = function (data) {
      return digest(data, 'negative', 'negative', this.opts);
    };
    C.prototype.hidden = C.prototype.conceal = function (data) {
      return digest(data, 'visibility', 'hidden', this.opts);
    };
    C.prototype.lineThrough = C.prototype.crossedOut = function (data) {
      return digest(data, 'text-decoration', 'line-through', this.opts);
    };

    // timestamp
    C.prototype.date = C.prototype.time = function () {};

    // objects and arrays
    C.prototype.array = C.prototype.object = function () {};

    // manual
    C.prototype.ansi = function (code, data) {
      if (env !== 'server') return data;
      return digest(data, 'ansi-' + code, code, this.opts);
    };
    C.prototype.css = function (css, data) {
      if (env !== 'client') return data;
      return data;
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

    // environment/support
    var env = typeof window !== 'undefined' ? 'browser' : 'server';
    var support = {};
    support.apply = function (method) {
      return !!console[method].apply;
    };
    support.console = function (method) {
      return ( typeof console !== 'undefined' && console[method] );
    };
    support.styles = function () {
      return ( window.chrome || console.firebug || ( console.log.toString && console.log.toString().indexOf('apply') !== -1 ));
    };

    return C;
  })();

  if (typeof module !== 'undefined' && module.exports) module.exports = Consolator;
  else if (typeof define === 'function' && define.amd) define([], function() { return Consolator; });
  else window.Consolator = Consolator;
})();
