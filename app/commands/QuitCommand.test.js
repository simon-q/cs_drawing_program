'use strict'

let QuitCommand = require('./QuitCommand');

let chai = require('chai');
let expect = chai.expect;

describe('QuitCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(QuitCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new QuitCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(QuitCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof QuitCommand.prototype._execute).to.equal('function');
    });
  });

});