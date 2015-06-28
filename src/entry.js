var angular = require('angular');
require('ui-router');

angular.module('WhenDidI',
               [
                 'ngMaterial', 'ui.router',
                 require('./home.html').name,
                 require('./add.html').name,
                 require('./settings.html').name
               ])
  .value('moment', require('moment'))
  .service('EventDb', require('./EventDb.service'))
  .filter('age', require('./age.filter'))
  .controller('HomeCtrl', require('./HomeCtrl.controller'))
  .controller('EventAddCtrl', require('./EventAddCtrl.controller'))
  .controller('EventDetailCtrl', require('./EventDetailCtrl.controller'))
  .config(require('./routes'))
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default');
  });
