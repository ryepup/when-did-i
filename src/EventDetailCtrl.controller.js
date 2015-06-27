'use strict';
module.exports = function($state, selectedEvent, moment, EventDb) {
  var vm = this;
  vm.evt = selectedEvent;

  vm.daysAgo = function(days) {
    var date = moment().subtract(days, 'days').toDate();
    EventDb.record(vm.evt, date);
    $state.go('home');
  };
};
