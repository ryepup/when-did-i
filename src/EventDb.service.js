'use strict';
var angular = require('angular');
module.exports = function($window, $timeout) {
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

  self.find = function(name) {
    var matches = self.events.filter(function(evt) {
      return evt.name == name;
    });
    return (matches.length > 0) ? matches[0] : null;
  };
};
