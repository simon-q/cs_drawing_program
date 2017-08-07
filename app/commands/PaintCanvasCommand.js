'use strict'

let Command = require('./Command');

class PaintCanvasCommand extends Command {
  constructor(view, canvas) {
    super();
    this.view = view;
    this.canvas = canvas;
  }
  
  _execute() {
    this.view.show(this.canvas.toString());
    this.resolve(this.canvas);
  }

}

module.exports = PaintCanvasCommand;