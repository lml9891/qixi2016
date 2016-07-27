  'use strict';

  angular.module('qixi2016App', [
    // 'qixi2016App.constants',
    'ngResource',
    'ngSanitize',
    'angular-loading-bar',
    'ui.router'
  ])
    .config(($urlRouterProvider)=>{

      $urlRouterProvider.otherwise(($injector, $location)=>{
        var $state = $injector.get("$state");
        $state.go("main");
      });

    })

    // loading bar
    .config((cfpLoadingBarProvider)=>{
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 50;
    })
