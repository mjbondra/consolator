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

Because of how it currently works, it requires that the consolator log method be used to render these strings to the console -- using the native console methods directly will yield a printed string that contains Consolator objects and tokens rather than styled output.

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
