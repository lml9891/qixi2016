'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('info', {
        url: '/info',
        templateUrl: 'app/info/info.html',
        controller:'info'
      });
  });
