'use strict'

let CanvasError = require('./CanvasError');

let chai = require('chai');
let expect = chai.expect

describe('CanvasError', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(CanvasError).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let error;

    beforeEach(() => {
      error = new CanvasError('there was an error');
    });

    it('should create a new instance', function() {
      expect(error).to.be.instanceof(CanvasError);
    });
    it('should set a message', function() {
      expect(error.message).to.equal('there was an error');
    });
  });
  
});