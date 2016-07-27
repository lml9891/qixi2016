'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('lose', {
        url: '/lose',
        templateUrl: 'app/lose/lose.html',
        controller:'lose'
      });
  });
