'use strict'

let Command = require('./../commands/Command');
let ControllerError = require('./ControllerError');

/**
 * Dispatches a given command, fetches a new one and continues the loop as long as
 * commands are given.
 */
class Dispatcher {

  /**
   * @param {Controller} controller 
   * @param {CommandFactory} commandFactory 
   */
  constructor(controller, commandFactory) {
    this.controller = controller;
    this.commandFactory = commandFactory;
  }

  /**
   * Dispatches an asynchronous command.
   * When the command is done, fetches next command from the controller
   * and continues in the fetch/dispatch loop.
   * TODO: rewrite into Observable
   * @param {Command|Function} commandOrClass command to be dispatched, if class is given it will be created
   * @param {*} payload data to send with command
   * @return {Promise}
   */
  dispatch(commandOrClass, payload) {
    // console.log(commandOrClass);
    
    this.result = null;
    this.error = null;
    let command = commandOrClass instanceof Command
      ? commandOrClass
      : this.commandFactory.createCommand(commandOrClass, payload);

    return command.execute()
      .then((result) => { 
        this.result = result;
        return result;
      })
      .catch((error) => {
        this.error = error;
        // if (error instanceof ControllerError) {
        //     console.log('control error');
        // }
        throw error;
      })
      .finally(() => {
        let responseFromPrevious = this.result != null
          ? this.result
          : (typeof this.error === 'string' ? new ControllerError(this.error) : this.error);
        try {
          let nextCommand = this.controller.getNextCommand(command, responseFromPrevious);
          if (nextCommand) this.dispatch(nextCommand, responseFromPrevious);
        } catch(e) {
          if (e instanceof ControllerError) {
            let nextCommand = this.controller.getNextCommand(command, e);
            if (nextCommand) this.dispatch(nextCommand, e);
          } else {
            throw e;
          }
        }
      });
  }
}

module.exports = Dispatcher;