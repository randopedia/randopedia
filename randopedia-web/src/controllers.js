App.IndexController = Ember.ObjectController.extend({
    needs: ['search', 'login'],
    isSmallScreen: true,
    liteTours: null,
    currentMapZoomLevel: null,
    currentMapCenter: null,
    tourForMapView: null,
    
    init: function() {
        this._super();
        
        var self = this;
        self.loadLiteTours();
        
        var onWindowResize = function() {
            self.set('isSmallScreen', window.innerWidth < 768);
        };
        
        $(window).on('resize', onWindowResize);
        onWindowResize();
    },
    actions: {
        mapZoomChanged: function(zoomLevel) {
            this.set('currentMapZoomLevel', zoomLevel);
        },
        mapCenterChanged: function(centerLatLng) {
            this.set('currentMapCenter', centerLatLng);
        },
        viewTourOnMap: function(tour){
            this.set('tourForMapView', tour);
            this.transitionToRoute('index');
        }
    },
    loadLiteTours: function() {
        var self = this;
        this.get('store').findQuery('tour', {liteTours: true}).then(function(tours) {
            self.set('liteTours', tours);
        }, function(error) {
            App.Utils.log('Error when loading tours for browse map');
        });
    },
});

App.AboutController = Ember.ObjectController.extend();

App.SearchController = Ember.ArrayController.extend({
    needs: ['index'],
    hasSearchResults: false,
    isSearching: false,
    
    // Trigger when search string is changed
    onSearchQueryChanged : function() {
        var query = this.get('query');
        if(query === null && typeof query === 'undefined') {
            return;
        }
        query = query.trim();
        
        // Only execute search if query string is at least 3 chars long
        if(query.length > 2) {
            this.executeSearch(query);
        }
    }.observes('query'),
    
    executeSearch: function(query) {
        this.set('isSearching', true);
        var self = this;
        self.store.findQuery('tour', {query : query}).then(function(tours) {
            self.set('content', tours);
            self.set('hasSearchResults', true);
            self.set('isSearching', false);
        });
        
        // !this.get('controllers.index.isSmallScreen') &&
        
        if (App.get('currentPath') !== 'search'){
            this.transitionToRoute('search');
        }
    },

    clearSearchResult: function() {
        this.set('content', null);
        this.set('query', '');
        this.set('hasSearchResults', false);
        this.set('isSearching', false);
    },
    
    actions:{
        // Triggered from view on ENTER
        search : function() {
            var query = this.get('query');
            if(query === null && typeof query === 'undefined') {
                return;
            }
            query = query.trim();
            // Only execute search if query string has at least 1 chars long
            if(query.length > 0) {
                this.executeSearch(query);
            }
        },
        clearResult: function() {
            this.clearSearchResult();
        }
    }
});

App.ResultController = Ember.ArrayController.extend();

App.BreadCrumbController = Ember.ObjectController.extend();
App.register('controller:breadCrumb', App.BreadCrumbController, {
    singleton : false
});

App.BreadCrumbItemController = Ember.ObjectController.extend();
App.register('controller:breadCrumbItem', App.BreadCrumbItemController, {
    singleton : false
});
