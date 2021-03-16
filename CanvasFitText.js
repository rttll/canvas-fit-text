class CanvasFitText {
  
  constructor(selector, text, width, height) {
    this.canvas = document.querySelector(selector)
    this.ctx = this.canvas.getContext('2d');
    this.text = text
    var rect = this.canvas.getBoundingClientRect();
    this.width = Math.min(width, rect.width) 
    this.height = Math.min(height, rect.height)
    
    this.over = false
    this.under = false
    this.fontSize = 16
    this.ctx.textBaseline = 'top'
    
    this.calcLines()
    this.writeLines()
  }

  textWidth(text) {
    let metrics = this.ctx.measureText(text)
    return Math.abs(metrics.actualBoundingBoxLeft) + 
      Math.abs(metrics.actualBoundingBoxRight)
  }
  
  textHeight(text) {
    let metrics = this.ctx.measureText(text)
    return Math.abs(metrics.fontBoundingBoxAscent) + 
      Math.abs(metrics.fontBoundingBoxDescent)
  }
  
  lineHeight() {
    return this.fontSize * 1.2
  }
  
  totalHeight() {
    let totalWidth = this.textWidth(this.text)
    let rows = Math.ceil(totalWidth / this.width)  
    let totalTextHeight = rows * this.textHeight(this.text) 
    let rowsHeight = (rows - 1) * this.lineHeight()
    return totalTextHeight + rowsHeight
  }
  
  setFontSize(size = this.fontSize) {
    this.ctx.font = `${size}px sans-serif`
  }
  
  getBox() {
    let d = {
      width: this.textWidth(this.text),
      height: this.totalHeight()
    }
    return d
  }

  checkBox() {
    let box = this.getBox()
    this.over = box.width > this.width && box.height > this.height
    this.under = box.height < this.height
  }

  calcLines() {
    
    this.checkBox()
    let wentUp = false, wentDown = false
    while ( (this.over || this.under) ) {
      this.checkBox()
      if ( this.over ) {
        this.setFontSize(this.fontSize -= 1)
      } else if (this.under) {
        if ( wentDown && wentUp) break
        this.setFontSize(this.fontSize += 1)
      }
      this.over ? wentDown = true : wentUp = true
    }

  }

  writeLines() {
    let words = this.text.split(' ')
    let line = ''
    let y = 0
    for ( let i = 0; i < words.length; i++ ) {
      let word = words[i]
      if ( this.textWidth(line + `${word} `) > this.width - 10 ) {
        this.ctx.fillText(line, 0, y)
        line = `${word} `
        y += this.lineHeight()
      } else {
        line += `${word} `
      }
      if ( i === words.length - 1 ) this.ctx.fillText(line, 0, y)
    }
  }
  
}
