'use strict'

let Point = require('./Point');
let CanvasError = require('./CanvasError');

class Canvas {
  constructor() {
    this.verticalBorderWidth = 1;
    this.horizontalBorderWidth = 1;
    this.create(1, 1);
  }

  /**
   * @param {number} maxHeight
   */
  set maxHeight(maxHeight) {
    this._maxHeight = maxHeight;
  }

  /**
   * @return {number}
   */
  get maxHeight() {
    return this._maxHeight;
  }

  /**
   * @param {number} maxWidth
   */
  set maxWidth(maxWidth) {
    this._maxWidth = maxWidth;
  }

  /**
   * @return {number}
   */
  get maxWidth() {
    return this._maxWidth;
  }

  /**
   * @param {number} horizontalBorderWidth
   */
  set horizontalBorderWidth(horizontalBorderWidth) {
    this._horizontalBorderWidth = horizontalBorderWidth;
  }

  /**
   * @return {number}
   */
  get horizontalBorderWidth() {
    return this._horizontalBorderWidth;
  }

  /**
   * @param {number} verticalBorderWidth
   */
  set verticalBorderWidth(verticalBorderWidth) {
    this._verticalBorderWidth = verticalBorderWidth;
  }

  /**
   * @return {number}
   */
  get verticalBorderWidth() {
    return this._verticalBorderWidth;
  }

  /**
   * Initializes the inner storage for canvas points.
   * Points are stored in an array indexed from 0 to size-1
   * @param {number} width of the canvas
   * @param {number} height of the canvas
   */
  create(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number' ||
      isNaN(width) || isNaN(height) || width < 1 || height < 1)
      throw new CanvasError('Canvas dimensions must be numbers bigger than 0');

    if (Math.round(width) !== width || Math.round(height) !== height)
      throw new CanvasError('Canvas dimensions must be integers');

    if (width > this.maxWidth || height > this.maxHeight)
      throw new CanvasError('Canvas dimensions must be less than: ' + 'width: ' + this.maxWidth + ', height: ' + this.maxHeight);

    this.width = width;
    this.height = height;

    this._canvas = new Array(width);
    for (let x = 0; x < width; x++) {
      this._canvas[x] = new Array(height);
      for (let y = 0; y < height; y++) {
        this._canvas[x][y] = new Point();
      }    
    }
  }

  /**
   * Test whether coordinates are within bounds of the canvas.
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  isWithinBounds(x, y) {
    return !!(x >= 1 && x <= this.width && y >= 1 && y <= this.height);
  }

  /**
   * Sets the point at specified coordinates.
   * @param {number} x integer in the range of 1..canvas.width, both ends inclusive
   * @param {number} y integer in the range of 1..canvas.height, both ends inclusive
   * @param {Point} point the point to set
   */
  setPoint(x, y, point) {
    if (!(point instanceof Point)) throw new TypeError('point must be an instance of Point');
    if (!this.isWithinBounds(x, y)) throw new CanvasError('Coordinates out of bounds, ' + 'allowed: x: 1 - ' + this.width + ', y: 1 - ' + this.height + ', got: x: ' + x + ', y: ' + y);
    this._canvas[x-1][y-1] = point;
  }

  /**
   * Returns the point at specified coordinates.
   * @param {number} x integer in the range of 1..canvas.width, both ends inclusive
   * @param {number} y integer in the range of 1..canvas.height, both ends inclusive
   * @return {Point}
   */
  getPoint(x, y) {
    if (!this.isWithinBounds(x, y)) throw new CanvasError('Coordinates out of bounds, ' + 'allowed: x: 1 - ' + this.width + ', y: 1 - ' + this.height + ', got: x: ' + x + ', y: ' + y);
    return this._canvas[x-1][y-1];
  }

  /**
   * Returns a string representation of the canvas.
   * Prints string representation of a point at each coordinates.
   * Adds a border around the canvas.
   * @return {string}
   */
  toString() {
    let s = '';

    let horizontalBorder = (new Array(this.width+(2*this.verticalBorderWidth)+1)).join('-') + '\n';
    horizontalBorder = (new Array(this.horizontalBorderWidth+1)).join(horizontalBorder);
    let verticalBorderPart = (new Array(this.horizontalBorderWidth+1)).join('|');
    
    s += horizontalBorder;
    for (let y = 1; y <= this.height; y++) {
      s += verticalBorderPart;
      for (let x = 1; x <= this.width; x++) {
        s += this.getPoint(x, y).toString();
      }    
      s += verticalBorderPart+'\n';
    }
    s += horizontalBorder;
    
    return s;
  }
}

module.exports = Canvas;