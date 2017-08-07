'use strict'

let Command = require('./Command');

class BucketFillCommand extends Command {
  constructor(params, renderer) {
    super();
    this.params = params;
    this.renderer = renderer;
  }
  
  _execute() {
    if (!this.params) this.reject('No parameters specified.');
    this.renderer.bucketFill(
      parseInt(this.params[1]),
      parseInt(this.params[2]),
      this.params[3]
    );
    this.resolve();
  }

}

module.exports = BucketFillCommand;