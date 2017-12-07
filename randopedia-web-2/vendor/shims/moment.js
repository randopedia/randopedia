(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['moment'],
      __esModule: true,
    };
  }

  define('moment', [], vendorModule);
})();
