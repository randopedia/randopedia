import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['searchbox'],
    query : null,
    tours : null,
    store : Ember.inject.service(),

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

    keyUp: function (e) {
        if (e.keyCode === 13) {
            this.onSearchQueryChanged();
        }
    },
    executeSearch: function(query) {
        this.set('isSearching', true);
        var self = this;
        this.get('store').query('tourItem', {query : query}).then(function(tours) {
            self.set('tours', tours);
            self.set('hasSearchResults', true);
            self.set('isSearching', false);
        });
    }
});
