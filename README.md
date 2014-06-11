# Consolator

A JavaScript library for printing styled messages to the console.

## Caveat

This is a proof of concept -- that a single library, with a single API, can create styled console output on both the server (Node.js) and in the browser (Chrome & Firebug).

Significant and/or breaking changes will be marked as a major release (0.x.x, 1.x.x, 2.x.x, etc).

All releases before 1.x.x should be considered unstable, and unfit for production. Subsequent to that release, even-numbered minor releases will denote stable releases (1.0.x, 1.2.x, etc), while odd-numbered minor releases will be unstable (1.1.x, 1.3.x, etc).

## Installation

```
npm install consolator
```

## How It (Currently) Works

Consolator wraps messages in POJOs and then stringifies them, adding a surrounding, customizable opening and closing token ('{{{' and '}}}' by default).

Because of how it currently works, it requires that consolator methods be used to render these strings to the console -- using the native console methods directly will yield a printed string that contains Consolator objects and tokens rather than styled output.

If the native console does not support styled output, messages are simply printed without styles.

## Usage

Server:

```
var Consolator = require('consolator');
var c = new Consolator();

c.log(c.green('This demostrates ' + c.bold('nested')) + ' styles');
```

Browser (supports styled output with Chrome and Firebug):

```<script src="consolator.min.js"></script>```

```
var c = new Consolator();

c.log(c.green('This demostrates ' + c.bold('nested')) + ' styles');
```

## API

This is a placeholder for a more complete explanation.

### Posting Methods

#### Extensions of Console Methods

These methods are required to post non-posting Consolator methods.

* Consolator.prototype.error(arguments)
* Consolator.prototype.info(arguments)
* Consolator.prototype.log(arguments)
* Consolator.prototype.warn(arguments)

#### Other Posting Methods

* Consolator.prototype.object(object, opts)
* Consolator.prototype.image(url, opts)

Console images are only supported by Chrome at this time. ```opts.fallback``` is gracefully-degrading option that has the effect of a posting method, and can contain any of the non-posting methods as a part of its value. For example, ```{ fallback: c.bold('some text') }``` would be a valid ```opts``` argument.

### Non-posting Methods

These must be wrapped within a posting method, such as ```Consolator.prototype.log```

#### Colors

* Consolator.prototype.black(string|number|boolean|object)
* Consolator.prototype.red(string|number|boolean|object)
* Consolator.prototype.green(string|number|boolean|object)
* Consolator.prototype.yellow(string|number|boolean|object)
* Consolator.prototype.blue(string|number|boolean|object)
* Consolator.prototype.magenta(string|number|boolean|object)
* Consolator.prototype.cyan(string|number|boolean|object)
* Consolator.prototype.gray(string|number|boolean|object)
* Consolator.prototype.darkGray(string|number|boolean|object)
* Consolator.prototype.lightRed(string|number|boolean|object)
* Consolator.prototype.lightGreen(string|number|boolean|object)
* Consolator.prototype.lightYellow(string|number|boolean|object)
* Consolator.prototype.lightBlue (string|number|boolean|object)
* Consolator.prototype.lightMagenta(string|number|boolean|object)
* Consolator.prototype.lightCyan(string|number|boolean|object)
* Consolator.prototype.white(string|number|boolean|object)

#### Background Colors

* Consolator.prototype.blackBg(string|number|boolean|object)
* Consolator.prototype.redBg(string|number|boolean|object)
* Consolator.prototype.greenBg(string|number|boolean|object)
* Consolator.prototype.yellowBg(string|number|boolean|object)
* Consolator.prototype.blueBg(string|number|boolean|object)
* Consolator.prototype.magentaBg(string|number|boolean|object)
* Consolator.prototype.cyanBg(string|number|boolean|object)
* Consolator.prototype.grayBg(string|number|boolean|object)
* Consolator.prototype.darkGrayBg(string|number|boolean|object)
* Consolator.prototype.lightRedBg(string|number|boolean|object)
* Consolator.prototype.lightGreenBg(string|number|boolean|object)
* Consolator.prototype.lightYellowBg(string|number|boolean|object)
* Consolator.prototype.lightBlue Bg(string|number|boolean|object)
* Consolator.prototype.lightMagentaBg(string|number|boolean|object)
* Consolator.prototype.lightCyanBg(string|number|boolean|object)
* Consolator.prototype.whiteBg(string|number|boolean|object)

#### Styles

* Consolator.prototype.bold(string|number|boolean|object)
* Consolator.prototype.faint(string|number|boolean|object)
* Consolator.prototype.italic(string|number|boolean|object)
* Consolator.prototype.underline(string|number|boolean|object)
* Consolator.prototype.blink(string|number|boolean|object)
* Consolator.prototype.blinkFast(string|number|boolean|object)
* Consolator.prototype.negative(string|number|boolean|object)
* Consolator.prototype.hidden(string|number|boolean|object)
* Consolator.prototype.lineThrough(string|number|boolean|object)

#### Timestamp

* Consolator.prototype.time()

#### ANSI Escape Codes (server)

[http://en.wikipedia.org/wiki/ANSI_escape_code]()

* Consolator.prototype.ansi(code, string|number|boolean|object)

#### CSS (Chrome & Firebug)

* Consolator.prototype.css(properties, string|number|boolean|object)

The ```properties``` argument should take the form of an object. For example, the following would be valid:

```
{ padding: '10px 20px', 'font-size': '14px', 'font-weight': 'bold' }
```

## Tests

Coming soon.

## License

The MIT License (MIT)

Copyright (c) 2014 Michael J. Bondra < [mjbondra@gmail.com](mailto:mjbondra@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
