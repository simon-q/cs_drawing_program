'use strict'

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

/**
 * Application controller.
 * Contains logic about how commands should follow.
 */
class Controller {
 
  /**
   * Decides which command should be next based on previous command and its result.
   * @param {Command} previousCommand 
   * @param {*} responseFromPrevious 
   */
  getNextCommand(previousCommand, responseFromPrevious) {
    if (!previousCommand) return ReadCommand;
    
    if (responseFromPrevious
       && (responseFromPrevious instanceof ControllerError
        || responseFromPrevious instanceof CanvasError
        || responseFromPrevious instanceof RendererError
      )) return ShowErrorCommand;

    if (previousCommand instanceof QuitCommand) return null;
    if (previousCommand instanceof CreateCanvasCommand) return PaintCanvasCommand;
    if (previousCommand instanceof PaintCanvasCommand) return ReadCommand;
    if (previousCommand instanceof BucketFillCommand) return PaintCanvasCommand;
    if (previousCommand instanceof ProcessUserInputCommand) {
      let params = responseFromPrevious;
      let commandLetter = params && params[0];
      switch (commandLetter) {
        case 'C':
          return CreateCanvasCommand;
        case 'L':
          return RenderLineCommand;
        case 'R':
          return RenderRectangleOutlineCommand;
        case 'B':
          return BucketFillCommand;
        case 'Q':
          return QuitCommand;
        default:
          throw new ControllerError('Invalid command letter.');
      }
    }
    if (previousCommand instanceof ReadCommand) return ProcessUserInputCommand;
    if (previousCommand instanceof RenderLineCommand) return PaintCanvasCommand;
    if (previousCommand instanceof RenderRectangleOutlineCommand) return PaintCanvasCommand;
    if (previousCommand instanceof ShowErrorCommand) return ReadCommand;
        
    throw new ControllerError('Unknown previous command.');

  }
}

module.exports = Controller;