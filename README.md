# Canvas Fit Text

Multi-line fit-text for canvas.
Constrain text by width, or by width and height to allow line wrapping.

## Setup

Download `CanvasFitText.js` and include in your project using a script tag.

```
<script src="./path/to/CanvasFitText.js"></script>
```

## Usage

CanvasFitText extends the native CanvasRenderingContext2D. Use it directly on your context.

```

let canvas = document.querySelect('canvas')
let ctx = canvas.CanvasRenderingContext2D('2d')

// Constrain to width 200px
// Starting from 0,0

text = "Hello world!"
ctx.fitText(text, 0, 0, 200)


// Add height prop to enable line wrapping.
// Constrain text to width 200px and height 100px.
// Starting from 0,0

text = "Hello world! How are you? Ok byeee!"
ctx.fitText(text, 0, 0, 200, 100)

```

## Props

Available props for use with CanvasFitText.

| Prop     | Required | Description                                                | Type   |
| -------- | -------- | ---------------------------------------------------------- | ------ |
| `text`   | Yes      | The text to print                                          | String |
| `x`      | Yes      | X coordinate to start printing                             | String |
| `y`      | Yes      | Y coordinate to start printing                             | String |
| `width`  | Yes      | Max width text can expand to                               | Number |
| `height` | No       | Enables line wrapping. Sets max height text can expand to. | Number |

### Todo

- Integrate w/ context's current font setting, instead of overriding w/ `sans-serif`.
- Possibly add `min-` options. E.g. `min-fontsize`, `min-height`.
