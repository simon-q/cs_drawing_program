'use strict'

let Command = require('./Command');

class ReadCommand extends Command {
  constructor(view) {
    super();
    this.view = view;
  }
  
  _execute() {
    this.view.read((data) => {
      console.log('read data: ' + data);
      this.resolve(data);
    });
  }
}

module.exports = ReadCommand;