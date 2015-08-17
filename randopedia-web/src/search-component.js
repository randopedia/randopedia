App.SearchComponentComponent = Ember.Component.extend({
    classNames: ['searchbox'],
    query : null,
    store : null,
    tours : null,

    onSearchQueryChanged : function() {
        var query = this.get('query');
        if(!query) {
            return;
        }
        query = query.trim();
        
        // Only execute search if query string is at least 3 chars long
        if(query.length > 2) {
            this.executeSearch(query);
        } else {
            this.set('tours', null);
        }
    }.observes('query'),
    
    executeSearch: function(query) {
        this.set('isSearching', true);
        var self = this;
        var store = this.get('store');
        store.findQuery('tourItem', {query : query}).then(function(tours) {
            self.set('tours', tours);
            self.set('hasSearchResults', true);
            self.set('isSearching', false);
        });
    }
    
});
