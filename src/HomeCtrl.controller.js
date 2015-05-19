'use strict';

module.exports = function(EventDb, $log, $mdBottomSheet, $mdDialog) {
  var vm = this;
  vm.events = EventDb.events;

  vm.edit = function($event, evt) {
    $mdBottomSheet.show({
      templateUrl:'/settings.html',
      controller: 'EventDetailCtrl',
      controllerAs: 'vm',
      locals: {selectedEvent : evt},
      targetEvent: $event
    })
      .then(function(date) {
        EventDb.record(evt, date);
      });
  };

  vm.add = function($event) {
    $mdDialog.show({
      templateUrl:'/add.html',
      controller: 'EventAddCtrl',
      controllerAs: 'vm',
      targetEvent: $event
    }).then(function(name) {
      var evt = EventDb.addEvent(name);
      vm.edit(null, evt);
    });
  };
};
