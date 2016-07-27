'use strict';
(function(){

  class InfoCtrl {
    constructor($state) {
    }
  }
  InfoCtrl.$inject = ['$state'];
  angular.module('qixi2016App')
    .controller('info', InfoCtrl);

})();
