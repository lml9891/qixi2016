'use strict';

describe('Component: WinComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var WinComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    WinComponent = $componentController('WinComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
