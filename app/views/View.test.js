'use strict'

let View = require('./View');

let chai = require('chai');
let expect = chai.expect;
let stdinMock = require('mock-stdin').stdin();
let mockConsole = require('mock-console');

describe('View', function() {  
  describe('module', function() {
    it('should export a function', function() {
      expect(View).to.be.a('function');
    });
  });

  describe('constructor', function() {
    let view = new View(process.stdin, process.stdout);

    it('should create a new instance', function() {
      expect(view).to.be.instanceof(View);
    });
  });

  describe('read', function() {
    let view;

    beforeEach(() => {
      view = new View(process.stdin, process.stdout);
    });

    it('should read a message from the input', function() {
      process.nextTick(function() {
        stdinMock.send('user input\n');
      });
      view.read(function(response) {
        expect(response).to.equal('user input\n');
      });
    });
  });
  
  describe('show', function() {
    let view;
    let stdout;

    beforeEach(() => {
      view = new View(process.stdin, process.stdout);
      stdout = mockConsole(/^\*/, { width: 100, height: 100 });
    });

    it('should output a message', function() {
      view.show('* some output\n');
      expect(stdout.getConsoleOutput()).to.equal('* some output\n');
    });
  });
  
  describe('showError', function() {
    let view;
    let stdout;

    beforeEach(() => {
      view = new View(process.stdin, process.stdout);
      stdout = mockConsole(/^\!/, { width: 100, height: 100 });
    });

    it('should output an error message', function() {
      view.showError('some error');
      expect(stdout.getConsoleOutput()).to.equal('! some error\n');
    });
  });

  describe('destroy', function() {
    let view;

    beforeEach(() => {
      view = new View(process.stdin, process.stdout);
    });

    it('should close the cli', function() {
      expect(view._cli.closed).to.not.be.true;
      view.destroy();
      expect(view._cli.closed).to.be.true;
    });
  });

});

