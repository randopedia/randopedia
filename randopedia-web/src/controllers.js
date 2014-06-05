App.IndexController = Ember.ObjectController.extend({
    needs: ['search', 'login', 'browse'],
    showBrowseMap: true,
    isSmallScreen: true,
    currentTabSelection: 1,
    liteTours: null,
    teaserTour: null,
    
    init: function() {
        this._super();
        
        this.loadLiteToursAndTeaser();
        
        var self = this;
        onWindowResize = function() {
            if(window.innerWidth < 768) { self.set('isSmallScreen', true); }
            else { self.set('isSmallScreen', false); }
        };
        
        $(window).on('resize', onWindowResize);
        onWindowResize();
    },
    actions: {
        showBrowseMap: function(){
            this.set('showBrowseMap', true);
        },
        showAreaTree: function(){
            this.set('showBrowseMap', false);
        },
    },
    // Load lite tours first, then teaser tour. Due to racing condition issue, lite tours should be loaded first.
    loadLiteToursAndTeaser: function() {
        var self = this;
        this.get('store').findQuery('tour', {liteTours: true}).then(function(tours) {
            self.set('liteTours', tours);
            self.loadTeaserTour();
        }, function(error) {
            App.Utils.log('ERROR when loading tours for browse map');
        });
    },
    loadTeaserTour: function() {
        var self = this;            
        this.store.findQuery('tour', {randomTour : true}).then(function(tours) {
            self.set('teaserTour', tours.get('firstObject'));
        }, function(error) {
            App.Util.log('ERROR when loading random tour');
        });
    },
});

App.BrowseController = Ember.ArrayController.extend({
    init: function() {
        var self = this;
        this.set('isLoadingAreas', true);
        this.store.find('toplevel').then(function(toplevels) {
            self.set('content', toplevels);
            self.set('isLoadingAreas', false);
        });
    }
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
        
        if (!this.get('controllers.index.isSmallScreen') && App.get('currentPath') !== 'search'){
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
