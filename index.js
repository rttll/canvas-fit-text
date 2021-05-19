exports = (function () {
  if (typeof CanvasRenderingContext2D.prototype.fitText !== 'undefined') return;
  CanvasRenderingContext2D.prototype.fitText = require('./lib/CanvasFitText');
})();
