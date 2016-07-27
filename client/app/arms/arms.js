'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('arms', {
        url: '/arms',
        templateUrl: 'app/arms/arms.html',
        controller:'arms'
      });
  });
