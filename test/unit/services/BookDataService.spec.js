'use strict';

// Test Suite
describe('Service: BookDataService', function() {

  var BookDataService, $httpBackend;
  var baseUrl = 'http://ajs-workshop.herokuapp.com/api';

  beforeEach(module('kienbaumApp'));

  beforeEach(inject(function(_$httpBackend_, _BookDataService_) {
    $httpBackend = _$httpBackend_;
    BookDataService = _BookDataService_;
  }));

  // define trained responses
  beforeEach(function() {
    $httpBackend.when('POST', baseUrl + '/books').respond(true);
    $httpBackend.when('DELETE', baseUrl + '/books/123').respond(false);
  });

  // ensure that there are no outstanding expectation and requests
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Duck Typing', function() {
    it('should have a saveBook function', function() {
      expect(angular.isFunction(BookDataService.saveBook)).toBe(true);
    });

    it('should have a deleteBookByIsbn function', function() {
      expect(angular.isFunction(BookDataService.deleteBookByIsbn)).toBe(true);
    });
  });

  describe('saveBook()', function() {
    it('should properly save a book object', function() {
      $httpBackend.expectPOST(baseUrl + '/books');
      BookDataService.saveBook({});
      $httpBackend.flush();
    });
  });

  describe('deleteBookByIsbn()', function() {
    it('should properly delete a book object by isbn', function() {
      $httpBackend.expectDELETE(baseUrl + '/books/123');
      BookDataService.deleteBookByIsbn('123');
      $httpBackend.flush();
    });
  });

});