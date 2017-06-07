'use strict';

require('babel-register');
require('./required.spec');
require('./string.spec');
require('./number.spec');
require('./array.spec');
require('./messages.spec');
require('./date.spec');
require('./pattern.spec');
require('./validator.spec');
require('./url.spec');
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;