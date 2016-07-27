'use strict';

angular.module('qixi2016App')
  .directive('lose', function () {
    return {
      templateUrl: 'components/lose/lose.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      }
    };
  });
