'use strict';
var moment = require('moment');
module.exports = function() {
    return function(input) {
    if(input == null) return '';
    return moment(input).fromNow();
  };
};
