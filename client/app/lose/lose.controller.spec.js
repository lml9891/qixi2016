'use strict';

describe('Component: LoseComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var LoseComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoseComponent = $componentController('LoseComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
