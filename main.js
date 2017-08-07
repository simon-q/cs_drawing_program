'use strict'

let Canvas = require('./app/models/Canvas');
let Renderer = require('./app/models/Renderer');
let View = require('./app/views/View');
let Dispatcher = require('./app/controllers/Dispatcher');
let Controller = require('./app/controllers/Controller');
let CommandFactory = require('./app/commands/CommandFactory');

if (!process.stdin || !process.stdout) {
    return;
}

let view = new View(process.stdin, process.stdout);
let canvas = new Canvas();
let renderer = new Renderer(canvas);
let controller = new Controller();
let commandFactory = new CommandFactory(canvas, renderer, view);
let dispatcher = new Dispatcher(controller, commandFactory);

canvas.maxWidth = ( process.stdout.columns != null ? process.stdout.columns : 80 )
    - 2*canvas.verticalBorderWidth;
canvas.maxHeight = ( process.stdout.rows != null ? process.stdout.rows : 80 )
    - 2*canvas.horizontalBorderWidth;

// app entry point
dispatcher.dispatch(controller.getNextCommand());