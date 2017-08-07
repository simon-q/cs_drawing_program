'use strict'

let readline = require('readline');

/**
 * Text based input and output wrapper.
 */
class View {
  /**
   * @param {NodeJS.Socket} reader 
   * @param {NodeJS.Socket} writer 
   */
  constructor(reader, writer) {
    this.reader = reader;
    this.writer = writer;

    this._cli = readline.createInterface({
      input: reader,
      output: writer
    });
  }
  
  /**
   * Waits for a message and then calls the callback passing the message ínto it.
   * @param {Function} callback 
   */
  read(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback must be a function');
    this._cli.question(' > ', callback);
  }

  /**
   * Outputs a message.
   * @param {*} message 
   */
  show(message) {
    this._cli.write(message);
  }
  
  /**
   * Outputs an error message.
   * @param {*} message an error message
   */
  showError(message) {
    this.show('! ' + (message || 'unknown error')+'\n');
  }
  
  /**
   * Closes input and output.
   */
  destroy() {
    this._cli.close();
  }
}

module.exports = View;