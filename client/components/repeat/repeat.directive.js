'use strict';

angular.module('qixi2016App')
  .directive('repeat', function () {
    return {
      templateUrl: 'components/repeat/repeat.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      }
    };
  });
