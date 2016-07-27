'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('good', {
        url: '/good',
        templateUrl: 'app/good/good.html',
        controller:'good'
      });
  });
