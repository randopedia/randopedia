App.DisqusComponentComponent = Ember.Component.extend( {
    elementId: 'disqus_thread',
    classNames: ['comments'],
    timer : null,

    setup : function() {
        var controller = this.get('parentView.controller');
               
        if(!window.DISQUS) {
            var disqus_shortname = 'randopedia';
            var model = controller.get('model');
            var disqus_title = model.get('name') + ' - Randopedia, the ski tour encyclopedia';
            var disqus_identifier = model.get('id');
            var disqus_url = window.location.href;
            window.disqus_shortname = disqus_shortname;
            window.disqus_title = disqus_title;
            window.disqus_identifier = disqus_identifier;
            window.disqus_url = disqus_url;
            // Disqus code :)
            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        } else {
            this.reset();
        }
    }.on('didInsertElement'),

    reset : function() {
        var controller = this.get('parentView.controller');
        var model = controller.get('model');
        var postIdentifier = model.get('id');
        var postTitle = model.get('name') + ' - Randopedia, the ski tour encyclopedia';
        var postUrl = window.location.href;

       
        Em.run.scheduleOnce('afterRender', function() {
            window.DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = postIdentifier;
                    this.page.url = postUrl;
                    this.page.title = postTitle;
                }
            });
        });
    }
});
