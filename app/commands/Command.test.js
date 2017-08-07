'use strict'

let Command = require('./Command');

let chai = require('chai');
let expect = chai.expect;
let spies = require('chai-spies');

chai.use(spies);


// mock commands
class ResolveCommand extends Command {
  constructor() {
    super();
  }
  _execute() {
    this.resolve('test1');
  }
}
class RejectCommand extends Command {
  constructor() {
    super();
  }
  _execute() {
    this.reject('test2');
  }
}
class ErrorCommand extends Command {
  constructor() {
    super();
  }
  _execute() {
    throw new Error('test3');
  }
}

describe('Command', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(Command).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new Command();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(Command);
    });
  });
  
  describe('execute', function() {
    let resolveCommand;
    let rejectCommand;
    let errorCommand;

    beforeEach(() => {
      resolveCommand = new ResolveCommand();
      rejectCommand = new RejectCommand();
      errorCommand = new ErrorCommand();
      resolveCommand._execute = chai.spy(resolveCommand._execute);
      rejectCommand._execute = chai.spy(rejectCommand._execute);
      errorCommand._execute = chai.spy(errorCommand._execute);
    });

    it('should execute a command and get success result', function() {
      expect(resolveCommand._execute).to.not.have.been.called();
      
      return resolveCommand.execute().then((result) => {
        expect(result).to.equal('test1');
      }).finally(() => {
        expect(resolveCommand._execute).to.have.been.called();
      });
    });
    
    it('should execute a command and get a rejection', function() {
      expect(rejectCommand._execute).to.not.have.been.called();
      
      return rejectCommand.execute().catch((error) => {
        expect(error).to.equal('test2');
      }).finally(() => {
        expect(rejectCommand._execute).to.have.been.called();
      });
    });
    
    it('should execute a command and get an error', function() {
      expect(errorCommand._execute).to.not.have.been.called();
      
      return errorCommand.execute().catch((error) => {
        expect(error.message).to.equal('test3');
      }).finally(() => {
        expect(errorCommand._execute).to.have.been.called();
      });
    });

  });

});