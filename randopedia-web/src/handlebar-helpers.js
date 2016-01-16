/**
 * Displaying a text from the language dictionary
 */
Ember.Handlebars.registerBoundHelper('text', function (id) {
    return texts.get(id);
});

/**
 * Displaying a Unix time stamp as a readable date string
 */
Ember.Handlebars.registerBoundHelper('displayTimestamp', function(time) {
    return moment(time).format("YYYY-MM-DD HH:mm");
});

/**
 * Appending '...' to strings longer that the defined max length
 */
Ember.Handlebars.registerBoundHelper('maxString', function(string, maxLength) {
    if(!string){ return ''; }
    if(string.length > maxLength) { return string.substring(0, maxLength - 3) + "..."; }
    return string;
});

Ember.Handlebars.registerBoundHelper('numberRegex', function() {
    return "[0-9]+";
});


