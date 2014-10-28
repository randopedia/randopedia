App.AreaBreadcrumbComponent = Ember.Component.extend({
    didInsertElement: function () {
        if (!this.get('area')) {
            Ember.Logger.error('AreaBreadcrumb component needs an area');
            return;
        }
    }
});