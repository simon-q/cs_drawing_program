'use strict'

class CanvasError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CanvasError;