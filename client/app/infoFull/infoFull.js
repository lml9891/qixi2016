'use strict';

angular.module('qixi2016App')
  .config(($stateProvider)=>{
    $stateProvider
      .state('infoFull', {
        url: '/infoFull',
        templateUrl: 'app/infoFull/infoFull.html',
        controller:'infoFull'
      });
  });
