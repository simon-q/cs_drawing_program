'use strict'

let ProcessUserInputCommand = require('./ProcessUserInputCommand');

let chai = require('chai');
let expect = chai.expect;

describe('ProcessUserInputCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(ProcessUserInputCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new ProcessUserInputCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(ProcessUserInputCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof ProcessUserInputCommand.prototype._execute).to.equal('function');
    });
  });

});