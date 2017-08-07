'use strict'

let Command = require('./Command');

class ShowErrorCommand extends Command {
  constructor(error, view) {
    super();
    this.error = error;
    this.view = view;
  }
  
  _execute() {
    this.view.showError(this.error instanceof Error ? this.error.message : this.error);
    this.resolve();
  }

}

module.exports = ShowErrorCommand;