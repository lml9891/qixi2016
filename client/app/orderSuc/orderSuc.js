'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('orderSuc', {
        url: '/orderSuc',
        templateUrl: 'app/orderSuc/orderSuc.html',
        controller:'orderSuc'
      });
  });
