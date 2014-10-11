App.DisqusComponentComponent = Ember.Component.extend( {
    elementId: 'disqus_thread',
    classNames: ['comments'],
    timer : null,

    setup : function() {
        console.log('Setting up disqus!!');
        var controller = this.get('parentView.controller');
        window.disqus_title = controller.get('title');
        
        if(!window.DISQUS) {
            var disqus_shortname = 'randopedia';
            window.disqus_shortname = disqus_shortname;
            
            // Disqus code :)
            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        }
    }.on('didInsertElement'),

    reset : function() {
        var controller = this.get('parentView.controller');
        var postIdentifier = controller.get('urlString');
        var postUrl = window.location.href;
        
        Em.run.scheduleOnce('afterRender', function() {
            window.DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = postIdentifier;
                    this.page.url = postUrl;
                }
            });
        });
    }
});
