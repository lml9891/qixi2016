'use strict';

angular.module('qixi2016App')
  .directive('arms', function () {
    return {
      templateUrl: 'components/arms/arms.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

          var $armsMask = $('#armsMask');
          var od = 'ontouchstart' in window ? 'tap':'click';

          $('#arms8').addClass('arms8in').on('webkitAnimationEnd', function () {
            $(this).off().removeClass('arms8in').addClass('arms8Loop');
            cClick = true;
          });
          var iNow = 0;
          $('.armsClick').each(function (i,k) {
            $(k).on(od, function (e) {
              if (!cClick) {
                return;
              }
              e.stopPropagation();
              $armsMask.show().addClass('showAnim');
              $('#arms'+ (i+1) +'Alert').show();
              $('#arm'+ (i+1) +'Font').addClass('armsFontIn');
              $('#arm'+ (i+1) +'Img2').addClass('arm'+ (i+1) +'ImgAnim');
              iNow = i+1;
            });
          });
          $(document).on(od, function () {
            $armsMask.hide().removeClass('showAnim');
            $('#arms'+ iNow +'Alert').hide();
            $('#arm'+ iNow +'Font').removeClass('armsFontIn');
            $('#arm'+ iNow +'Img2').removeClass('arm'+ iNow +'ImgAnim');
          });

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

      }
    };
  });
