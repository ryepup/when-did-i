'use strict';
var moment = require('moment');
module.exports = function($log, $mdBottomSheet, selectedEvent) {
  var vm = this;
  vm.evt = selectedEvent;
  vm.daysAgo = function(days) {
    $mdBottomSheet.hide(moment().subtract(days, 'days').toDate());
  };
};
