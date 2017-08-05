'use strict'

var draw = require('./draw');

var chai = require('chai');
var expect = chai.expect

describe('drawing program', () => {  
  describe('"draw"', () => {
    it('should export a function', () => {
      expect(draw).to.be.a('function')
    })
  })
});