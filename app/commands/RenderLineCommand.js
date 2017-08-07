'use strict'

let Command = require('./Command');

class RenderLineCommand extends Command {
  constructor(params, renderer) {
    super();
    this.params = params;
    this.renderer = renderer;
  }
  
  _execute() {
    if (!this.params) this.reject('No parameters specified.');
    this.renderer.renderLine(
      parseInt(this.params[1]),
      parseInt(this.params[2]),
      parseInt(this.params[3]),
      parseInt(this.params[4])
    );
    this.resolve();
  }

}

module.exports = RenderLineCommand;