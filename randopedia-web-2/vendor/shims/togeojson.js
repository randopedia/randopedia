(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['toGeoJSON'],
      __esModule: true,
    };
  }

  define('togeojson', [], vendorModule);
})();
