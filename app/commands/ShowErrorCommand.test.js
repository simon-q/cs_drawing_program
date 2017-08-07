'use strict'

let ShowErrorCommand = require('./ShowErrorCommand');

let chai = require('chai');
let expect = chai.expect;

describe('ShowErrorCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(ShowErrorCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new ShowErrorCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(ShowErrorCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof ShowErrorCommand.prototype._execute).to.equal('function');
    });
  });

});