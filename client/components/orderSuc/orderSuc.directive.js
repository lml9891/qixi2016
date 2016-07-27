'use strict';

angular.module('qixi2016App')
  .directive('orderSuc', function () {
    return {
      templateUrl: 'components/orderSuc/orderSuc.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      }
    };
  });
