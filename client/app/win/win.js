'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('win', {
        url: '/win',
        templateUrl: 'app/win/win.html',
        controller:'win'
      });
  });
