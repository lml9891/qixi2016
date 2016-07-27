'use strict';

describe('Component: LoveSucComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var LoveSucComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoveSucComponent = $componentController('LoveSucComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
