var angular = require('angular');

angular.module('WhenDidI', ['ngMaterial'])
  .service('EventDb', require('./EventDb.service'))
  .filter('age', require('./age.filter'))
  .controller('HomeCtrl', require('./HomeCtrl.controller'))
  .controller('EventAddCtrl', require('./EventAddCtrl.controller'))
  .controller('EventDetailCtrl', require('./EventDetailCtrl.controller'))
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default');
  });
