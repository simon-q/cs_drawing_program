'use strict'

class ControllerError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = ControllerError;