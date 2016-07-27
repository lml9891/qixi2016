'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('car', {
        url: '/car',
        templateUrl: 'app/car/car.html',
        controller:'car'
      });
  });
