'use strict'

let RendererError = require('./RendererError');

class Renderer {

  /**
   * @param {Canvas} canvas 
   */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * Draws a line between two points.
   * Currently only horizontal and vertical lines are supported.
   * @param {number} x1 x coordinate of the first point
   * @param {number} y1 y coordinate of the first point
   * @param {number} x2 x coordinate of the second point
   * @param {number} y2 y coordinate of the second point
   */
  renderLine(x1, y1, x2, y2) {
    if (x1 !== x2 && y1 !== y2)
      throw new RendererError('Lines can be only horizontal or vertical now.');

    // implemented as a rectangle with width or height of 1 
    this.renderRectangle(x1, y1, x2, y2);
  }

  /**
   * Draws an outline of a rectangle designated by two points.
   * First point is a top left corner, second point is bottom right point.
   * @param {number} x1 x coordinate of the first point
   * @param {number} y1 y coordinate of the first point
   * @param {number} x2 x coordinate of the second point
   * @param {number} y2 y coordinate of the second point
   */
  renderRectangleOutline(x1, y1, x2, y2) {
    // draw all 4 borders of the rectangle
    this.renderLine(x1, y1, x2, y1);
    this.renderLine(x1, y2, x2, y2);
    this.renderLine(x1, y1, x1, y2);
    this.renderLine(x2, y1, x2, y2);
  }

  /**
   * Draws a rectangle designated by two points.
   * First point is a top left corner, second point is bottom right point.
   * @param {number} x1 x coordinate of the first point
   * @param {number} y1 y coordinate of the first point
   * @param {number} x2 x coordinate of the second point
   * @param {number} y2 y coordinate of the second point
   */
  renderRectangle(x1, y1, x2, y2) {
    if (!this.canvas)
      throw new RendererError('A canvas has to be set first.');

    this.validateCoordinates(x1, y1);
    this.validateCoordinates(x2, y2);

    let xFrom = Math.min(x1, x2);
    let xTo = Math.max(x1, x2);
    let yFrom = Math.min(y1, y2);
    let yTo = Math.max(y1, y2);
    for (let x = xFrom; x <= xTo; x++) {
      for (let y = yFrom; y <= yTo; y++) {
        this.canvas.getPoint(x, y).color = 'x';
      }  
    }
  }

  /**
   * Fills an area with given color.
   * The area that will be filled is defined as all points that can be reached by walking
   * horizontally or vertically from the starting point while using only point
   * with same color as the starting point.
   * @param {number} x coordinate of the starting point
   * @param {number} y coordinate of the starting point
   * @param {string} newColor the color with which the area should be filled
   */
  bucketFill(x, y, newColor = ' ') {
    if (!this.canvas)
      throw new RendererError('A canvas has to be set first.');

    if (newColor === '') newColor = ' ';

    this.validateCoordinates(x, y);

    if (typeof newColor !== 'string' || newColor.length !== 1)
      throw new RendererError('Color must be a one letter string.');

    let startPoint = this.canvas.getPoint(x, y);
    let originalColor = startPoint.color;
    
    if (originalColor === newColor) return; // nothing needs to be done

    // recursively walk through horizontally and vertically adjacent points
    // with the same color
    // simulate recursion using a stack
    let stack = [];
    stack.push([x, y]);
    while (stack.length) {
      let currentCoordinates = stack.pop();
      let currentPoint = this.canvas.getPoint(currentCoordinates[0], currentCoordinates[1]);
      currentPoint.color = newColor;
      [
        [currentCoordinates[0] + 1, currentCoordinates[1]],
        [currentCoordinates[0] - 1, currentCoordinates[1]],
        [currentCoordinates[0], currentCoordinates[1] + 1],
        [currentCoordinates[0], currentCoordinates[1] - 1]
      ].forEach((coordinates) => {
        let x = coordinates[0];
        let y = coordinates[1];
        if (this.canvas.isWithinBounds(x, y)) {
          let point = this.canvas.getPoint(x, y);
          if (point.color === originalColor) stack.push([x, y]);
        }
      });
    }
  }

  /**
   * Checks whether given coordinates are valid and throws an error if not.
   * @param {number} x 
   * @param {number} y 
   */
  validateCoordinates(x, y) {
    if (!this.canvas)
      throw new RendererError('A canvas has to be set first.');

    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y))
      throw new RendererError('Coordinates must be numbers.');

    if (Math.round(x) !== x || Math.round(y) !== y)
      throw new RendererError('Coordinates must be integers.');

    if (!this.canvas.isWithinBounds(x, y))
      throw new RendererError('Coordinates are out of canvas bounds.');
  }
}

module.exports = Renderer;