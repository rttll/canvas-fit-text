module.exports = function (text, x, y, width, height) {
  var _this = this,
    baseFontSize = 1,
    fontSize = baseFontSize,
    widthChangePerFontSize,
    lineHeight = 1.2;

  function getMetrics(text) {
    let m = _this.measureText(text);
    return {
      width:
        Math.abs(m.actualBoundingBoxLeft) + Math.abs(m.actualBoundingBoxRight),
      height:
        Math.abs(m.fontBoundingBoxAscent) + Math.abs(m.fontBoundingBoxDescent),
    };
  }

  function calcArea() {
    let metrics = getMetrics(text);
    let rowHeight = metrics.height + fontSize * lineHeight;
    return metrics.width * rowHeight;
  }

  function setFontSizeByArea() {
    let currArea = calcArea();
    while (currArea < width * height) {
      currArea = calcArea();
      fontSize++;
      _this.font = `${fontSize}px sans-serif`;
    }
  }

  function setFontSizeByWidth() {
    let widthDiff = parseFloat(width - getMetrics(text).width),
      fontIncrease = widthDiff / widthChangePerFontSize;
    _this.font = `${fontSize + fontIncrease}px sans-serif`;
  }

  function getTextToLines() {
    let lines = [],
      line = '',
      words = text.split(' ');
    while ((word = words.shift())) {
      let lineMetrics = getMetrics(line),
        wordMetrics = getMetrics(` ${word}`);
      if (lineMetrics.width + wordMetrics.width < width) {
        line += ` ${word}`;
      } else {
        lines.push(line.trim());
        line = word;
      }
    }
    lines.push(line.trim());
    return lines;
  }

  function writeText(lines) {
    for (let line of lines) {
      _this.fillText(line, x, y);
      y += lineHeight * fontSize;
    }
  }

  function calcWidthChangePerFontSize() {
    let metrics = getMetrics(text),
      startWidth = metrics.width;

    _this.font = `${fontSize + 1}px sans-serif`;
    widthChangePerFontSize = getMetrics(text).width - startWidth;

    // Reset font or calcWidth() will not increase enough
    _this.font = `${baseFontSize}px sans-serif`;
  }

  (function () {
    if (width === undefined) {
      throw new Error('CanvasFitText: width is required');
    }

    // Set starting font size, so we're always increasing the font up to reach target width
    // i.e. Can ignore if the starting width is higher than target width
    _this.font = `${baseFontSize}px sans-serif`;

    if (height) {
      setFontSizeByArea();
      var lines = getTextToLines();
      writeText(lines);
    } else {
      calcWidthChangePerFontSize();
      setFontSizeByWidth();
      writeText([text]);
    }
  })();
};
