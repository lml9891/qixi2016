'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('repeat', {
        url: '/repeat',
        templateUrl: 'app/repeat/repeat.html',
        controller:'repeat'
      });
  });
