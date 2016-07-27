'use strict';

describe('Directive: firstIndex', function () {

  // load the directive's module and view
  beforeEach(module('qixi2016App'));
  beforeEach(module('components/firstIndex/firstIndex.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<first-index></first-index>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the firstIndex directive');
  }));
});
