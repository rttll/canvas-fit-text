# Canvas Fit Text

Fit-text for canvas, with optional line-wrapping.  
Integrates with and preserves the context's current font value.

## Installation

Install w/ yarn or npm...

```bash
yarn add canvas-fit-text
```

...and import into your projct.

```bash
# ES6
import fitText from 'canvas-fit-text';

# or CommonJS
var fitText = require('canvas-fit-text');

```

Or download the repo and copy `dist/canvas-fit-text.js` to your project.

## Usage

CanvasFitText extends the native CanvasRenderingContext2D.  
Use it directly on the context.

```js
let canvas = document.querySelect('canvas'),
  ctx = canvas.CanvasRenderingContext2D('2d');

// Fit to width 200px.
ctx.fitText('Hello world!', 0, 0, 200);

// Fit to width 200px.
// Constrain to height 100px (which also enables line wrapping)
let text = 'Hello world! How are you? Ok byeee!';
ctx.fitText(text, 0, 0, 200, 100);
```

Original context font value is preserved (after fit).

```js
let canvas = document.querySelect('canvas'),
  ctx = canvas.CanvasRenderingContext2D('2d');

// Current font
ctx.font = '12px sans-serif';

// Will print at ~439px sans-serif
ctx.fitText('foo', 0, 0, 600);

// Font was reverted back.
console.log(ctx.font);
// ➜ 12px sans-serif
```

## Usage args

| Arg      | Required | Description                                                | Type   |
| -------- | -------- | ---------------------------------------------------------- | ------ |
| `text`   | Yes      | The text to print                                          | String |
| `x`      | Yes      | X coordinate to start printing                             | String |
| `y`      | Yes      | Y coordinate to start printing                             | String |
| `width`  | Yes      | Max width text can expand to                               | Number |
| `height` | No       | Enables line wrapping. Sets max height text can expand to. | Number |

## Notes

Setting height will constrain `max-height`. Not `min-height`. So, setting width and height will often leave vertical and horizontal space.

With only the width prop, the text will fit horizontally right to the edge.
