'use strict'

var draw = require('./draw');

var chai = require('chai');
var expect = chai.expect

describe('drawing program', function() {  
  describe('"draw"', function() {
    it('should export a function', function() {
      expect(draw).to.be.a('function')
    })
  })
});