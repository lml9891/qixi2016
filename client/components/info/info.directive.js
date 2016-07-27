'use strict';

angular.module('qixi2016App')
  .directive('info', function () {
    return {
      templateUrl: 'components/info/info.html',
      restrict: 'EA',
      controller: ['$state',function ($state) {
        this.$state = $state;
      }],
      link: function (scope, element, attrs, ctrl) {
          var $infoSub = $('#infoSub');
          var $name = $('#name');
          var $infoError = $('#infoError');
          var $tel = $('#tel');
          var od = 'ontouchstart' in window ? 'tap':'click';

          $infoSub.on(od, function () {
            var sTel = $tel.val();
            var sName = $name.val();
            submit_userinfo_get_movieticket(sName,sTel,function (data) {
              if (data.Success) {
                if (data.ReturnCode === '001') {
                  ctrl.$state.go('repeat');
                }else if (data.ReturnCode === '000') {
                  localStorage.WINCODE = data.Message;
                  ctrl.$state.go('win');
                }else if (data.ReturnCode === '-001') {
                  ctrl.$state.go('lose');
                }
              }
            });
          });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

      }
    };
  });
