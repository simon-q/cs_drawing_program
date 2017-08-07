'use strict'

let RenderRectangleOutlineCommand = require('./RenderRectangleOutlineCommand');

let chai = require('chai');
let expect = chai.expect;

describe('RenderRectangleOutlineCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(RenderRectangleOutlineCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new RenderRectangleOutlineCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(RenderRectangleOutlineCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof RenderRectangleOutlineCommand.prototype._execute).to.equal('function');
    });
  });

});