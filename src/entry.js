window.jQuery = require('jquery');
require('bootstrap');
var angular = require('angular');
require('angular-bootstrap');
var moment = require('moment');

var app = angular.module('WhenDidI', ['ui.bootstrap']);

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

  self.record = function(evt) {
    evt.last = new Date();
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

app.controller('HomeCtrl', function(EventDb, $log) {
  var vm = this;
  vm.events = EventDb.events;
  vm.addNewEvent = function() {
    var evt = EventDb.addEvent(vm.newEventName);
    evt.open = true;
    vm.newEventName = '';
  };
  vm.record = EventDb.record;
  vm.remove = EventDb.remove;
});
