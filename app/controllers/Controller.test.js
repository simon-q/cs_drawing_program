'use strict'

let Controller = require('./Controller');

let Command = require('./../commands/Command');
let CreateCanvasCommand = require('./../commands/CreateCanvasCommand');
let PaintCanvasCommand = require('./../commands/PaintCanvasCommand');
let BucketFillCommand = require('./../commands/BucketFillCommand');
let ProcessUserInputCommand = require('./../commands/ProcessUserInputCommand');
let QuitCommand = require('./../commands/QuitCommand');
let ReadCommand = require('./../commands/ReadCommand');
let RenderLineCommand = require('./../commands/RenderLineCommand');
let RenderRectangleOutlineCommand = require('./../commands/RenderRectangleOutlineCommand');
let ShowErrorCommand = require('./../commands/ShowErrorCommand');

let ControllerError = require('./ControllerError');
let CanvasError = require('./../models/CanvasError');
let RendererError = require('./../models/RendererError');


let chai = require('chai');
let expect = chai.expect;

// mock commands
class InvalidCommand extends Command {
}

describe('Controller', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(Controller).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let controller = new Controller();

    it('should create a new instance', function() {
      expect(controller).to.be.instanceof(Controller);
    });
  });
  
  describe('getNextCommand', function() {
    let controller;

    beforeEach(() => {
      controller = new Controller();
    });

    it('should return a correct command', function() {
      expect(controller.getNextCommand(null)).to.equal(ReadCommand);
      expect(controller.getNextCommand(new InvalidCommand(), new ControllerError(''))).to.equal(ShowErrorCommand);
      expect(controller.getNextCommand(new InvalidCommand(), new CanvasError(''))).to.equal(ShowErrorCommand);
      expect(controller.getNextCommand(new InvalidCommand(), new RendererError(''))).to.equal(ShowErrorCommand);
      expect(() => { controller.getNextCommand(new InvalidCommand(), new Error('')); }).to.throw(ControllerError, 'Unknown previous command.');
      expect(controller.getNextCommand(new QuitCommand())).to.be.null;
      expect(controller.getNextCommand(new CreateCanvasCommand())).to.equal(PaintCanvasCommand);
      expect(controller.getNextCommand(new PaintCanvasCommand())).to.equal(ReadCommand);
      expect(controller.getNextCommand(new BucketFillCommand())).to.equal(PaintCanvasCommand);
      expect(controller.getNextCommand(new ProcessUserInputCommand(), ['C'])).to.equal(CreateCanvasCommand); 
      expect(controller.getNextCommand(new ProcessUserInputCommand(), ['L'])).to.equal(RenderLineCommand); 
      expect(controller.getNextCommand(new ProcessUserInputCommand(), ['R'])).to.equal(RenderRectangleOutlineCommand); 
      expect(controller.getNextCommand(new ProcessUserInputCommand(), ['B'])).to.equal(BucketFillCommand); 
      expect(controller.getNextCommand(new ProcessUserInputCommand(), ['Q'])).to.equal(QuitCommand); 
      expect(() => { controller.getNextCommand(new ProcessUserInputCommand(), []); }).to.throw(ControllerError, 'Invalid command letter.'); 
      expect(controller.getNextCommand(new ReadCommand())).to.equal(ProcessUserInputCommand);
      expect(controller.getNextCommand(new RenderLineCommand())).to.equal(PaintCanvasCommand);
      expect(controller.getNextCommand(new RenderRectangleOutlineCommand())).to.equal(PaintCanvasCommand);
      expect(controller.getNextCommand(new ShowErrorCommand())).to.equal(ReadCommand);
      expect(() => { controller.getNextCommand(new InvalidCommand()); }).to.throw(ControllerError, 'Unknown previous command.');
    });
    
  });

});