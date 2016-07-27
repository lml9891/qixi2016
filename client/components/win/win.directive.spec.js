'use strict';

describe('Directive: win', function () {

  // load the directive's module and view
  beforeEach(module('qixi2016App'));
  beforeEach(module('components/win/win.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<win></win>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the win directive');
  }));
});
