'use strict';

angular.module('qixi2016App')
  .directive('loveSuc', function () {
    return {
      templateUrl: 'components/loveSuc/loveSuc.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        var aLoadImgFirst = [
          'images/loading.jpg'
        ];
        var aLoadImg = [
          'images/stars.jpg',
          'images/loveSuc.png',
          'images/loveSucSun.png'
        ];
        var $loadingBg = $('#loadingBg');
        var $loveSucBg = $('#loveSucBg');
        var $loveSucSun = $('#loveSucSun');
        var od = 'ontouchstart' in window ? 'tap':'click';
        $('#loveSucBtn').on(od, function (e) {
          e.stopPropagation();
          $loveSucSun.show().addClass('showAnim').on('webkitAnimationEnd', function () {
            $(this).off();
          });
        });
        $(document).on(od, function () {
          $loveSucSun.removeClass('showAnim').hide();
        });

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

      }
    };
  });
