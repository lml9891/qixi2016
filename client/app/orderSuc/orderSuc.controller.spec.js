'use strict';

describe('Component: OrderSucComponent', function () {

  // load the controller's module
  beforeEach(module('qixi2016App'));

  var OrderSucComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OrderSucComponent = $componentController('OrderSucComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
