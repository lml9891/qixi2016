'use strict';

describe('Component: InfoFullComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var InfoFullComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    InfoFullComponent = $componentController('InfoFullComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
