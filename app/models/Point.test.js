'use strict'

let Point = require('./Point');

let chai = require('chai');
let expect = chai.expect

describe('Point', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(Point).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let point = new Point('c');

    it('should create a new instance', function() {
      expect(point).to.be.instanceof(Point);
    });
  });
  
  describe('color', function() {
    let point;

    beforeEach(() => {
      point = new Point();
    });

    it('should have default value', function() {
      expect(point.color).to.equal(' ');
    });
    it('can be changed', function() {
      point.color = 'c';
      expect(point.color).to.equal('c');
    });
    it('is used as a string representation', function() {
      point.color = 'c';
      expect(point.toString()).to.equal('c');
    });
    it('must be a string', function() {
      expect(() => { point.color = 1; }).to.throw(TypeError, 'color must be a string');
    });
    
  });
});