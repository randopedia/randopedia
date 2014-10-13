var AppInit = function() {

    var config = {
        templateFilesUrl : 'templates/'
    };

    var loadTemplates = function(templates) {
        $(templates).each(function() {
            var scriptTag = $('<script>');
            scriptTag.attr('type', 'text/x-handlebars');
            var dataTemplateName = this.substring(0, this.indexOf('.'));
            scriptTag.attr('data-template-name', dataTemplateName);
            $.ajax({
                async : false,
                type : 'GET',
                url : config.templateFilesUrl + this,
                success : function(resp) {
                    scriptTag.html(resp);
                    $('body').append(scriptTag);
                }
            });
        });
    };

    return {
        loadTemplates : loadTemplates
    };

}();