'use strict'

let Command = require('./Command');

class ShowErrorCommand extends Command {
  constructor(error, view) {
    super();
    this.error = error;
    this.view = view;
  }
  
  _execute() {
    this.view.showError(this.error);
    this.resolve(this.error);
  }

}

module.exports = ShowErrorCommand;