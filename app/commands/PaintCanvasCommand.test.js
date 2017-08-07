'use strict'

let PaintCanvasCommand = require('./PaintCanvasCommand');

let chai = require('chai');
let expect = chai.expect;

describe('PaintCanvasCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(PaintCanvasCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new PaintCanvasCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(PaintCanvasCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof PaintCanvasCommand.prototype._execute).to.equal('function');
    });
  });

});