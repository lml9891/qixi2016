'use strict';
(function(){

  class GoodCtrl {
    constructor($state) {
    }
  }
  GoodCtrl.$inject = ['$state'];
  angular.module('qixi2016App')
    .controller('good', GoodCtrl);

})();
