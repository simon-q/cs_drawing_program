'use strict'

let ControllerError = require('./ControllerError');

let chai = require('chai');
let expect = chai.expect

describe('ControllerError', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(ControllerError).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let error;

    beforeEach(() => {
      error = new ControllerError('there was an error');
    });

    it('should create a new instance', function() {
      expect(error).to.be.instanceof(ControllerError);
    });
    it('should set a message', function() {
      expect(error.message).to.equal('there was an error');
    });
  });
  
});