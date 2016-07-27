'use strict';

describe('Component: RepeatComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var RepeatComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RepeatComponent = $componentController('RepeatComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
