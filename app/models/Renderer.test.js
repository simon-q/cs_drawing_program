'use strict'

let Point = require('./Point');
let Canvas = require('./Canvas');
let Renderer = require('./Renderer');
let RendererError = require('./RendererError');

let chai = require('chai');
let expect = chai.expect

describe('Renderer', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(Renderer).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let renderer = new Renderer();

    it('should create a new instance', function() {
      expect(renderer).to.be.instanceof(Renderer);
    });
  });
  
  describe('renderLine', function() {
    let canvas;
    let renderer;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(10, 5);
      renderer = new Renderer(canvas);
    });

    it('should draw a line on the canvas', function() {
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );

      renderer.renderLine(5, 2, 8, 2);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|    xxxx  |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );
      
      renderer.renderLine(3, 2, 3, 5);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|  x xxxx  |\n'+
        '|  x       |\n'+
        '|  x       |\n'+
        '|  x       |\n'+
        '------------\n'
      );
    });
      
    it('should throw an error if coordinates are invalid', function() {
      expect(() => { renderer.renderLine(2, 3, 4, 5); }).to.throw(RendererError, 'Lines can be only horizontal or vertical now.');
      expect(() => { renderer.renderLine(2, '5', 4, '5'); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.renderLine(); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.renderLine(2, 5.1, 4, 5.1); }).to.throw(RendererError, 'Coordinates must be integers.');
      expect(() => { renderer.renderLine(2, 20, 4, 20); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
      expect(() => { renderer.renderLine(-2, 5, 4, 5); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
    });

    it('should throw an error if canvas isn\'t set', function() {
      renderer.canvas = null;
      expect(() => { renderer.renderLine(2, 5, 4, 5); }).to.throw(RendererError, 'A canvas has to be set first.');
    });
  });

  
  describe('renderRectangleOutline', function() {
    let canvas;
    let renderer;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(10, 5);
      renderer = new Renderer(canvas);
    });

    it('should draw a rectangle outline on the canvas', function() {
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );

      renderer.renderRectangleOutline(5, 2, 8, 4);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|    xxxx  |\n'+
        '|    x  x  |\n'+
        '|    xxxx  |\n'+
        '|          |\n'+
        '------------\n'
      );
      
      renderer.renderRectangleOutline(1, 1, 6, 3);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|xxxxxx    |\n'+
        '|x   xxxx  |\n'+
        '|xxxxxx x  |\n'+
        '|    xxxx  |\n'+
        '|          |\n'+
        '------------\n'
      );
    });
      
    it('should throw an error if coordinates are invalid', function() {
      expect(() => { renderer.renderRectangleOutline(2, '3', 4, '5'); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.renderRectangleOutline(); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.renderRectangleOutline(2, 3.1, 4, 5.1); }).to.throw(RendererError, 'Coordinates must be integers.');
      expect(() => { renderer.renderRectangleOutline(2, 30, 4, 20); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
      expect(() => { renderer.renderRectangleOutline(-2, 3, 4, 5); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
    });

    it('should throw an error if canvas isn\'t set', function() {
      renderer.canvas = null;
      expect(() => { renderer.renderRectangleOutline(2, 3, 4, 5); }).to.throw(RendererError, 'A canvas has to be set first.');
    });
  });

  
  describe('renderRectangle', function() {
    let canvas;
    let renderer;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(10, 5);
      renderer = new Renderer(canvas);
    });

    it('should draw a rectangle on the canvas', function() {
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );

      renderer.renderRectangle(5, 2, 8, 4);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|    xxxx  |\n'+
        '|    xxxx  |\n'+
        '|    xxxx  |\n'+
        '|          |\n'+
        '------------\n'
      );
      
      renderer.renderRectangle(1, 1, 6, 3);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|xxxxxx    |\n'+
        '|xxxxxxxx  |\n'+
        '|xxxxxxxx  |\n'+
        '|    xxxx  |\n'+
        '|          |\n'+
        '------------\n'
      );
    });
      
    it('should throw an error if coordinates are invalid', function() {
      expect(() => { renderer.renderRectangle(2, '3', 4, '5'); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.renderRectangle(); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.renderRectangle(2, 3.1, 4, 5.1); }).to.throw(RendererError, 'Coordinates must be integers.');
      expect(() => { renderer.renderRectangle(2, 30, 4, 20); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
      expect(() => { renderer.renderRectangle(-2, 3, 4, 5); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
    });

    it('should throw an error if canvas isn\'t set', function() {
      renderer.canvas = null;
      expect(() => { renderer.renderRectangle(2, 3, 4, 5); }).to.throw(RendererError, 'A canvas has to be set first.');
    });
  });
  
    
  describe('bucketFill', function() {
    let canvas;
    let renderer;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(10, 5);
      renderer = new Renderer(canvas);
    });

    it('should fill a same-colored area with a color', function() {
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );

      renderer.bucketFill(2, 2, 'O');
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|OOOOOOOOOO|\n'+
        '|OOOOOOOOOO|\n'+
        '|OOOOOOOOOO|\n'+
        '|OOOOOOOOOO|\n'+
        '|OOOOOOOOOO|\n'+
        '------------\n'
      );
      
      renderer.renderRectangleOutline(1, 1, 6, 3);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|xxxxxxOOOO|\n'+
        '|xOOOOxOOOO|\n'+
        '|xxxxxxOOOO|\n'+
        '|OOOOOOOOOO|\n'+
        '|OOOOOOOOOO|\n'+
        '------------\n'
      );
      
      renderer.bucketFill(10, 5, '.');
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|xxxxxx....|\n'+
        '|xOOOOx....|\n'+
        '|xxxxxx....|\n'+
        '|..........|\n'+
        '|..........|\n'+
        '------------\n'
      );
      
      renderer.bucketFill(1, 1, '|');
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|||||||....|\n'+
        '||OOOO|....|\n'+
        '|||||||....|\n'+
        '|..........|\n'+
        '|..........|\n'+
        '------------\n'
      );

      renderer.bucketFill(2, 2, '|');
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|||||||....|\n'+
        '|||||||....|\n'+
        '|||||||....|\n'+
        '|..........|\n'+
        '|..........|\n'+
        '------------\n'
      );

      renderer.bucketFill(10, 1, '|');
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '||||||||||||\n'+
        '||||||||||||\n'+
        '||||||||||||\n'+
        '||||||||||||\n'+
        '||||||||||||\n'+
        '------------\n'
      );
      
      renderer.bucketFill(1, 1); // default color
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );

      renderer.renderLine(5, 2, 8, 2);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|    xxxx  |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );
      
      renderer.bucketFill(5, 2);
      expect(canvas.toString()).to.equal(
        '------------\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '|          |\n'+
        '------------\n'
      );
    });
      
    it('should throw an error if coordinates are invalid', function() {
      expect(() => { renderer.bucketFill(1, 1, ''); }).to.throw(RendererError, 'Color must be a one letter string.');
      expect(() => { renderer.bucketFill(1, 1, 'color'); }).to.throw(RendererError, 'Color must be a one letter string.');
      expect(() => { renderer.bucketFill(1, 1, 1); }).to.throw(RendererError, 'Color must be a one letter string.');
      expect(() => { renderer.bucketFill(2, '3', 'c'); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.bucketFill(); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.bucketFill(2, 3.1, 'c'); }).to.throw(RendererError, 'Coordinates must be integers.');
      expect(() => { renderer.bucketFill(2, 30, 'c'); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
      expect(() => { renderer.bucketFill(-2, 3, 'c'); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
    });

    it('should throw an error if canvas isn\'t set', function() {
      renderer.canvas = null;
      expect(() => { renderer.bucketFill(2, 3, 'c'); }).to.throw(RendererError, 'A canvas has to be set first.');
    });
  });
  
  describe('validateCoordinates', function() {
    let canvas;
    let renderer;

    beforeEach(() => {
      canvas = new Canvas();
      canvas.create(10, 5);
      renderer = new Renderer(canvas);
    });

    it('should not throw an error if coordinates are valid', function() {
      expect(() => { renderer.validateCoordinates(2, 3); }).to.not.throw;
      expect(() => { renderer.validateCoordinates(1, 1); }).to.not.throw;
      expect(() => { renderer.validateCoordinates(10, 5); }).to.not.throw;
    });
    it('should throw an error if coordinates are invalid', function() {
      expect(() => { renderer.validateCoordinates(2, '3'); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.validateCoordinates(); }).to.throw(RendererError, 'Coordinates must be numbers.');
      expect(() => { renderer.validateCoordinates(2, 3.1); }).to.throw(RendererError, 'Coordinates must be integers.');
      expect(() => { renderer.validateCoordinates(2, 30); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
      expect(() => { renderer.validateCoordinates(0, 0); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
      expect(() => { renderer.validateCoordinates(-2, 3); }).to.throw(RendererError, 'Coordinates are out of canvas bounds.');
    });

    it('should throw an error if canvas isn\'t set', function() {
      renderer.canvas = null;
      expect(() => { renderer.validateCoordinates(2, 3); }).to.throw(RendererError, 'A canvas has to be set first.');
    });
  });  
});