'use strict'

let CreateCanvasCommand = require('./CreateCanvasCommand');
let PaintCanvasCommand = require('./PaintCanvasCommand');
let BucketFillCommand = require('./BucketFillCommand');
let ProcessUserInputCommand = require('./ProcessUserInputCommand');
let QuitCommand = require('./QuitCommand');
let ReadCommand = require('./ReadCommand');
let RenderLineCommand = require('./RenderLineCommand');
let RenderRectangleOutlineCommand = require('./RenderRectangleOutlineCommand');
let ShowErrorCommand = require('./ShowErrorCommand');

class CommandFactory {
  /**
   * Inject dependencies required to create commands with their dependencies.
   * @param {Canvas} canvas 
   * @param {Renderer} renderer 
   * @param {View} view 
   */
  constructor(canvas, renderer, view) {
    this.canvas = canvas;
    this.renderer = renderer;
    this.view = view;
  }

  /**
   * Instantiates the command injecting it with all needed dependencies.
   * @param {Function} commandClass 
   * @param {*} payload 
   */
  createCommand(commandClass, payload) {
    switch (commandClass) {
      case CreateCanvasCommand:
        return new CreateCanvasCommand(payload, this.canvas);
      case PaintCanvasCommand:
        return new PaintCanvasCommand(this.view, this.canvas);
      case BucketFillCommand:
        return new BucketFillCommand(payload, this.renderer);
      case ProcessUserInputCommand:
        return new ProcessUserInputCommand(payload);
      case QuitCommand:
        return new QuitCommand(this.view);
      case ReadCommand:
        return new ReadCommand(this.view);
      case RenderLineCommand:
        return new RenderLineCommand(payload, this.renderer);
      case RenderRectangleOutlineCommand:
        return new RenderRectangleOutlineCommand(payload, this.renderer);
      case ShowErrorCommand:
        return new ShowErrorCommand(payload, this.view);
      default:
        throw new TypeError('Unknown command.');
    }
  }
}

module.exports = CommandFactory;