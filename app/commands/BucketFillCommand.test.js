'use strict'

let BucketFillCommand = require('./BucketFillCommand');

let chai = require('chai');
let expect = chai.expect;

describe('BucketFillCommand', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(BucketFillCommand).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let command = new BucketFillCommand();

    it('should create a new instance', function() {
      expect(command).to.be.instanceof(BucketFillCommand);
    });
  });
  
  describe('_execute', function() {
    it('should redefine _execute function', function() {
      expect(typeof BucketFillCommand.prototype._execute).to.equal('function');
    });
  });

});