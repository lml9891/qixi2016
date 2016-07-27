'use strict';

describe('Directive: loveSuc', function () {

  // load the directive's module and view
  beforeEach(module('qixi2016App'));
  beforeEach(module('components/loveSuc/loveSuc.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<love-suc></love-suc>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the loveSuc directive');
  }));
});
