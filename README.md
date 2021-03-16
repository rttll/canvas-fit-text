# Canvas Fit Text
Multi-line fit-text for canvas. 
Splits a string into multiple lines, capped at a max width and height. Good times.

## Setup

Include `CanvasFitText.js` in your project. It's currently only available as a direct include via script tag.

## Usage

Pass a reference to your canvase element, and options to CanvasFitText. 

Like this:

```

let selector = 'canvas'
let text = "Hello world!"
let maxWidth = 400
let maxHeight = 120

const fit = new CanvasFitText(selector, text, maxWidth, maxHeight)

```

TODO: 

lineheight setting