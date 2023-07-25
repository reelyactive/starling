starling.js
===========

__starling.js__ emulates [hyperlocal context](https://www.reelyactive.com/context/).

__starling.js__ is lightweight client-side JavaScript that runs in the browser.  See a live demo using the code in this repository at: [reelyactive.github.io/starling](https://reelyactive.github.io/starling)


Hello starling.js!
------------------

Include in an _index.html_ file the __starling.js__ script:

```html
<html>
  <head></head>
  <body>
    <script src="js/starling.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

Include in a _js/app.js_ the code to query the emulated hyperlocal context:

```javascript
let context = starling.getContext('/context');
```

Open the _index.html_ file in a web browser for __starling.js__ to emulate the hyperlocal context graph.


Supported functions
-------------------

### on

Documentation to come.

### getContext

Documentation to come.

### connect

Documentation to come.


![starling logo](https://reelyactive.github.io/starling/images/starling-bubble.png)


What's in a name?
-----------------

As [Wikipedia explains](https://en.wikipedia.org/wiki/Starling#Mimicry), "Starlings imitate a variety of avian species and have a repertoire of about 15–20 distinct imitations." Actually, they can mimic plenty besides other avian species. There are some great videos of starlings mimicking telephones, classical music and more. "Calls that are simple in frequency structure and calls that show little amplitude modulation are preferentially imitated". That's fitting given that the wireless devices currently supported by reelyActive hardware all communicate using [Frequency-Shift Keying](https://en.wikipedia.org/wiki/Frequency-shift_keying) (FSK) which involves no amplitude modulation.

Not only are starlings natural emulators, they're also occasional food for Barn Owls. Well how about that for a coincidence.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.

[![Known Vulnerabilities](https://snyk.io/test/github/reelyactive/starling/tree/gh-pages/badge.svg)](https://snyk.io/test/github/reelyactive/starling/tree/gh-pages)


License
-------

MIT License

Copyright (c) 2023 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
