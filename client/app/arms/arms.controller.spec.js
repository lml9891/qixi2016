'use strict';

describe('Component: ArmsComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var ArmsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ArmsComponent = $componentController('ArmsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
