starling
========


Emulator of wireless device transmissions in the IoT
----------------------------------------------------

__starling__ is an emulator of decoded wireless device transmissions.


Installation
------------

    npm install starling


Hello starling!
---------------

```javascript
const Starling = require('starling');

let emulator = new Starling();

emulator.emulate();

emulator.on('raddec', function(raddec) {
  console.log(raddec);
});
```


![starling logo](https://reelyactive.github.io/starling/images/starling-bubble.png)


What's in a name?
-----------------

As [Wikipedia explains](https://en.wikipedia.org/wiki/Starling#Mimicry), "Starlings imitate a variety of avian species and have a repertoire of about 15–20 distinct imitations."  Actually, they can mimic plenty besides other avian species.  There are some great videos of starlings mimicking telephones, classical music and more.  "Calls that are simple in frequency structure and calls that show little amplitude modulation are preferentially imitated".  That's fitting given that the wireless devices currently supported by reelyActive hardware all communicate using [Frequency-Shift Keying (FSK)](https://en.wikipedia.org/wiki/Frequency-shift_keying) which involves no amplitude modulation.

Not only are starlings natural emulators, they're also occasional food for Barn Owls.  Well how about that for a coincidence.


What's next?
------------

__starling__ v1.0.0 was released in November 2019, superseding all earlier versions, the latest of which remains available in the [release-0.1 branch](https://github.com/reelyactive/starling/tree/release-0.1) and as [starling@0.1.0 on npm](https://www.npmjs.com/package/starling/v/0.1.0).

If you're developing with barnowl check out:
* [diyActive](https://reelyactive.github.io/) our developer page
* our [node-style-guide](https://github.com/reelyactive/node-style-guide) for development
* our [contact information](https://www.reelyactive.com/contact/) to get in touch if you'd like to contribute


License
-------

MIT License

Copyright (c) 2015-2019 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
