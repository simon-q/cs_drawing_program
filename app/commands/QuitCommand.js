'use strict'

let Command = require('./Command');

class QuitCommand extends Command {
  constructor(view) {
    super();
    this.view = view;
  }
  
  _execute() {
    this.view.destroy();
    this.resolve();
  }

}

module.exports = QuitCommand;