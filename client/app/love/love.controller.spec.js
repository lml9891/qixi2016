'use strict';

describe('Component: LoveComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var LoveComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoveComponent = $componentController('LoveComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
