starling
========


An emulator of wireless device transmissions in the IoT
-------------------------------------------------------

starling provides a friendly interface to emulate wireless device transmissions as they are consumed by [barnacles](https://www.npmjs.com/package/barnacles) (and soon [barnowl](https://www.npmjs.com/package/barnowl) too).  Why the name?  As [Wikipedia explains](http://en.wikipedia.org/wiki/Starling#Mimicry), "Starlings imitate a variety of avian species and have a repertoire of about 15–20 distinct imitations."  Not only are they natural emulators, they're also occasional food for Barn Owls.  Well how about that as a coincidence.


Installation
------------

    npm install starling


Hello starling
--------------

```javascript
var starling = require('starling');
var emulator = new starling();
```

Then browse to [http://localhost:3003](http://localhost:3003) to see the landing page.


starling and barnacles
----------------------

starling can replace [barnowl](https://www.npmjs.com/package/barnowl) as a source of visibilityEvents for [barnacles](https://www.npmjs.com/package/barnacles).  Simply bind barnacles to the instance of starling as follows:

```javascript
notifications.bind({ barnowl: emulator });
```


Options
-------

The following options are supported when instantiating starling (those shown are the defaults):

    {
      httpPort: 3002
    }


What's next?
------------

This is an active work in progress.  Expect regular changes and updates, as well as improved documentation!


License
-------

MIT License

Copyright (c) 2015 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.

