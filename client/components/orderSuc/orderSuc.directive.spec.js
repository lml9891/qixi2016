'use strict';

describe('Directive: orderSuc', function () {

  // load the directive's module and view
  beforeEach(module('qixi2016App'));
  beforeEach(module('components/orderSuc/orderSuc.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<order-suc></order-suc>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the orderSuc directive');
  }));
});
