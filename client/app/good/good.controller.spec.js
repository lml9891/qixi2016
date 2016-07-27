'use strict';

describe('Component: GoodComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var GoodComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    GoodComponent = $componentController('GoodComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
