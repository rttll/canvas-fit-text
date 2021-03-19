
CanvasRenderingContext2D.prototype.fitText = function(text, x, y, width, height) {
  var _this = this;
  var baseFontSize = 1
  var fontSize = baseFontSize
  var widthChangePerFontSize;
  var lines = []

  function resetFont() {
    _this.font = `${baseFontSize}px sans-serif`
  }

  function lineHeight() {
    return _this.fontSize * 1.2
  }

  function metrics(text) {
    let m = _this.measureText(text)
    return {
      width: (Math.abs(m.actualBoundingBoxLeft) + Math.abs(m.actualBoundingBoxRight)),
      height: (Math.abs(m.fontBoundingBoxAscent) + Math.abs(m.fontBoundingBoxDescent))
    }
  }

  // TODO multi-line text
  function fitBox() {}

  function calcWidth() {
    let widthDiff = parseFloat(width - metrics(text).width)
    let fontIncrease = widthDiff / widthChangePerFontSize
    _this.font = `${fontSize + fontIncrease}px sans-serif`
  }

  function writeText() {
    for ( let line of lines ) {
      _this.fillText(line, x, y)
      y += lineHeight()
    }
  }
  
  (function() {

    if ( width === undefined ) {
      throw new Error('CanvasFitText: width is required')
    }

    // console.log(`starting at ${metrics(text).width}`)

    // Set starting font size, so we're always increasing the font up to reach target width
    // i.e. Can ignore if the starting width is higher than target width
    _this.font = `${baseFontSize}px sans-serif`

    // Calculate width change per font size
    let startWidth = metrics(text).width
    _this.font = `${fontSize+1}px sans-serif`
    widthChangePerFontSize = metrics(text).width - startWidth
    // Reset font or calcWidth() will not increase enough
    resetFont()
    

    if (height) {
      fitBox()
    } else {
      calcWidth()
      lines.push(text)
    }
    
    writeText()

    // console.log(`ending at ${metrics(text).width}`)

  })()
}
