
(function () {
  var Consolator = (function () {

    var C = function (opts) {
      opts = opts || {};
    };

    // application & consumption
    var apply = function (data) {
      if (!data) return;
      data = split(stringify(data));
      var dataArray = [''];
      var i = data.length;
      while (i--) if (data[i]) {
        data[i] = objectify(data[i]);
        var keys = Object.keys(data[i]);
        var k = keys.length;
        dataArray = env === 'browser' ? support.styles ? browser(dataArray, data[i], keys) : bypass(dataArray, data[i]) : server(dataArray, data[i], keys);
      }
      return dataArray;
    };
    var digest = function (data, attribute, value) {
      if (!data) return;
      data = split(stringify(data));
      var dataString = '';
      var i = data.length;
      while (i--) if (data[i]) {
        data[i] = objectify(data[i]);
        if (!data[i][attribute]) data[i][attribute] = value;
        dataString = dataString + '{{{' + JSON.stringify(data[i]) + '}}}';
      }
      return dataString;
    };
    var post = function (method, args) {
      console[method].apply(console, apply(args));
    };

    // context
    var bypass = function (dataArray, data) {
      dataArray[0] = dataArray[0] + data.msg;
      return dataArray;
    };
    var server = function (dataArray, data, keys) {
      var csi = '\x1B[';
      var styles = [];
      var k = keys.length;
      while (k--) if (keys[k] !== 'msg') styles.push(( keys[k] !== 'background-color' ? ansiKeys[data[keys[k]]] : ansiKeys[data[keys[k]]] + 10 ));
      dataArray[0] = dataArray[0] + csi + styles.join(';') + 'm' + data.msg + csi + '0m';
      return dataArray;
    };
    var browser = function (dataArray, data, keys) {
      dataArray[0] = dataArray[0] + '%c' + data.msg;
      var styles = [];
      var k = keys.length;
      while (k--) if (keys[k] !== 'msg') styles.push(keys[k] + ': ' + data[keys[k]]);
      dataArray.push(styles.join('; '));
      return dataArray;
    };

    // helpers
    var objectify = function (data) {
      if (data.indexOf('{{{{') === 0 && data.indexOf('}}}}') === data.length - 4) data = JSON.parse(data.substr(3, data.length - 6));
      else data = { msg: data };
      return data;
    };
    var split = function (data) {
      return data.match(/\{\{\{\{.*?\}\}\}\}|.*?(?=\{\{\{\{)|.*/g).reverse();
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
      return post('log', data);
    };
    C.prototype.error = function (data) {
      return post('error', data);
    };
    C.prototype.info = function (data) {
      return post('info', data);
    };
    C.prototype.warn = function (data) {
      return post('warn', data);
    };

    // text colors
    C.prototype.black = function (data) {
      return digest(data, 'color', 'black');
    };
    C.prototype.red = function (data) {
      return digest(data, 'color', 'red');
    };
    C.prototype.green = function (data) {
      return digest(data, 'color', 'green');
    };
    C.prototype.yellow = function (data) {
      return digest(data, 'color', 'yellow');
    };
    C.prototype.blue = function (data) {
      return digest(data, 'color', 'blue');
    };
    C.prototype.magenta = function (data) {
      return digest(data, 'color', 'magenta');
    };
    C.prototype.cyan = function (data) {
      return digest(data, 'color', 'cyan');
    };
    C.prototype.gray = function (data) {
      return digest(data, 'color', 'gray');
    };

    C.prototype.darkGray = function (data) {
      return digest(data, 'color', 'darkGray');
    };
    C.prototype.brightRed = C.prototype.lightRed = function (data) {
      return digest(data, 'color', 'lightRed');
    };
    C.prototype.brightGreen = C.prototype.lightGreen = function (data) {
      return digest(data, 'color', 'lightGreen');
    };
    C.prototype.brightYellow = C.prototype.lightYellow = function (data) {
      return digest(data, 'color', 'lightYellow');
    };
    C.prototype.brightBlue = C.prototype.lightBlue = function (data) {
      return digest(data, 'color', 'lightBlue');
    };
    C.prototype.brightMagenta = C.prototype.lightMagenta = function (data) {
      return digest(data, 'color', 'lightMagenta');
    };
    C.prototype.brightCyan = C.prototype.lightCyan = function (data) {
      return digest(data, 'color', 'lightCyan');
    };
    C.prototype.white = function (data) {
      return digest(data, 'color', 'white');
    };

    // background colors
    C.prototype.blackBg = function (data) {
      return digest(data, 'background-color', 'black');
    };
    C.prototype.redBg = function (data) {
      return digest(data, 'background-color', 'red');
    };
    C.prototype.greenBg = function (data) {
      return digest(data, 'background-color', 'green');
    };
    C.prototype.yellowBg = function (data) {
      return digest(data, 'background-color', 'yellow');
    };
    C.prototype.blueBg = function (data) {
      return digest(data, 'background-color', 'blue');
    };
    C.prototype.magentaBg = function (data) {
      return digest(data, 'background-color', 'magenta');
    };
    C.prototype.cyanBg = function (data) {
      return digest(data, 'background-color', 'cyan');
    };
    C.prototype.grayBg = function (data) {
      return digest(data, 'background-color', 'gray');
    };

    C.prototype.darkGrayBg = function (data) {
      return digest(data, 'background-color', 'darkGray');
    };
    C.prototype.brightRedBg = C.prototype.lightRedBg = function (data) {
      return digest(data, 'background-color', 'lightRed');
    };
    C.prototype.brightGreenBg = C.prototype.lightGreenBg = function (data) {
      return digest(data, 'background-color', 'lightGreen');
    };
    C.prototype.brightYellowBg = C.prototype.lightYellowBg = function (data) {
      return digest(data, 'background-color', 'lightYellow');
    };
    C.prototype.brightBlueBg = C.prototype.lightBlueBg = function (data) {
      return digest(data, 'background-color', 'lightBlue');
    };
    C.prototype.brightMagentaBg = C.prototype.lightMagentaBg = function (data) {
      return digest(data, 'background-color', 'lightMagenta');
    };
    C.prototype.brightCyanBg = C.prototype.lightCyanBg = function (data) {
      return digest(data, 'background-color', 'lightCyan');
    };
    C.prototype.whiteBg = function (data) {
      return digest(data, 'background-color', 'white');
    };

    // styles
    C.prototype.bold = function (data) {
      return digest(data, 'font-weight', 'bold');
    };
    C.prototype.lighter = C.prototype.faint = function (data) {
      return digest(data, 'font-weight', 'lighter');
    };
    C.prototype.italic = function (data) {
      return digest(data, 'font-style', 'italic');
    };
    C.prototype.underline = function (data) {
      return digest(data, 'text-decoration', 'underline');
    };
    C.prototype.blink = function (data) {
      return digest(data, 'blink', 'blink');
    };
    C.prototype.blinkFast = function (data) {
      return digest(data, 'blink', 'blinkFast');
    };
    C.prototype.negative = C.prototype.inverse = function (data) {
      return digest(data, 'negative', 'negative');
    };
    C.prototype.hidden = C.prototype.conceal = function (data) {
      return digest(data, 'visibility', 'hidden');
    };
    C.prototype.lineThrough = C.prototype.crossedOut = function (data) {
      return digest(data, 'text-decoration', 'line-through');
    };

    // timestamp


    // objects and arrays
    C.prototype.array = function () {};
    C.prototype.object = function () {};

    // manual
    C.prototype.ansi = function () {};
    C.prototype.css = function () {};

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
    support.apply = false;
    support.console = false;
    support.styles = ( typeof window !== 'undefined' && ( window.chrome || console.firebug || console.log.toString().indexOf('apply') !== -1 ));

    return C;
  })();

  if (typeof module !== 'undefined' && module.exports) module.exports = Consolator;
  else if (typeof define === 'function' && define.amd) define([], function() { return Consolator; });
  else window.Consolator = Consolator;
})();
