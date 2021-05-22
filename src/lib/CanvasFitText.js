module.exports = function (text, x, y, width, height) {
  const ctx = this;
  const fontBase = ctx.font;
  const fontResetSize = 1;

  let fontSize = fontResetSize,
    lineHeight = 1.2,
    widthChangePerFontSize;

  function setFont(size) {
    let font = fontBase.replace(/[0-9]+(em|px)/, `${size}px`);
    ctx.font = `${font}`;
  }

  function getMetrics(text) {
    let m = ctx.measureText(text);
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
      setFont(fontSize);
    }
  }

  function setFontSizeByWidth() {
    let widthDiff = parseFloat(width - getMetrics(text).width),
      fontIncrease = widthDiff / widthChangePerFontSize;
    setFont(fontSize + fontIncrease);
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
      ctx.fillText(line, x, y);
      y += lineHeight * fontSize;
    }
  }

  function calcWidthChangePerFontSize() {
    let metrics = getMetrics(text),
      startWidth = metrics.width;

    setFont(fontSize + 1);
    widthChangePerFontSize = getMetrics(text).width - startWidth;

    // Reset font or calcWidth() will not increase enough
    setFont(fontResetSize);
  }

  (function () {
    if (width === undefined) {
      throw new Error('CanvasFitText: width is required');
    }

    // Set starting font size, so we're always increasing the font up to reach target width
    // i.e. Can ignore if the starting width is higher than target width
    setFont(fontResetSize);

    if (height) {
      setFontSizeByArea();
      var lines = getTextToLines();
      writeText(lines);
    } else {
      calcWidthChangePerFontSize();
      setFontSizeByWidth();
      writeText([text]);
    }
    // Reset font
    ctx.font = fontBase;
  })();
};
