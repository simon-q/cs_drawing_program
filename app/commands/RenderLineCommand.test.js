'use strict'

let RenderLineCommand = require('./RenderLineCommand');

let chai = require('chai');
let expect = chai.expect;

describe('RenderLineCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(RenderLineCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new RenderLineCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(RenderLineCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof RenderLineCommand.prototype._execute).to.equal('function');
    });
  });

});