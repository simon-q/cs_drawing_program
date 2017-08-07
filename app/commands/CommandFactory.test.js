'use strict'

let CommandFactory = require('./CommandFactory');

let Command = require('./Command');
let CreateCanvasCommand = require('./CreateCanvasCommand');
let PaintCanvasCommand = require('./PaintCanvasCommand');
let BucketFillCommand = require('./BucketFillCommand');
let ProcessUserInputCommand = require('./ProcessUserInputCommand');
let QuitCommand = require('./QuitCommand');
let ReadCommand = require('./ReadCommand');
let RenderLineCommand = require('./RenderLineCommand');
let RenderRectangleOutlineCommand = require('./RenderRectangleOutlineCommand');
let ShowErrorCommand = require('./ShowErrorCommand');

let chai = require('chai');
let expect = chai.expect;

// mock commands
class InvalidCommand extends Command {
}

describe('CommandFactory', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(CommandFactory).to.be.a('function')
    });
  });

  describe('constructor', function() {
    let commandFactory = new CommandFactory();

    it('should create a new instance', function() {
      expect(commandFactory).to.be.instanceof(CommandFactory);
    });
  });
  
  describe('createCommand', function() {
    let commandFactory;

    beforeEach(() => {
      commandFactory = new CommandFactory();
    });

    it('should return a correct command', function() {
      expect(commandFactory.createCommand(CreateCanvasCommand)).to.be.instanceof(CreateCanvasCommand);
      expect(commandFactory.createCommand(PaintCanvasCommand)).to.be.instanceof(PaintCanvasCommand);
      expect(commandFactory.createCommand(BucketFillCommand)).to.be.instanceof(BucketFillCommand);
      expect(commandFactory.createCommand(ProcessUserInputCommand)).to.be.instanceof(ProcessUserInputCommand);
      expect(commandFactory.createCommand(QuitCommand)).to.be.instanceof(QuitCommand);
      expect(commandFactory.createCommand(ReadCommand)).to.be.instanceof(ReadCommand);
      expect(commandFactory.createCommand(RenderLineCommand)).to.be.instanceof(RenderLineCommand);
      expect(commandFactory.createCommand(RenderRectangleOutlineCommand)).to.be.instanceof(RenderRectangleOutlineCommand);
      expect(commandFactory.createCommand(ShowErrorCommand)).to.be.instanceof(ShowErrorCommand);
      expect(() => { commandFactory.createCommand(InvalidCommand); }).to.throw(TypeError, 'Unknown command.');


      // expect(commandFactory.getNextCommand(null)).to.equal(ReadCommand);
      // expect(commandFactory.getNextCommand(new InvalidCommand(), new CommandFactoryError(''))).to.equal(ShowErrorCommand);
      // expect(commandFactory.getNextCommand(new InvalidCommand(), new CanvasError(''))).to.equal(ShowErrorCommand);
      // expect(commandFactory.getNextCommand(new InvalidCommand(), new RendererError(''))).to.equal(ShowErrorCommand);
      // expect(() => { commandFactory.getNextCommand(new InvalidCommand(), new Error('')); }).to.throw(CommandFactoryError, 'Unknown previous command.');
      // expect(commandFactory.getNextCommand(new QuitCommand())).to.be.null;
      // expect(commandFactory.getNextCommand(new CreateCanvasCommand())).to.equal(PaintCanvasCommand);
      // expect(commandFactory.getNextCommand(new PaintCanvasCommand())).to.equal(ReadCommand);
      // expect(commandFactory.getNextCommand(new BucketFillCommand())).to.equal(PaintCanvasCommand);
      // expect(commandFactory.getNextCommand(new ProcessUserInputCommand(), ['C'])).to.equal(CreateCanvasCommand); 
      // expect(commandFactory.getNextCommand(new ProcessUserInputCommand(), ['L'])).to.equal(RenderLineCommand); 
      // expect(commandFactory.getNextCommand(new ProcessUserInputCommand(), ['R'])).to.equal(RenderRectangleOutlineCommand); 
      // expect(commandFactory.getNextCommand(new ProcessUserInputCommand(), ['B'])).to.equal(BucketFillCommand); 
      // expect(commandFactory.getNextCommand(new ProcessUserInputCommand(), ['Q'])).to.equal(QuitCommand); 
      // expect(() => { commandFactory.getNextCommand(new ProcessUserInputCommand(), []); }).to.throw(CommandFactoryError, 'Invalid command letter.'); 
      // expect(commandFactory.getNextCommand(new ReadCommand())).to.equal(ProcessUserInputCommand);
      // expect(commandFactory.getNextCommand(new RenderLineCommand())).to.equal(PaintCanvasCommand);
      // expect(commandFactory.getNextCommand(new RenderRectangleOutlineCommand())).to.equal(PaintCanvasCommand);
      // expect(commandFactory.getNextCommand(new ShowErrorCommand())).to.equal(ReadCommand);
      // expect(() => { commandFactory.getNextCommand(new InvalidCommand()); }).to.throw(CommandFactoryError, 'Unknown previous command.');
    });
    
  });

});