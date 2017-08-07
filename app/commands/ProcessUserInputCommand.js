'use strict'

let Command = require('./Command');

class ProcessUserInputCommand extends Command {
  constructor(payload) {
    super();
    this.payload = payload;
  }
  
  _execute() {
    if (!this.payload) this.reject('No data specified.');
    let params = this.payload.split(' ');
    this.resolve(params);
  }

}

module.exports = ProcessUserInputCommand;