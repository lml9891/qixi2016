'use strict';

describe('Component: CarComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var CarComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CarComponent = $componentController('CarComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
