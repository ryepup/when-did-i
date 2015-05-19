'use strict';

module.exports = function($mdDialog) {
  var vm = this;
  vm.save = function(name) { $mdDialog.hide(name); };
  vm.cancel = $mdDialog.cancel;
};
