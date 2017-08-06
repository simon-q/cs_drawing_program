'use strict'

let Point = require('./Point');
let Canvas = require('./Canvas');
let CanvasError = require('./CanvasError');

let chai = require('chai');
let expect = chai.expect

describe('Canvas', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(Canvas).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let canvas = new Canvas();

    it('should create a new instance', function() {
      expect(canvas).to.be.instanceof(Canvas);
    });
  });
  
  describe('create', function() {
    let canvas;

    beforeEach(() => {
      canvas = new Canvas();
    });

    it('should create a new canvas with specified width and height', function() {
      canvas.create(1, 2);
      expect(canvas.width).to.equal(1);
      expect(canvas.height).to.equal(2);
    });

    it('must have both width and height passed to the constructor', function() {
      expect(() => { canvas.create(); }).to.throw(CanvasError, /Canvas dimensions must be numbers/);
      expect(() => { canvas.create(1); }).to.throw(CanvasError, /Canvas dimensions must be numbers/);
    });

    it('accepts only numbers as parameters', function() {
      expect(() => { canvas.create(1, '2'); }).to.throw(CanvasError, /Canvas dimensions must be numbers/);
      expect(() => { canvas.create(1, 'a'); }).to.throw(CanvasError, /Canvas dimensions must be numbers/);
      expect(() => { canvas.create(()=>{}, 2); }).to.throw(CanvasError, /Canvas dimensions must be numbers/);
    });

    it('accepts only integers as parameters', function() {
      expect(() => { canvas.create(1, 2.1); }).to.throw(CanvasError, /Canvas dimensions must be integers/);
      expect(() => { canvas.create(1.5, 2); }).to.throw(CanvasError, /Canvas dimensions must be integers/);
    });

    it('accepts only height and width > 0', function() {
      expect(() => { canvas.create(1, 0); }).to.throw(CanvasError, /numbers bigger than 0/);
      expect(() => { canvas.create(0, 1); }).to.throw(CanvasError, /numbers bigger than 0/);
    });

    it('accepts only height and width < maxHeight and maxWidth', function() {
      canvas.maxWidth = 5;
      canvas.maxHeight = 10;
      expect(canvas.maxWidth).to.equal(5);
      expect(canvas.maxHeight).to.equal(10);
      expect(() => { canvas.create(1, 2); }).to.not.throw();
      expect(() => { canvas.create(6, 1); }).to.throw(CanvasError, /Canvas dimensions must be less than: /);
      expect(() => { canvas.create(1, 11); }).to.throw(CanvasError, /Canvas dimensions must be less than: /);
    });
  });

  describe('isWithinBounds', function() {
    let canvas;
    let pointOut;
    let pointWithin;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(9, 19);
    });
    
    it('should accept coordinates and return true/false', function() {
      // in
      expect(canvas.isWithinBounds(1, 1)).to.be.true;
      expect(canvas.isWithinBounds(9, 19)).to.be.true;
      expect(canvas.isWithinBounds(1, 19)).to.be.true;
      expect(canvas.isWithinBounds(9, 1)).to.be.true;
      expect(canvas.isWithinBounds(5, 5)).to.be.true;
      // out 
      expect(canvas.isWithinBounds(0, 0)).to.be.false;
      expect(canvas.isWithinBounds(10, 1)).to.be.false;
      expect(canvas.isWithinBounds(1, 20)).to.be.false;
      expect(canvas.isWithinBounds(10, 20)).to.be.false;
      expect(canvas.isWithinBounds(-1, 19)).to.be.false;
      // invalid
      expect(canvas.isWithinBounds('a', 1)).to.be.false;
      expect(canvas.isWithinBounds()).to.be.false;
    });
  });
  
  describe('setPoint and getPoint', function() {
    let canvas;
    let point;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(10, 10);
      point = new Point('x');
    });

    it('should set and retrieve a point', function() {
      expect(() => { canvas.setPoint(1, 1, null); }).to.throw(TypeError, 'point must be an instance of Point');
      expect(() => { canvas.setPoint(1, 1, 'c'); }).to.throw(TypeError, 'point must be an instance of Point');
      expect(() => { canvas.setPoint(1, 0, point); }).to.throw(CanvasError, /Coordinates out of bounds/);
      expect(() => { canvas.getPoint(1, 0); }).to.throw(CanvasError, /Coordinates out of bounds/);
      canvas.setPoint(1, 1, point);
      expect(canvas.getPoint(1, 1)).to.equal(point);
    });
  });
  
  describe('toString', function() {
    let canvas;
    let point;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(2, 3);
      point = new Point('x');
    });

    it('should retrieve a string representation of the canvas', function() {
      expect(canvas.toString()).to.equal(
        '----\n'+
        '|  |\n'+
        '|  |\n'+
        '|  |\n'+
        '----\n'
      );

      canvas.setPoint(1, 1, point);
      expect(canvas.toString()).to.equal(
        '----\n'+
        '|x |\n'+
        '|  |\n'+
        '|  |\n'+
        '----\n'
      );

      canvas.verticalBorderWidth = 2;
      canvas.horizontalBorderWidth = 2;
      expect(canvas.toString()).to.equal(
        '------\n'+
        '------\n'+
        '||x ||\n'+
        '||  ||\n'+
        '||  ||\n'+
        '------\n'+
        '------\n'
      );
      
    });
  });
  
});