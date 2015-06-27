'use strict';
module.exports = function(moment) {
    return function(input) {
    if(input == null) return '';
    return moment(input).fromNow();
  };
};
