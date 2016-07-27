'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('loveSuc', {
        url: '/loveSuc',
        templateUrl: 'app/loveSuc/loveSuc.html',
        controller:'loveSuc'
      });
  });
