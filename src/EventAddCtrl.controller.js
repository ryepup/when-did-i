'use strict';

module.exports = function($mdDialog, EventDb, $state) {
  var vm = this;
  vm.save = function(name) {
    var evt = EventDb.addEvent(name);
    $state.go('home.edit', {name:name});
  };
};
