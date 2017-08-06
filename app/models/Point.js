'use strict'

class Point {
  constructor(color = ' ') {
    this.color = color;
  }
  
  /**
   * @param {string} color
   */
  set color(color) {
    if (typeof color !== 'string') throw new TypeError('color must be a string');
    this._color = color;
  }

  /**
   * @return {string}
   */
  get color() {
    return this._color;
  }

  /**
   * Returns a string representation of the object.
   * @return {string}
   */
  toString() {
    return this.color;
  }
}

module.exports = Point;