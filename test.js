'use strict'

var draw = require('./draw');

var chai = require('chai');
var expect = chai.expect


// describe("Get all todos", function(){
//         // Test will pass if we get all todos
//     it("should return all todos", function(done){
//         var TodoMock = sinon.mock(Todo);
//         var expectedResult = {status: true, todo: []};
//         TodoMock.expects('find').yields(null, expectedResult);
//         Todo.find(function (err, result) {
//             TodoMock.verify();
//             TodoMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });

//     // Test will pass if we fail to get a todo
//     it("should return error", function(done){
//         var TodoMock = sinon.mock(Todo);
//         var expectedResult = {status: false, error: "Something went wrong"};
//         TodoMock.expects('find').yields(expectedResult, null);
//         Todo.find(function (err, result) {
//             TodoMock.verify();
//             TodoMock.restore();
//             expect(err.status).to.not.be.true;
//             done();
//         });
//     });
// });



describe('drawing program', () => {  
  describe('"draw"', () => {
    it('should export a function', () => {
      expect(draw).to.be.a('function')
    })
  })
})