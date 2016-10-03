import Ember from 'ember';

export default Ember.Component.extend({
    elementId: 'disqus_thread',
    classNames: ['comments'],
    timer : null,

    didInsertElement() {
        if(!window.DISQUS) {
            var disqus_shortname = 'randopedia';
            var disqus_title = this.get('tour.name') + ' - Randopedia - The ski tour database';
            var disqus_identifier = this.get('tour.id');
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
    },

    reset : function() {
        var postIdentifier = this.get('tour.id');
        var postTitle = this.get('tour.name') + ' -Randopedia - The ski tour database';
        var postUrl = window.location.href;

        Ember.run.scheduleOnce('afterRender', function() {
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
