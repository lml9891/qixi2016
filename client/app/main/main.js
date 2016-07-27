'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller:'main'
      });
  });
