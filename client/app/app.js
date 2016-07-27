  'use strict';

  angular.module('qixi2016App', [
    // 'qixi2016App.constants',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngTouch',
    'angular-loading-bar',
    'ui.router'
  ])
    .config(($urlRouterProvider, $locationProvider) =>{
      $urlRouterProvider.otherwise(($injector, $location)=>{
        var $state = $injector.get("$state");
        $state.go("main");
      });
      $locationProvider.html5Mode(true);

      // $locationProvider.html5Mode(true);


    })

    // loading bar
    .config((cfpLoadingBarProvider)=>{
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 50;
    })
