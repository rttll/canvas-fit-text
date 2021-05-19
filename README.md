# Canvas Fit Text

Multi-line fit-text for canvas.
Constrain text by width, or by width and height to allow line wrapping.

## Installation

Install w/ yarn or npm and import into your projct.

```bash
yarn add canvas-fit-text
```

Or download the repo and copy `dist/canvas-fit-text.js` to your project.

## Usage

CanvasFitText extends the native CanvasRenderingContext2D. Use it directly on the context.

```js
let text,
  canvas = document.querySelect('canvas'),
  ctx = canvas.CanvasRenderingContext2D('2d');

// Constrain to width 200px
// Starting from 0,0

text = 'Hello world!';
ctx.fitText(text, 0, 0, 200);

// Add height prop to enable line wrapping.
// Constrain text to width 200px and height 100px.
// Starting from 0,0

text = 'Hello world! How are you? Ok byeee!';
ctx.fitText(text, 0, 0, 200, 100);
```

## Usage args

| Arg      | Required | Description                                                | Type   |
| -------- | -------- | ---------------------------------------------------------- | ------ |
| `text`   | Yes      | The text to print                                          | String |
| `x`      | Yes      | X coordinate to start printing                             | String |
| `y`      | Yes      | Y coordinate to start printing                             | String |
| `width`  | Yes      | Max width text can expand to                               | Number |
| `height` | No       | Enables line wrapping. Sets max height text can expand to. | Number |

## Usage Notes

It currently only uses sans-serif.

### Todo

- Integrate w/ context's current font setting, instead of overriding w/ `sans-serif`.
- Possibly add `min-` options. E.g. `min-fontsize`, `min-height`.
