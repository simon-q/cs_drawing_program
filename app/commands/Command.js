'use strict'

var deferred = require('deferred');

/**
 * Asynchronous wrapper encapsulating a command that carries out actions and then
 * resolves or rejects the promise.
 */
class Command {
   
  /**
   * Asynchronous wrapper around this._execute
   * @return {Promise}
   */
  execute() {
    this.deferred = deferred();

    try {
      this._execute();
    } catch(e) {
      this.reject(e);
    }
    
    return this.deferred.promise;
  }

  /**
   * Performs the actions that the command should carry out.
   * Must call resolve or reject or throw an error.
   */
  _execute() {
    // implement in subclass
  }

  /**
   * @param {*} data 
   * @return {Promise}
   */
  resolve(data) {
    this.deferred.resolve(data);
    return this.deferred.promise;
  }

  /**
   * @param {*} error 
   * @return {Promise}
   */
  reject(error) {
    this.deferred.reject(error);
    return this.deferred.promise;
  }

}

module.exports = Command;