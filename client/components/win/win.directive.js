'use strict';

angular.module('qixi2016App')
  .directive('win', function () {
    return {
      templateUrl: 'components/win/win.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var od = 'ontouchstart' in window ? 'tap':'click';
        $('#winCode').html(localStorage.WINCODE);
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      }
    };
  });
