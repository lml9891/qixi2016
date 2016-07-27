'use strict';

describe('Directive: arms', function () {

  // load the directive's module and view
  beforeEach(module('qixi2016App'));
  beforeEach(module('components/arms/arms.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<arms></arms>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the arms directive');
  }));
});
