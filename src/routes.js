'use strict';
module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'HomeCtrl as vm'
    })
    .state('home.edit', {
      url:'/:name',
      resolve: {
        evt: function($stateParams, EventDb, $log) {
          return EventDb.find($stateParams.name);
        }
      },
      onEnter: function(evt, $mdBottomSheet, $state) {
        $mdBottomSheet
          .show({
            templateUrl:'settings.html',
            controller: 'EventDetailCtrl',
            controllerAs: 'vm',
            locals: {selectedEvent : evt}
          })
          .finally(function() { $state.go('home'); });
      },
      onExit: function($mdBottomSheet) {
        $mdBottomSheet.hide();
      }
    })
    .state('add', {
      url: '/add',
      templateUrl: 'add.html',
      controller: 'EventAddCtrl as vm'
    });
};
