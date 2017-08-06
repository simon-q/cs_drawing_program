'use strict'

let RendererError = require('./RendererError');

let chai = require('chai');
let expect = chai.expect

describe('RendererError', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(RendererError).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let error;

    beforeEach(() => {
      error = new RendererError('there was an error');
    });

    it('should create a new instance', function() {
      expect(error).to.be.instanceof(RendererError);
    });
    it('should set a message', function() {
      expect(error.message).to.equal('there was an error');
    });
  });
  
});