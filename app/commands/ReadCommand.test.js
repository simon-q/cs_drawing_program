'use strict'

let ReadCommand = require('./ReadCommand');

let chai = require('chai');
let expect = chai.expect;

describe('ReadCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(ReadCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new ReadCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(ReadCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof ReadCommand.prototype._execute).to.equal('function');
    });
  });

});