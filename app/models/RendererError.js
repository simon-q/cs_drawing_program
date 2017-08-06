'use strict'

class RendererError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = RendererError;