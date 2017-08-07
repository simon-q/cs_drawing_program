'use strict'

let Dispatcher = require('./Dispatcher');

let Command = require('./../commands/Command');

let chai = require('chai');
let expect = chai.expect;
let spies = require('chai-spies');

chai.use(spies);


// mock commands
class SuccessCommand extends Command {
  constructor(params) {
    super();
    this.params = params;
  }
  _execute() {
    this.resolve(this.params+'1');
  }
}
class FailCommand extends Command {
  constructor(params) {
    super();
    this.params = params;
  }
  _execute() {
    this.reject(this.params+'2');
  }
}

describe('Dispatcher', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(Dispatcher).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let dispatcher = new Dispatcher();

    it('should create a new instance', function() {
      expect(dispatcher).to.be.instanceof(Dispatcher);
    });
  });
  
  describe('dispatch', function() {
    let dispatcher;
    let commandFactory;
    let controller;

    beforeEach(() => {
      commandFactory = {
        createCommand: chai.spy((commandClass, payload) => {
          return commandClass === FailCommand ? new FailCommand(payload) : new SuccessCommand(payload);
        })
      };

      controller = {
        getNextCommand: chai.spy((command, responseFromPrevious) => { return command instanceof FailCommand ? null : FailCommand; })
      };

      dispatcher = new Dispatcher(controller, commandFactory);
    });

    it('should dispatch a command and get next one on success', function() {
      expect(commandFactory.createCommand).to.not.have.been.called();
      expect(controller.getNextCommand).to.not.have.been.called();
      
      return dispatcher.dispatch(SuccessCommand, 'test').then((result) => {
        expect(result).to.equal('test1');
      }).finally(() => {
        expect(commandFactory.createCommand).to.have.been.called();
        expect(controller.getNextCommand).to.have.been.called();
      });
    });
    
    it('should dispatch a command and throw an error on rejection', function() {
      expect(commandFactory.createCommand).to.not.have.been.called();
      expect(controller.getNextCommand).to.not.have.been.called();
      
      return dispatcher.dispatch(FailCommand, 'test').catch((error) => {
        expect(error).to.equal('test2');
      }).finally(() => {
        expect(commandFactory.createCommand).to.have.been.called();
        expect(controller.getNextCommand).to.have.been.called();
      });
    });
  });

});