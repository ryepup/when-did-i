var angular = require('angular');
var moment = require('moment');

var app = angular.module('WhenDidI', ['ngMaterial']);

app.value('moment', moment);

app.service('EventDb', function($window, $timeout) {
  var self = this, STORAGE = 'events';
  self.events = angular.fromJson($window.localStorage.getItem(STORAGE)) || [];
  angular.forEach(self.events, function(evt) {
    evt.open = false;
    evt.last = new Date(evt.last);
  });

  self.addEvent = function(name) {
    var evt = {
      name: name,
      occurences: []
    };
    self.events.unshift(evt);
    return evt;
  };

  self.record = function(evt, date) {
    evt.last = date || new Date();
    evt.occurences.push(evt.last);
    self.persist();
  };

  self.remove = function(evt) {
    var idx = self.events.indexOf(evt);
    self.events.splice(idx, 1);
    self.persist();
  };

  self.persist = function() {
    return $timeout(function() {
      $window.localStorage.setItem(STORAGE, angular.toJson(self.events));
    });
  };
});


app.filter('age', function() {
  return function(input) {
    if(input == null) return '';
    return moment(input).fromNow();
  };
});

app.controller('HomeCtrl', function(EventDb, $log, $mdBottomSheet, $mdDialog) {
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
});

app.controller('EventAddCtrl', function($mdDialog) {
  var vm = this;
  vm.save = function(name) { $mdDialog.hide(name); };
  vm.cancel = $mdDialog.cancel;
});

app.controller('EventDetailCtrl', function($log, $mdBottomSheet, moment, selectedEvent) {
  var vm = this;
  vm.evt = selectedEvent;
  vm.daysAgo = function(days) {
    $mdBottomSheet.hide(moment().subtract(days, 'days').toDate());
  };
});

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default');
});
