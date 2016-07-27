'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('love', {
        url: '/love',
        templateUrl: 'app/love/love.html',
        controller:'love'
      });
  });
