'use strict'

let CreateCanvasCommand = require('./CreateCanvasCommand');

let chai = require('chai');
let expect = chai.expect;

describe('CreateCanvasCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(CreateCanvasCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new CreateCanvasCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(CreateCanvasCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof CreateCanvasCommand.prototype._execute).to.equal('function');
    });
  });

});