'use strict';

describe('Directive: lose', function () {

  // load the directive's module and view
  beforeEach(module('qixi2016App'));
  beforeEach(module('components/lose/lose.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<lose></lose>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the lose directive');
  }));
});
