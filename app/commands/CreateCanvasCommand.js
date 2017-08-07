'use strict'

let Command = require('./Command');

class CreateCanvasCommand extends Command {
  constructor(params, canvas) {
    super();
    this.params = params;
    this.canvas = canvas;
  }
  
  _execute() {
    if (!this.params) this.reject('No parameters specified.');
    this.canvas.create(
      parseInt(this.params[1]),
      parseInt(this.params[2])
    );
    this.resolve(this.canvas);
  }

}

module.exports = CreateCanvasCommand;