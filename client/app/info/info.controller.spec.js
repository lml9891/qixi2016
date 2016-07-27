'use strict';

describe('Component: InfoComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var InfoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    InfoComponent = $componentController('InfoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
