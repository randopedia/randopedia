Ember.TEMPLATES["about-grades"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push(" <p>\r\n Randopedia uses only one grading system, i.e. there're not separate systems for the climb and the descent. The grade is therefore an overall \r\n estimate of all difficulties on an itinerary. \r\n </p>\r\n \r\n <p>\r\n The grade always evaluates the most difficult part of the itinerary. The main factors that are considered in the estimate are steepness and \r\n exposure, but it also includes altitude, duration and how sustained the difficulties are.\r\n </p>\r\n  \r\n <p>\r\n If, for example, an itinerary have a very long duration or is at high altitude the grade might be higher than the grade matching the steepness. \r\n This can also be true if there's a very technical passage on an itinerary which isn't very steep.\r\n </p>\r\n \r\n<dl>\r\n  <dt>Easy</dt>\r\n  <dd>Easy ascent/descent on wide slopes that doesn't require any particular technical abilities.</dd>\r\n  <dt>Fairly difficult</dt>\r\n  <dd>Slopes up to 35&#176;. Requires solid skiing abilities in all kind of conditions.</dd>\r\n  <dt>Quite difficult</dt>\r\n  <dd>Slopes up to 40&#176; (can be down to 30&#176; if technical passages or some exposure). Requires good skiing abilities.</dd>\r\n  <dt>Difficult</dt>\r\n  <dd>Slopes up to 45&#176; (can be down to 35&#176; if very technical passages or high exposure, can be up to 50&#176; if low exposure). Requires very good skiing abilities.</dd>\r\n  <dt>Very difficult</dt>\r\n  <dd>Slopes up to 50&#176; (can be up to 55&#176; if low exposure).</dd>\r\n  <dt>Extremely difficult</dt>\r\n  <dd>Very steep and exposed terrain. Slopes up to 60&#176; and/or long stretches of 50-55&#176;. Serious stuff for the committed and experienced ski mountaineer.</dd>  \r\n</dl> ");
  
});

Ember.TEMPLATES["about"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row main-view-container\">\r\n    <div class=\"col-sm-12\">\r\n    \r\n         <ul class=\"nav nav-tabs\" role=\"tablist\">\r\n			<li class=\"active\"><a href=\"#about\" role=\"tab\" data-toggle=\"tab\">About</a></li>\r\n			<li><a href=\"#grades\" role=\"tab\" data-toggle=\"tab\">Grades</a></li>\r\n			<li><a href=\"#help\" role=\"tab\" data-toggle=\"tab\">Help</a></li>\r\n	    </ul>\r\n	    \r\n		<div class=\"tab-content\">\r\n		\r\n			<div class=\"tab-pane active\" id=\"about\">\r\n			     <div>\r\n                   <h3>About Randopedia</h3>\r\n                   <p>\r\n                   Randopedia is an open-content collaborative encyclopedia where anyone can contribute by adding and update content. Ambition is high; it shall become the most complete and accessible ski tour database in the world. Randopedia isn't a community; it's simply a database containing ski tour descriptions.\r\n                   </p>\r\n                   \r\n                   <p>\r\n                   It's really easy to contribute and take part in the Randopedia vision. Just log in and add your tours! Have a look at the help section if you want to learn more about how to contribute with tour data.\r\n                   </p>\r\n                   \r\n                    <h4 class=\"subheader\">The people</h4>\r\n                    <p>\r\n                    Randopedia is developed and maintained by a bunch of skiers (who also happens to be programmers) who simply thought this was a great idea. All work is done voluntary on our spare time, but we do our best to frequently update and improve the site.\r\n                    </p>\r\n                   \r\n                    <h4 class=\"subheader\">Contact</h4>\r\n                    <p>\r\n                    We love to get feedback, so any ideas, suggestions, error reports, questions, criticism or compliments are all very welcomed. Please send an email to <a href=\"mailto:mail@randopedia.net\">mail@randopedia.net</a> or write on the <a target=\"_blank\" href=\"https://www.facebook.com/randopedia.net\">Randopedia Facebook page</a>.\r\n                    </p>\r\n                    \r\n                   <h4 class=\"subheader\">Privacy, registering and logging in</h4>\r\n                   <p>\r\n                   Randopedia doesn't have its own authentication system, instead of creating a new account you can use accounts you already have. Currently you can login with Facebook and Google accounts.\r\n                   </p>\r\n                   \r\n                    <p>\r\n                    First time you login you have to register the account with Randopedia. This is just a confirmation that you allow your account to be used for authentication by Randopedia.\r\n                    </p>\r\n                    \r\n                    <p>\r\n                    Randopedia doesn't store or use any sensitive information about your account. The only thing that is saved is the user id and name. There's no logout button on the page, if you for example have logged in using your Facebook account, you'll be logged out from Randopedia when you log out from Facebook.\r\n                    </p>\r\n                    \r\n                    <p>\r\n                    Note: You only need to login if you want to contribute with ski tour data or write comments on tours. All ski tours and other information on the site is always available regardless if you're logged in or not.\r\n                    </p>\r\n                    \r\n                    <p>\r\n                    Note 2: If you have saved tour drafts when logged in with one account, for example Facebook, those tours will not be available if you log in with Google or vice versa.\r\n                    </p>\r\n                   \r\n                    <h4 class=\"subheader\">Licensing</h4>\r\n                    <p>\r\n                    All tour data (texts, images, map data) is licensed under a <a target=\"_blank\" rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\">Creative Commons Attribution 4.0 International License</a>.\r\n                    </p>\r\n                   \r\n                    <h4 class=\"subheader\">Disclaimer</h4>\r\n                    <p>\r\n                    By publishing any material on Randopedia you assures that the material DO NOT violate ANY copyright law, international or otherwise, nor that the material is deemed illegal by governing authorities.\r\n                    </p>\r\n                    <p>\r\n                    If you suspect that some material available on Randopedia violates any copyright law, please contact us and it will be immediately deleted from the Randopedia database.\r\n                    </p>                   \r\n                    <p>\r\n                    Randopedia makes no guarantee of the validity of the content. Tour data should always be seen as guidelines and inspiration, not as absolute truth, and be handled as such.\r\n                    </p>\r\n                    <p>\r\n                    Randopedia reserves the right to, without any notice, delete any content that violates anything stated here or is considered irrelevant for the site.\r\n                    </p>			     \r\n			     </div>\r\n			</div>\r\n			\r\n			<div class=\"tab-pane\" id=\"grades\">\r\n			     <h3>Grades</h3>\r\n			     ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about-grades", options) : helperMissing.call(depth0, "partial", "about-grades", options))));
  data.buffer.push(" \r\n			</div>\r\n			\r\n			<div class=\"tab-pane\" id=\"help\">\r\n                <div>\r\n                  <h3>Adding and updating tours</h3>\r\n                   <p>\r\n                   The basic idea of Randopedia is that many people will contribute by adding and improving the tour descriptions. After a new tour has been published, it \r\n                   will be possible for anyone to make updates on that tour.\r\n                   </p>\r\n                   \r\n                   <p>\r\n                   To add or update a tour you need to be logged in. An edit button is available in the top right corners of \r\n                   the tour and area pages. This button leads you to an edit view for the tour/area. There's also an \"Add new tour\"\r\n                   link on the front page. \r\n                   </p>\r\n                   \r\n                   <h4 class=\"subheader\">Adding a new tour</h4>\r\n                   <p>\r\n                   There are two ways to add a new tour. \r\n                   <br> - Browse into an area, click edit and then the Add tour button. This will create a new tour in the current area.\r\n                   <br> - Click the Add new tour link in the main menu.\r\n                   </p>\r\n                   <p>See \"Edit a tour\" section below for more details on editing tours.</p>\r\n                   \r\n                   <h4 class=\"subheader\">Adding a new area</h4>\r\n                   <p>\r\n                   A new area can be added in two ways. \r\n                   <br> - From the area page: Browse to the \"parent\" area, click edit button and add a new area in the \"Subareas\" section.\r\n                   <br> - From the tour page: In tour edit page, click the area name and an area picker appears, here you'll find a \"create new area\"\r\n                   option. Select the parent area and click \"Create new are in...\".                     \r\n                   </p>\r\n                   \r\n                   <h4 class=\"subheader\">Edit a tour</h4>\r\n                   <p>\r\n                    The edit tour page contains five sections.                   \r\n                   </p>\r\n                   \r\n                   <h5 class=\"subheader\">Details</h5>\r\n                   <p>Here you found a set of predefined fields where basic tour data is easily set.</p>\r\n                   \r\n                   <h5 class=\"subheader\">Description</h5>\r\n                   <p>Describe the itinerary and add any other information that could be useful</p>\r\n                   \r\n                   <h5 class=\"subheader\">Map</h5>\r\n                   <p> \r\n                    The map tab offers some simple map edit functionality. A new route is added by clicking the \"path\" button in the toolbar. When the drawing \r\n                    tool is selected, just click on the starting point and then draw the line as wanted. Double click to exit the drawing mode.\r\n                   </p>\r\n                                        \r\n                   <h5 class=\"subheader\">Images</h5>\r\n                   <p>\r\n                   Images are published a little bit differently than other data.\r\n                   </p>\r\n                   <p>\r\n                    When an image is selected for upload a preview is shown and a caption can be added before publishing. Images can only be uploaded and published \r\n                    one at the time. The image is published immediately (no need to do save/publish on the tour afterwards)\r\n                    </p>\r\n                    <p>\r\n                    Below the upload section, current images are listed and captions can be updated.\r\n                    <p>\r\n                    Only upload images of good quality with motives that are helpful for route finding and gives an impression of what the tour's like.\r\n                    </p>\r\n                    <p>\r\n                    All images will be scaled down to 1024*768 pixels. Currently images in portrait format isn't supported (will look kind of bad). \r\n                    </p>\r\n                    <p>\r\n                    There's a max limit of 20 images per tour. \r\n                   </p>                \r\n                   <h5 class=\"subheader\">History</h5>\r\n                   <p>\r\n                   All updates on a tour are logged and can be viewed here.\r\n                   </p>\r\n                   <h5 class=\"subheader\">Adding links in descriptions</h5>\r\n                   <p>\r\n                   Randopedia supports something called \"markdown\". This means that some codes can be added in a text field and these will be translated \r\n                   into links in view mode. This is supported in the area and tour description fields. Note that the full address must be added (included the http stuff).\r\n                   <p>\r\n                   <strong>Syntax: </strong> [Name](address)\r\n                   </p>\r\n                   <p>\r\n                   <p><strong>Example (in the edit text boxes): </strong></p>\r\n                   <pre><code>Visit us on our [facebook page](http://www.facebook.com/randopedia.net)</code></pre>\r\n                   <p><strong>...will look like this:</strong></p>\r\n                   <pre>Visit us on our <a href=\"http://www.facebook.com/randopedia.net\">facebook page</a></pre>\r\n                   </p>\r\n                   \r\n                   <h4 class=\"subheader\">Publishing</h4>\r\n                   <p>\r\n                   Changes can be published at any time as long as the data is valid. There might be some warnings showing, try to fill out as much data as possible \r\n                   before publishing. A brief comment describing the change is also mandatory.                   \r\n                   </p>\r\n                   \r\n                   <h4 class=\"subheader\">Drafts</h4>\r\n                   <p>\r\n                    A new tour can be saved as a draft. That means it is saved, but not published. A draft is only available for the user that created it, you \r\n                    can work with a tour for some time and once you're happy with it, it can be published.\r\n                    </p>\r\n                    <p>\r\n                    Drafts can be found on the \"My tours\" page which is available from the main menu.\r\n                    </p>\r\n                    <p>\r\n                    Drafts are only available for new, unpublished tours. If a tour have been published, it's not possible to make changes and save it as a draft to \r\n                    publish at a later time.\r\n                   </p>                    \r\n                </div>\r\n            </div>\r\n            \r\n		</div>\r\n	    \r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<!--\r\n    Default application template. Defines the application layout and starts everything off.\r\n-->     \r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "header", options) : helperMissing.call(depth0, "partial", "header", options))));
  data.buffer.push("\r\n \r\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["area-browse-item-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	\r\n	    ");
  stack1 = helpers['if'].call(depth0, "hasTours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n			");
  stack1 = helpers['if'].call(depth0, "isExpanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    \r\n	        <a class=\"areatree-link\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "routeToArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "view.areaTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\r\n	\r\n	    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n			    ");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n			        <a href=\"#\" class=\"icon-link areatree-expand\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("><<span class=\"glyphicon glyphicon-minus\"></a>\r\n		        ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\r\n		            <span class=\"expand-placeholder\"></span>		        \r\n			    ");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n			    ");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n			        <a href=\"#\" class=\"icon-link areatree-expand\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("><span class=\"glyphicon glyphicon-plus\"></i></a>\r\n	            ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n	                <span class=\"expand-placeholder\"></span>\r\n			    ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	\r\n	    ");
  stack1 = helpers['if'].call(depth0, "isExpanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(19, program19, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    \r\n	    <a class=\"areatree-link\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "routeToArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "view.areaTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\r\n	\r\n	");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	        ");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n	            <a href=\"#\" class=\"icon-link areatree-expand\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("><span class=\"glyphicon glyphicon-minus\"></a>\r\n	        ");
  return buffer;
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\r\n	            <span class=\"expand-placeholder\"></span>\r\n	        ");
  }

function program19(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	        ");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n	            <a href=\"#\" class=\"icon-link areatree-expand\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("><span class=\"glyphicon glyphicon-plus\"></a>\r\n	        ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	    ");
  stack1 = helpers['if'].call(depth0, "isExpanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	");
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n	        <div class=\"intent-child\">");
  data.buffer.push(escapeExpression((helper = helpers.control || (depth0 && depth0.control),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "areaBrowseItems", "content", options) : helperMissing.call(depth0, "control", "areaBrowseItems", "content", options))));
  data.buffer.push("</div>\r\n	    ");
  return buffer;
  }

  data.buffer.push("<div>\r\n	");
  stack1 = helpers['if'].call(depth0, "controllers.areaBrowse.onlyShowWithTours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["area-browse-items-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.each.call(depth0, "children", {hash:{
    'itemController': ("areaBrowseItem"),
    'itemViewClass': ("App.AreaBrowseItemView")
  },hashTypes:{'itemController': "STRING",'itemViewClass': "STRING"},hashContexts:{'itemController': depth0,'itemViewClass': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["area-browse"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    <div>Loading areas...</div>\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                   ");
  stack1 = helpers.each.call(depth0, "toplevel", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n                ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                       ");
  stack1 = helpers['if'].call(depth0, "toplevel.area.children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                   ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push(" \n                           ");
  data.buffer.push(escapeExpression((helper = helpers.control || (depth0 && depth0.control),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "areaBrowseItems", "toplevel.area", options) : helperMissing.call(depth0, "control", "areaBrowseItems", "toplevel.area", options))));
  data.buffer.push("\n                       ");
  return buffer;
  }

  data.buffer.push("<div class=\"row main-view-container browse-tree-view\">\n	<div class=\"panel panel-default spacing-y\">\n	    <div class=\"panel-heading\">\n	        Browse areas\n	    </div>\n	    <div class=\"panel-body\">\n	        <div class=\"col-sm-12\">\n                ");
  stack1 = helpers['if'].call(depth0, "controller.isLoadingAreas", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	        </div>     \n	    </div>\n	</div>\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["area"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AreaEditView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AreaDetailsView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

  data.buffer.push("<div class=\"main-view-container\">\r\n");
  stack1 = helpers['if'].call(depth0, "editAreaMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["areadetails-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("  \r\n");
  stack1 = helpers.unless.call(depth0, "isRootArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12 edit-container\">\r\n        <div class=\"pull-right\"><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Edit area</a></div>\r\n    </div>       \r\n</div>\r\n");
  return buffer;
  }

function program4(depth0,data) {
  
  var stack1, helper, options;
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "area", "parent", options) : helperMissing.call(depth0, "linkTo", "area", "parent", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<span class=\"small uppercase\">");
  stack1 = helpers._triageMustache.call(depth0, "parent.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12 col-lg-10\">\r\n        <div>");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "markedDescription", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n<div class=\"row\">\r\n	<div class=\"col-sm-12\">\r\n	    <h3>Areas</h3>\r\n	    <ul class=\"inline-list\">\r\n	     ");
  stack1 = helpers.each.call(depth0, "child", "in", "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	     </ul>\r\n	</div>\r\n</div>\r\n");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n	         <li>\r\n		         ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "area", "child", options) : helperMissing.call(depth0, "linkTo", "area", "child", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \r\n		         \r\n	         </li>\r\n	     ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "child.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	");
  stack1 = helpers['if'].call(depth0, "hasTours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n		<div class=\"row\">\r\n		    <div class=\"col-sm-12\">\r\n		        <h3>Tours</h3>\r\n		        ");
  stack1 = helpers['if'].call(depth0, "content.isUpdating", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		        ");
  stack1 = helpers.each.call(depth0, "tour", "in", "tours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \r\n		    </div>\r\n		</div>\r\n	");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("\r\n		            <div>Loading...</div>\r\n		        ");
  }

function program17(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n		            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n		        ");
  return buffer;
  }

  data.buffer.push("\r\n");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n   \r\n<div class=\"row\">\r\n    <div class=\"col-sm-10\">\r\n        <h2>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "parent", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\r\n    </div>\r\n</div>\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers.unless.call(depth0, "isReadOnlyArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["areaedit-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"alert alert-danger\" role=\"alert\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n            Oh noes, there was some validation errors, please try again!\r\n        </div>          \r\n    </div>\r\n</div>\r\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"alert alert-danger\" role=\"alert\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n            Oh noes, you have most likely been logged out. Try to log in again!\r\n        </div>          \r\n    </div>\r\n</div>\r\n");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"alert alert-danger\" role=\"alert\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n           Something went wrong when saving the area, please try again!\r\n        </div>          \r\n    </div>\r\n</div>\r\n");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n            Area was successfully updated\r\n        </div>          \r\n    </div>\r\n</div>\r\n");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n    <div class=\"col-sm-12\">\r\n       <div>Loading area...</div>\r\n    </div>\r\n    ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    <div class=\"col-sm-12\">\r\n        ");
  stack1 = helpers['if'].call(depth0, "isReadOnlyArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startCancelingEdit", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Exit edit</button>\r\n    </div>\r\n    ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <span class=\"info label\" class=\"alert\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" is a root area and cannot be edited, but it's possible to add subareas.</span>\r\n        ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n            <button class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("isNotDirty")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n               <span class=\"glyphicon glyphicon-cloud-upload\"></span> Publish\r\n            </button>\r\n            ");
  stack1 = helpers.unless.call(depth0, "isNotDirty", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("\r\n                <span class=\"info label\">Area have unsaved changes!</span>\r\n            ");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <h2>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\r\n        ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-heading\">\r\n                Area details\r\n            </div>\r\n            <div class=\"panel-body\">\r\n		        <form role=\"form\">              \r\n		            <div class=\"form-group\">\r\n	                    <label for=\"inputAreaName\">Name</label>\r\n	                    <button type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" title=\"Name\" data-content=\"The name of the area. Name is required and can have a maximum of 80 characters.\"></button>\r\n	                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("name"),
    'required': ("true"),
    'maxlength': ("80"),
    'pattern': ("^.{3,80}$"),
    'class': ("form-control"),
    'id': ("inputAreaName")
  },hashTypes:{'value': "ID",'required': "STRING",'maxlength': "STRING",'pattern': "STRING",'class': "STRING",'id': "STRING"},hashContexts:{'value': depth0,'required': depth0,'maxlength': depth0,'pattern': depth0,'class': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("            \r\n		            </div>\r\n		            <div class=\"form-group\">\r\n	                    <label for=\"inputAreaDescription\">Description</label>\r\n	                    <button type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" title=\"Description\" data-content=\"A short description of the area. A description can have a maximum of 500 characters.\"></button>\r\n	                    ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("description"),
    'maxlength': ("500"),
    'class': ("form-control"),
    'id': ("inputAreaDescription")
  },hashTypes:{'value': "ID",'maxlength': "STRING",'class': "STRING",'id': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'class': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n		            </div>\r\n		        </form>\r\n            </div>\r\n        </div>\r\n        ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	                  <li>");
  stack1 = helpers._triageMustache.call(depth0, "child.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li> \r\n	              ");
  return buffer;
  }

function program23(depth0,data) {
  
  
  data.buffer.push("\r\n	                  <li>Area has no subareas</li>\r\n	              ");
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-heading\">\r\n                Tours\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-12\">\r\n                        ");
  stack1 = helpers['if'].call(depth0, "tours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-12\">\r\n                        <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add new tour</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" currently have ");
  stack1 = helpers._triageMustache.call(depth0, "tours.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" tours.\r\n                        ");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            There are currently no tours in ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(".\r\n                        ");
  return buffer;
  }

  data.buffer.push("<!-- \r\n    Template for editing an area\r\n --> \r\n\r\n");
  stack1 = helpers['if'].call(depth0, "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "authenticationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "serverErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "updateSuccessfully", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n<div class=\"row spacing-y\">\r\n    ");
  stack1 = helpers['if'].call(depth0, "isSaving", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n	\r\n<div class=\"row\">\r\n    \r\n    <div class=\"col-sm-12\">\r\n        ");
  stack1 = helpers['if'].call(depth0, "isReadOnlyArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n	    \r\n    <div class=\"col-sm-12\">\r\n	    <div class=\"panel panel-default\">\r\n	        <div class=\"panel-heading\">\r\n	            Subareas\r\n	        </div>\r\n		    <div class=\"panel-body\">\r\n	            <ul class=\"inline-list\">\r\n	              ");
  stack1 = helpers.each.call(depth0, "child", "in", "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	            </ul>\r\n	            <div class=\"row\">\r\n                    <div class=\"col-sm-12\">  \r\n	                   <button class=\"btn btn-primary pull-right\" data-toggle=\"modal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startAddSubArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" data-target=\"#addSubAreaModal\">Add new subarea</button>\r\n	               </div>\r\n	           </div>\r\n		    </div>\r\n	    </div>\r\n    </div>\r\n	    \r\n    ");
  stack1 = helpers.unless.call(depth0, "isReadOnlyArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        \r\n</div>\r\n	\r\n<div class=\"modal fade\" id=\"discardChangesAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                The area has unsaved changes, do you want to discard them?\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>\r\n                <button class=\"btn btn-danger pull-right\" data-dismiss=\"modal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmDiscardChanges", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Discard changes</button>\r\n            </div>\r\n        </div>\r\n    </div>    \r\n</div> \r\n	\r\n<div class=\"modal fade\" id=\"validationErrorsAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                There are validation errors that must be corrected before the area can be published.\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button class=\"btn btn-primary pull-right\"  data-dismiss=\"modal\">OK</button>\r\n            </div>\r\n        </div>\r\n    </div>    \r\n</div>  \r\n	\r\n<div class=\"modal fade\" id=\"confirmPublishAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                Changes will be published, do you want to continue?\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>\r\n                <button class=\"btn btn-danger pull-right\" data-dismiss=\"modal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmSaveArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Publish</button>\r\n            </div>\r\n        </div>\r\n    </div>    \r\n</div> \r\n	\r\n<div class=\"modal fade\" id=\"addSubAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                Add new subarea\r\n            </div>\r\n            <div class=\"modal-body\">\r\n			    <form class=\"form\">\r\n			        <div class=\"form-group\">\r\n			            <label>Name</label>\r\n			            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.FocusTextField", {hash:{
    'valueBinding': ("newArea.name"),
    'required': ("true"),
    'maxlength': ("80"),
    'pattern': ("^.{3,80}$"),
    'class': ("form-control")
  },hashTypes:{'valueBinding': "STRING",'required': "STRING",'maxlength': "STRING",'pattern': "STRING",'class': "STRING"},hashContexts:{'valueBinding': depth0,'required': depth0,'maxlength': depth0,'pattern': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n			        </div>\r\n			        <div class=\"form-group\">\r\n			            <label>Description</label>\r\n			            ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("newArea.description"),
    'maxlength': ("500"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'maxlength': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n			        </div>\r\n			    </form> \r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddSubAreaDialog", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Cancel</button>\r\n                <button class=\"btn btn-primary pull-right\" data-dismiss=\"modal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSubArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add area</button>\r\n            </div>\r\n        </div>\r\n    </div>    \r\n</div> \r\n");
  return buffer;
  
});

Ember.TEMPLATES["areapicker-item-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    ");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n        <a href=\"#\" class=\"icon-link areatree-expand\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleExpandChildren", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("><span class=\"glyphicon glyphicon-minus\"></span></a>\r\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\r\n        <span class=\"expand-placeholder\"></span>\r\n    ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    ");
  stack1 = helpers['if'].call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n        <a href=\"#\" class=\"icon-link areatree-expand\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleExpandChildren", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("><span class=\"glyphicon glyphicon-plus\"></span></a>\r\n    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    <button class=\"areatree is-selected\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</button>  \r\n");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    ");
  stack1 = helpers['if'].call(depth0, "isReadOnlyArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n        <button class=\"areatree\" disabled=\"disabled\" >");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</button>\r\n    ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("    \r\n        <button class=\"areatree\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</button>\r\n    ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n	");
  stack1 = helpers.each.call(depth0, "children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n	\r\n	    <div class=\"intent-child\">");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AreaPickerItemView", {hash:{
    'itemBinding': ("this")
  },hashTypes:{'itemBinding': "STRING"},hashContexts:{'itemBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\r\n	\r\n	");
  return buffer;
  }

  data.buffer.push("\r\n");
  stack1 = helpers['if'].call(depth0, "view.isExpanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "view.isSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  stack1 = helpers['if'].call(depth0, "view.isExpanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["areapicker-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n	\r\n	    <div class=\"row\">\r\n	        <div class=\"col-sm-12\">\r\n	            <h4>Add new area in ");
  stack1 = helpers._triageMustache.call(depth0, "controller.tempSelectedArea.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\r\n	        </div>\r\n	    </div>\r\n	\r\n	    <div class=\"row\">\r\n	        <div class=\"col-sm-12\">\r\n	            <form role=\"form\">\r\n	                <div class=\"form-group\">\r\n	                    <label for=\"inputAreaName\">Name</label>\r\n	                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.FocusTextField", {hash:{
    'id': ("inputAreaName"),
    'class': ("form-control"),
    'valueBinding': ("newArea.name"),
    'required': ("true"),
    'maxlength': ("80"),
    'pattern': ("^.{3,80}$")
  },hashTypes:{'id': "STRING",'class': "STRING",'valueBinding': "STRING",'required': "STRING",'maxlength': "STRING",'pattern': "STRING"},hashContexts:{'id': depth0,'class': depth0,'valueBinding': depth0,'required': depth0,'maxlength': depth0,'pattern': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n	                </div>\r\n	                <div class=\"form-group\">\r\n	                    <label for=\"inputAreaDesc\">Description</label>\r\n	                    ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'id': ("inputAreaDesc"),
    'value': ("newArea.description"),
    'maxlength': ("300"),
    'class': ("form-control")
  },hashTypes:{'id': "STRING",'value': "ID",'maxlength': "STRING",'class': "STRING"},hashContexts:{'id': depth0,'value': depth0,'maxlength': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n	                </div>\r\n	                <div class=\"form-group\">\r\n	                    <hr />\r\n	                </div>   \r\n	                <div class=\"form-group\">\r\n			            <button class=\"btn btn-default pull-left\"");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddSubArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Cancel</button>\r\n			            <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSubArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add area</button>                  \r\n	                </div>             \r\n	            </form>\r\n	        </div>\r\n	    </div> \r\n	    \r\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	\r\n		");
  stack1 = helpers['if'].call(depth0, "view.loading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	    ");
  stack1 = helpers.each.call(depth0, "toplevel", "in", "toplevels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	 \r\n		<div class=\"row\">\r\n		   <div class=\"col-sm-12\">\r\n		       <hr />\r\n			    Selected: <strong>");
  stack1 = helpers._triageMustache.call(depth0, "controller.tempSelectedArea.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>\r\n			    <a class=\"pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startAddingSubArea", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add new area in ");
  stack1 = helpers._triageMustache.call(depth0, "controller.tempSelectedArea.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\r\n		    </div>\r\n		</div>\r\n	\r\n		<div class=\"row\">\r\n		    <div class=\"col-sm-12\">\r\n		       <hr />\r\n		       <button class=\"btn btn-default pull-left\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closeAreaPickerDialog", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Cancel</button>\r\n		       <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmSelectedArea", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Set area</button>\r\n		    </div>\r\n		</div>\r\n		\r\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("<div>Loading areas...</div>");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	\r\n	        ");
  stack1 = helpers['if'].call(depth0, "toplevel.area.children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	    ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \r\n	            \r\n	            ");
  stack1 = helpers.each.call(depth0, "toplevel.area.children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	            \r\n	        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n	            \r\n	                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AreaPickerItemView", {hash:{
    'itemBinding': ("this")
  },hashTypes:{'itemBinding': "STRING"},hashContexts:{'itemBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n	            \r\n	            ");
  return buffer;
  }

  data.buffer.push("\r\n<div class=\"browse-tree-view\">  \r\n	");
  stack1 = helpers['if'].call(depth0, "addSubareaMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["breadcrumb-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers.unless.call(depth0, "parent.isRootArea", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression((helper = helpers.control || (depth0 && depth0.control),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "breadCrumb", "parent", options) : helperMissing.call(depth0, "control", "breadCrumb", "parent", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "parent", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<li class=\"uppercase\">");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "area", "content", options) : helperMissing.call(depth0, "linkTo", "area", "content", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>");
  return buffer;
  
});

Ember.TEMPLATES["browse-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				           ");
  stack1 = helpers['if'].call(depth0, "toplevel.area.children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				       ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push(" \n				               ");
  data.buffer.push(escapeExpression((helper = helpers.control || (depth0 && depth0.control),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "areaBrowseItems", "toplevel.area", options) : helperMissing.call(depth0, "control", "areaBrowseItems", "toplevel.area", options))));
  data.buffer.push("\n				           ");
  return buffer;
  }

  data.buffer.push("\n<h3>Browse by area</h3>\n\n<p>\nFind tours on the map or by browsing the area tree.\n</p>\n\n<!-- Background needs to be set in some other way, does not scale correctly\n<img class=\"area-browse-bg\" src=\"images/world.svg\">\n-->\n\n<div class=\"row\">\n     <div class=\"small-12 columns\">\n            <div class=\"section-container auto\" data-section>\n        \n	           <section class=\"active\">\n	               <p class=\"title\" data-section-title><a href=\"#panel1\">Map view</a></p>\n	               <div class=\"content\" data-section-content>\n	                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourClusterMapView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("   \n	               </div>\n	           </section>\n	           \n	           <section>\n	               <p class=\"title\" data-section-title><a href=\"#panel2\">Tree view</a></p>\n	               <div class=\"content\" data-section-content>\n	                   ");
  stack1 = helpers.each.call(depth0, "toplevel", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("    \n	               </div>\n	           </section>\n           \n           </div>\n    </div>\n</div>\n\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["browse-map-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers['browse-tourmap'] || (depth0 && depth0['browse-tourmap']),options={hash:{
    'store': ("store"),
    'tours': ("liteTours")
  },hashTypes:{'store': "ID",'tours': "ID"},hashContexts:{'store': depth0,'tours': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "browse-tourmap", options))));
  data.buffer.push("\r\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n            Loading map...\r\n        ");
  }

  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        ");
  stack1 = helpers['if'].call(depth0, "liteTours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/browse-tourmap"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"browse-map-view full-screen\">\r\n	<div id=\"tourMapRootElement\" class=\"full-screen\"></div>\r\n	<button class=\"btn btn-primary btn-my-position\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleMyPosition", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n	    <span class=\"glyphicon glyphicon-screenshot\"></span>\r\n	</button>   \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["comment-item-view-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<p/>\r\n<div class=\"row\">\r\n    <div class=\"small-12 columns\">\r\n        <span class=\"tourview-label\">");
  data.buffer.push(escapeExpression((helper = helpers.displayTimestamp || (depth0 && depth0.displayTimestamp),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "time", options) : helperMissing.call(depth0, "displayTimestamp", "time", options))));
  data.buffer.push("</span>\r\n        <span class=\"comment-username\">");
  stack1 = helpers._triageMustache.call(depth0, "userName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"small-12 columns\">\r\n        <div class=\"comment-text\">");
  stack1 = helpers._triageMustache.call(depth0, "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["fileupload-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<!--  \r\n    View that wraps the javascript file uploader. The original UI is hidden\r\n -->\r\n \r\n<input type=\"file\" id=\"fileInputElement\" class=\"hide\" />\r\n<button class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openFileDialog", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("havePendingOperations")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(">Select image...</button>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("About");
  }

  data.buffer.push("\r\n<div class=\"footer-box\">\r\n        \r\n\r\n  \r\n    <div class=\"row\">\r\n          \r\n        <div class=\"small-12 columns small-centered\">\r\n            <p class=\"randopedia-logo-text randopedia-logo-footer\">Randopedia</p>\r\n        </div>\r\n        \r\n    </div>\r\n\r\n    <div class=\"row\">\r\n          \r\n        <div class=\"small-8 columns small-centered\">\r\n            <div class=\"footer-links-container\">\r\n                ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "linkTo", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">Home</a>\r\n            </div>\r\n        </div>\r\n        \r\n    </div>\r\n    \r\n    <div class=\"row\">\r\n	    <div class=\"small-8 columns small-centered\">\r\n	       <div class=\"footer-facebook-container\">\r\n	           <a target=\"_blank\" href=\"https://www.facebook.com/randopedia.net\"><img src=\"images/facebook_round_logo.png\" alt=\"Visit us on facebook\" width=\"40px\" height=\"40px\"></a>\r\n	       </div>\r\n	    </div>\r\n    </div>\r\n    \r\n    <div class=\"row\">\r\n        \r\n        <div class=\"small-12 columns small-centered\">\r\n            <p class=\"skitour-labels\">\r\n                <span class=\"green\">[Ski de randonnee] </span> \r\n                <span class=\"red\">[Ski touren] </span>\r\n                <span class=\"brown\">[Esqui de travesia] </span>\r\n                <span class=\"blue\">[Topptur] </span>\r\n                <span class=\"green\">[Sci alpinismo]</span>\r\n            </p>\r\n        </div>        \r\n        \r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        \r\n        <div class=\"small-12 columns small-centered\">\r\n            <div style=\"float: center; text-align: center; color: #E0E0E0; font-size: 0.7em; margin-top: 1em;\">\r\n                <a target=\"_blank\" rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\">\r\n                <img alt=\"Creative Commons License\" style=\"border-width:0; float: center;\" src=\"http://i.creativecommons.org/l/by/4.0/88x31.png\" />\r\n                </a>\r\n                \r\n                <p style=\"margin-top: 0.5em;\">\r\n                All tour data on <span xmlns:dct=\"http://purl.org/dc/terms/\" property=\"dct:title\">randopedia.net</span> is licensed under a <a style=\"color: #F0F0F0;\" target=\"_blank\" rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\">Creative Commons Attribution 4.0 International License</a>.\r\n                </p>\r\n            \r\n            </div>    \r\n            \r\n       </div>\r\n    \r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["header-large-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("<p class=\"randopedia-logo-text randopedia-logo-header left\">Randopedia</p>");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                    <li class=\"header-link right\">\r\n                        <a id=\"toggleUserMenuDropdown\" data-dropdown=\"userMenuDropdown\" data-options=\"align_right:true\">Menu</a>\r\n                    </li>\r\n                ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggingIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program6(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li class=\"right\"><div class=\"header-login-text\">Logging in...</div></li>\r\n                    ");
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li class=\"header-link right\">\r\n                            <a id=\"toggleLoginDropdown\" data-dropdown=\"loginDropdown\">Login</a>\r\n                        </li>\r\n                    ");
  }

  data.buffer.push("<div class=\"header-box\">\r\n    <div class=\"row\">\r\n        <div class=\"small-9 large-3 columns\">\r\n            ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "linkTo", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        \r\n        <div class=\"large-5 columns hide-for-small\">             \r\n            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SearchTextField", {hash:{
    'valueBinding': ("controllers.search.query")
  },hashTypes:{'valueBinding': "STRING"},hashContexts:{'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </div>\r\n        \r\n        <div class=\"large-4 columns hide-for-small\">\r\n            <ul class=\"header-link-list\">\r\n                \r\n                \r\n                ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </ul>\r\n        </div>\r\n        \r\n    </div>\r\n</div>\r\n\r\n<div id=\"loginDropdown\" class=\"f-dropdown content small\" data-dropdown-content>\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.LoginView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n</div>\r\n\r\n<div id=\"userMenuDropdown\" class=\"f-dropdown content small\" data-dropdown-content>\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.UserMenuView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n	           <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "topbarMenuLink", "tour.new", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data})));
  data.buffer.push(">Add new tour</a>\r\n	           <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "topbarMenuLink", "mytours", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data})));
  data.buffer.push(">View my tours</a>\r\n           ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n               ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggingIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n           ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\r\n                    <div class=\"header-login-text top-bar-menu-nolink\">Logging in...</div>   \r\n               ");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a data-toggle=\"modal\" data-target=\"#loginViewModalId\">Login</a>\r\n               ");
  }

  data.buffer.push("<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\r\n    <div class=\"container-fluid\">\r\n    \r\n	    <!-- Brand and toggle get grouped for better mobile display -->\r\n	    <div class=\"navbar-header\">\r\n			<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n				<span class=\"sr-only\">Toggle navigation</span>\r\n				<span class=\"icon-bar\"></span>\r\n				<span class=\"icon-bar\"></span>\r\n				<span class=\"icon-bar\"></span>\r\n			</button>\r\n			<a class=\"navbar-brand randopedia-logo-text\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">Randopedia</a>\r\n			");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SearchTextField", {hash:{
    'valueBinding': ("controllers.search.query"),
    'class': ("searchbox")
  },hashTypes:{'valueBinding': "STRING",'class': "STRING"},hashContexts:{'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n	    </div>\r\n	    \r\n	    <!-- Collect the nav links, forms, and other content for toggling -->\r\n	    <div class=\"collapse navbar-collapse main-menu-container\" id=\"bs-example-navbar-collapse-1\">\r\n			\r\n           ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n           \r\n           <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "topbarMenuLink", "area-browse", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data})));
  data.buffer.push(">Browse areas</a>\r\n           <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "topbarMenuLink", "about", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data})));
  data.buffer.push(" data-toggle=\"collapse\" data-target=\".nav-collapse\">About Randopedia</a>\r\n       \r\n	    </div>\r\n\r\n    </div>\r\n</nav>\r\n\r\n<div class=\"modal fade\" id=\"loginViewModalId\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.LoginModalView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["index-large-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "browse-map", options) : helperMissing.call(depth0, "partial", "browse-map", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "browse-areatree", options) : helperMissing.call(depth0, "partial", "browse-areatree", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("about");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n	        <p>You're logged in and ready to add new tours or update current ones with more data, pictures and routes.</p>\r\n	        ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n	        <p>Login to contribute by adding new tours or update current ones with more data, pictures and routes.</p>\r\n	        ");
  }

  stack1 = helpers['if'].call(depth0, "showBrowseMap", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<div style=\"margin-top:2em;\"></div>\r\n\r\n<div class=\"row paragraph\">\r\n    <div class=\"small-12 large-7 columns\">\r\n	    <div class=\"welcome-text-box\">\r\n	        <h5 class=\"subheader\" style=\"color: #000;\">Randopedia - the ski tour encyclopedia</h5>\r\n	        \r\n	        <p>Randopedia is aiming to become the ultimate ski tour database where you can browse areas and search for ski tours all over the world.</p> \r\n	        \r\n	        <p>Want to know more? Have a look at the ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "linkTo", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" page.</p>\r\n	        \r\n	        ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	        \r\n	    </div>\r\n    </div>\r\n    \r\n    <div class=\"large-5 columns right hide-for-small\">\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourTeaserView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n    \r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["index-small-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <div class=\"row\">\n        <div class=\"small-12 columns\">\n            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SearchTextField", {hash:{
    'valueBinding': ("controllers.search.query")
  },hashTypes:{'valueBinding': "STRING"},hashContexts:{'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("    \n        </div>\n    </div>\n    \n    ");
  stack1 = helpers.unless.call(depth0, "controllers.search.hasSearchResults", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    \n    ");
  stack1 = helpers['if'].call(depth0, "controllers.search.hasSearchResults", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    \n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n                <div class=\"welcome-text-box\">\n                \n                    <h5 class=\"subheader\" style=\"color: #000;\">Randopedia - the ski tour encyclopedia</h5>\n                \n                    <p>Randopedia is aiming to become the ultimate ski tour database where you can browse areas and search for ski tours all over the world.</p> \n                \n                    <p>Want to know more? Have a look at the ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "linkTo", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" page.</p>\n                \n                    ");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    \n                </div>\n            </div>\n        </div>\n        \n        <div style=\"margin-top:1em;\"></div>\n        \n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourTeaserView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            </div>\n        </div>\n\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("about");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                        <p>You're logged in and ready to add new tours or update current ones with more data, pictures and routes.</p>\n                    ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n                        <p>Login to contribute by adding new tours or update current ones with more data, pictures and routes.</p>\n                    ");
  }

function program9(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "search", options) : helperMissing.call(depth0, "render", "search", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['browse-tourmap'] || (depth0 && depth0['browse-tourmap']),options={hash:{
    'store': ("store"),
    'tours': ("liteTours")
  },hashTypes:{'store': "ID",'tours': "ID"},hashContexts:{'store': depth0,'tours': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "browse-tourmap", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "browse-areatree", options) : helperMissing.call(depth0, "partial", "browse-areatree", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n    <div class=\"main-tab-container\">\n        <button id=\"index-tab-1\" class=\"brown\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToHome", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Home / Search</button><button id=\"index-tab-2\" class=\"blue\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToMap", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Tour map</button><button id=\"index-tab-3\" class=\"green\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToAreas", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Areas</button>\n    </div>\n</div>\n\n");
  stack1 = helpers['if'].call(depth0, "view.showHome", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "view.showMap", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "view.showAreas", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n    <div id=\"full-screen-map-container\" class=\"full-screen\">\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['browse-tourmap'] || (depth0 && depth0['browse-tourmap']),options={hash:{
    'store': ("store"),
    'tours': ("liteTours"),
    'zoomLevel': ("currentMapZoomLevel"),
    'mapCenter': ("currentMapCenter"),
    'tour': ("tourForMapView"),
    'zoomChanged': ("mapZoomChanged"),
    'centerChanged': ("mapCenterChanged")
  },hashTypes:{'store': "ID",'tours': "ID",'zoomLevel': "ID",'mapCenter': "ID",'tour': "ID",'zoomChanged': "STRING",'centerChanged': "STRING"},hashContexts:{'store': depth0,'tours': depth0,'zoomLevel': depth0,'mapCenter': depth0,'tour': depth0,'zoomChanged': depth0,'centerChanged': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "browse-tourmap", options))));
  data.buffer.push("\r\n    </div>\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n    <div class=\"loader\">Loading map...</div>\r\n");
  }

  data.buffer.push("\r\n");
  stack1 = helpers['if'].call(depth0, "liteTours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"loader\">Loading Randopedia...</div>");
  
});

Ember.TEMPLATES["login-modal-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("here");
  }

  data.buffer.push("<div class=\"modal-dialog login-view\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n            <h4 class=\"modal-title\" id=\"myModalLabel\">Select account to login with</h4>\n        </div>\n        <div class=\"modal-body\">\n            <a class=\"login-link\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginWithFacebook", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                <div>\n                Login with <img src=\"images/facebook_logo.png\">\n                </div>\n            </a>\n            \n            <a class=\"login-link\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginWithGoogle", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                <div>\n                Login with <img src=\"images/google_logo.png\" width=\"100\">\n                </div>\n            </a>\n        </div>\n        <hr />\n        <div class=\"spacing\">\n	        <small>\n	            Randopedia doesn't use or store any sensitive information about the account being used. Read more about privacy ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "linkTo", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(".\n	        </small>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["loginCallback"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    Connecting to your facebook account...<img src=\"images/ajax-loader.gif\"/>\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    You're logged in\n");
  }

  stack1 = helpers['if'].call(depth0, "registering", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<!-- \nLogin and authentication\nPattern from facebook (https://developers.facebook.com/docs/facebook-login/access-tokens/)\nClient requests token (login page i randopedia)\nIf successfull the client now has a valid facebook token\nThe client tells the server, our rest api, about this token\nCan be some kind of registering page\nStore user and user id in database\nMaybe best to have a user model server side and let server communicate with facebook\n(as in the pattern on facebook)\nSteps (not logged in scenario)\n1. User clicks login\n2. Auth request to facebook, user enters creds in popup\n3. Callback from facebook with\n -->\n");
  return buffer;
  
});

Ember.TEMPLATES["mytours"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n			<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\r\n			  <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n			  An error occurred when getting your drafts, maybe you have been logged out? Try to reload the page and log in again.\r\n			</div>\r\n	    </div>\r\n	</div>\r\n	");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	\r\n		");
  stack1 = helpers['if'].call(depth0, "isLoadingDrafts", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\r\n		\r\n		    <div class=\"row\">\r\n		        <div class=col-sm-12>\r\n		            <div>Loading tours...</div>\r\n		        </div>\r\n		    </div>\r\n		\r\n		");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n		\r\n		    ");
  stack1 = helpers.each.call(depth0, "tour", "in", "drafts", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		\r\n		");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n		        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n		    ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n		        <pre>You have no saved tour drafts</pre>\r\n		    ");
  }

  data.buffer.push("<div class=\"main-view-container\">\r\n	<h3>My tours (drafts)</h3>\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "serverErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["search"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n	    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"main-view-container\">\n\n	<div class=\"row\">\n	    <div class=\"col-sm-12\">\n	        <span class=\"pull-right spacing\"><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clearResult", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Clear</a></span>\n			<h3>\n			    Tour search<span class=\"small\"> (");
  stack1 = helpers._triageMustache.call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" tours found)</span>\n			</h3>\n	    </div>\n	</div> \n	\n	");
  stack1 = helpers.each.call(depth0, "tour", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["stats"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"row main-view-container\">\r\n    <div class=\"col-sm-12\">\r\n    \r\n        <table class=\"table table-striped\">\r\n          <thead>\r\n            <tr>\r\n              <th width=\"250\">Stat</th>\r\n              <th>Value</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n                <td>Published tours</td>\r\n                <td>");
  stack1 = helpers._triageMustache.call(depth0, "publishedTours", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n            </tr>\r\n            <tr>\r\n                <td>Published areas</td>\r\n                <td>");
  stack1 = helpers._triageMustache.call(depth0, "publishedAreas", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n            </tr>\r\n            <tr>\r\n                <td>Areas with no tours or sub areas</td>\r\n                <td>");
  stack1 = helpers._triageMustache.call(depth0, "deadAreas", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n            </tr>\r\n            <tr>\r\n                <td>Drafts</td>\r\n                <td>");
  stack1 = helpers._triageMustache.call(depth0, "tourDrafts", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        \r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["tag"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <img src=\"images/ajax-loader.gif\"/>\n");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h3>\n            #");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </h3>\n    </div>\n</div>\n");
  stack1 = helpers['if'].call(depth0, "content.isUpdating", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = helpers.each.call(depth0, "tour", "in", "tours", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["tags"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "tag", "tag", options) : helperMissing.call(depth0, "link-to", "tag", "tag", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("#");
  stack1 = helpers._triageMustache.call(depth0, "tag.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <h3>\n            Here are the top tags for randopedia.net!\n        </h3>\n    </div>\n</div>\n");
  stack1 = helpers.each.call(depth0, "tag", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["tour-teaser-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n	<div class=\"teaser-container\">\r\n	    <img id=\"teaser-img-id\" class=\"teaser-img\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'src': ("teaserTour.portfolioImage.imageFile")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(">\r\n	  \r\n	    ");
  stack1 = helpers['if'].call(depth0, "teaserTour.portfolioImage.imageFile", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	  \r\n	    ");
  stack1 = helpers['if'].call(depth0, "isLoadingTour", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    \r\n	</div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n	        <div class=\"teaser-text-container\">\r\n	            ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "tour", "teaserTour", options) : helperMissing.call(depth0, "linkTo", "tour", "teaserTour", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<span class=\"teaser-area\">, ");
  stack1 = helpers._triageMustache.call(depth0, "teaserTour.area.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n	            <span class=\"right\"><a class=\"teaser-refresh-link\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "reloadTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><i class=\"foundicon-refresh right\"></i></a></span>\r\n	        </div>\r\n	    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "teaserTour.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program5(depth0,data) {
  
  
  data.buffer.push("<div class=\"teaser-preloader preloader\"></div>");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n    <div>Loading tour image...</div>\r\n");
  }

  stack1 = helpers['if'].call(depth0, "teaserTour", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["tour"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourEditView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourDetailsView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "editTourMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["tourclustermap-view-OBSOLETE"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"mapContainer\">\r\n    <div id=\"tourMapRootElement\"></div>\r\n</div>");
  
});

Ember.TEMPLATES["tourdetails-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-12 edit-container\">\r\n            <div class=\"pull-right\">");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "tour.edit", "model", options) : helperMissing.call(depth0, "link-to", "tour.edit", "model", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n        </div>\r\n    </div>\r\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Edit tour");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <div class=\"alert alert-info alert-dismissible\" role=\"alert\">\r\n	            <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n	            This is a draft, the tour has not yet been published\r\n	        </div>\r\n	    </div>\r\n	</div>\r\n	");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <div class=\"alert alert-danger\" role=\"alert\">\r\n	            <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n	            Tour is marked as deleted and will eventually be permanently deleted from the databse\r\n	        </div>\r\n	    </div>\r\n	</div>\r\n	");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <span class=\"small\">(");
  stack1 = helpers._triageMustache.call(depth0, "elevationMax", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("m)</span> ");
  return buffer;
  }

function program10(depth0,data) {
  
  
  data.buffer.push("\r\n	            <span class=\"small\">\r\n	                <a id=\"incompleteInfoButtonId\" \r\n			           data-toggle=\"popover\"\r\n			           data-trigger=\"focus\"\r\n			           data-content=\"This tour is marked as incomplete. This means that it might lack some data, but it should be enough information available to make the description useful anyway.\">\r\n	                   <span class=\"glyphicon glyphicon-warning-sign danger\"></span>\r\n	                </a>\r\n	            </span>\r\n	            ");
  }

function program12(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "timingMin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("-");
  stack1 = helpers._triageMustache.call(depth0, "timingMax", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \r\n			            ");
  stack1 = helpers._triageMustache.call(depth0, "elevationGain", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("m &uarr; \r\n			        ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("    \r\n			            ");
  stack1 = helpers._triageMustache.call(depth0, "elevationLoss", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("m &darr;\r\n			        ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n			<div class=\"row\">\r\n			    <div class=\"col-xs-5 col-sm-3 col-lg-2\">\r\n			        <label>Grade:</label>\r\n			    </div>\r\n			    <div class=\"col-xs-7 col-sm-9 col-lg-10\">\r\n			         <a data-toggle=\"modal\" data-target=\"#tourDetailsGradeGuideModal\">");
  data.buffer.push(escapeExpression((helper = helpers.resolveGradeName || (depth0 && depth0.resolveGradeName),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "grade", options) : helperMissing.call(depth0, "resolveGradeName", "grade", options))));
  data.buffer.push("</a>\r\n			    </div>       \r\n			</div>   \r\n			");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \r\n			<div class=\"row\">   \r\n		        <div class=\"col-xs-5 col-sm-3 col-lg-2\">\r\n		            <label>Steepness:</label>\r\n		        </div>\r\n		        <div class=\"col-xs-7 col-sm-9 col-lg-10\">\r\n		            ");
  stack1 = helpers._triageMustache.call(depth0, "degreesMax", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("&#176;\r\n		        </div>\r\n	        </div>\r\n	         ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n		    ");
  stack1 = helpers['if'].call(depth0, "timeOfYearTo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n			<div class=\"row\">	\r\n			    <div class=\"col-xs-5 col-sm-3 col-sm-3 col-lg-2\">\r\n			        <label>Season:</label>\r\n			    </div>\r\n			    <div class=\"col-xs-7 col-sm-9 col-lg-10\">\r\n			        ");
  data.buffer.push(escapeExpression((helper = helpers.resolveMonthName || (depth0 && depth0.resolveMonthName),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "timeOfYearFrom", options) : helperMissing.call(depth0, "resolveMonthName", "timeOfYearFrom", options))));
  data.buffer.push(" - ");
  data.buffer.push(escapeExpression((helper = helpers.resolveMonthName || (depth0 && depth0.resolveMonthName),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "timeOfYearTo", options) : helperMissing.call(depth0, "resolveMonthName", "timeOfYearTo", options))));
  data.buffer.push("\r\n			    </div>            \r\n			</div>\r\n			");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n			<div class=\"row\">\r\n			    <div class=\"col-xs-5 col-sm-3 col-lg-2\">\r\n			        <label>Aspect:</label>\r\n			    </div>\r\n			    <div class=\"col-xs-7 col-sm-9 col-lg-9\">\r\n			        ");
  data.buffer.push(escapeExpression((helper = helpers.resolveAspectName || (depth0 && depth0.resolveAspectName),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "aspect", options) : helperMissing.call(depth0, "resolveAspectName", "aspect", options))));
  data.buffer.push("\r\n			    </div>\r\n			</div>\r\n	        ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	            <label>Tags:</label>\r\n	            ");
  stack1 = helpers.each.call(depth0, "tag", "in", "tagsArray", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	        ");
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n	                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "tag", "tag", options) : helperMissing.call(depth0, "link-to", "tag", "tag", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	            ");
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" #");
  stack1 = helpers._triageMustache.call(depth0, "tag", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <button class=\"btn btn-primary btn-view-on-map\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewTourOnMap", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                   <span class=\"glyphicon glyphicon-globe\"></span><span class=\"spacing-x\">View tour on map</span>\r\n                </button>    \r\n            ");
  return buffer;
  }

function program35(depth0,data) {
  
  
  data.buffer.push("\r\n                <div>No map is available for this tour</div>\r\n            ");
  }

function program37(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	    <div class=\"col-sm-12 col-sm-6\">\r\n	        <div class=\"panel panel-danger\">\r\n	            <div class=\"panel-heading\">Hazards</div>\r\n		        <div class=\"panel-body\">\r\n		           ");
  stack1 = helpers._triageMustache.call(depth0, "hazardsDescription", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	            </div>  \r\n	        </div>\r\n	    </div>\r\n	    ");
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	    <div class=\"col-sm-12 col-sm-6\">\r\n	        <div class=\"panel panel-info\">\r\n	            <div class=\"panel-heading\">Mountaineering</div>\r\n	            <div class=\"panel-body\">\r\n	               ");
  stack1 = helpers._triageMustache.call(depth0, "toolsDescription", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	            </div>\r\n	        </div>\r\n	    </div>\r\n	    <!--<i class=\"randicon-mountaineering tourview-panel-icon\"></i> -->\r\n	    ");
  return buffer;
  }

function program41(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n	        <div id=\"images-container\">\r\n				<ul class=\"bjqs\">\r\n				    ");
  stack1 = helpers.each.call(depth0, "image", "in", "images", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n				</ul>\r\n			</div>\r\n	        ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n				         <li><img ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'src': ("image.imageFile")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'title': ("image.caption")
  },hashTypes:{'title': "STRING"},hashContexts:{'title': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push("></li>\r\n				    ");
  return buffer;
  }

function program44(depth0,data) {
  
  
  data.buffer.push("\r\n	            <p>No images available for this tour</p>	\r\n		    ");
  }

function program46(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n			    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourMapView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n		    ");
  return buffer;
  }

function program48(depth0,data) {
  
  
  data.buffer.push("\r\n		        <p>No map is available for this tour</p>\r\n		    ");
  }

  data.buffer.push("<div class=\"main-view-container tour-details-view\">\r\n\r\n	<div class=\"hidden\">");
  stack1 = helpers._triageMustache.call(depth0, "view.imageLoaded", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "controllers.login.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    \r\n	");
  stack1 = helpers['if'].call(depth0, "isDraft", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "isDeleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n		    <ul class=\"inline-list\">\r\n		       ");
  data.buffer.push(escapeExpression((helper = helpers.control || (depth0 && depth0.control),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "breadCrumb", "area", options) : helperMissing.call(depth0, "control", "breadCrumb", "area", options))));
  data.buffer.push("\r\n		    </ul>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <h2>\r\n	            ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "elevationMax", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \r\n	            ");
  stack1 = helpers['if'].call(depth0, "isIncomplete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	        </h2>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <em>");
  stack1 = helpers._triageMustache.call(depth0, "shortDescription", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</em>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row tour-props\">\r\n	    <div class=\"col-sm-12 col-lg-6\">\r\n		        \r\n			<div class=\"row\">\r\n			    <div class=\"col-xs-5 col-sm-3 col-lg-2\">\r\n			        <label>Time:</label>\r\n			    </div>\r\n			    <div class=\"col-xs-7 col-sm-9 col-lg-10\">\r\n			        ");
  stack1 = helpers['if'].call(depth0, "timingMin", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers['if'].call(depth0, "timingMax", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("h\r\n			    </div>\r\n			</div>\r\n		\r\n			<div class=\"row\">\r\n			    <div class=\"col-xs-5 col-sm-3 col-lg-2\">\r\n			        <label>Elevation:</label>\r\n			    </div>\r\n			    <div class=\"col-xs-7 col-sm-9 col-lg-10\">\r\n	                   ");
  stack1 = helpers['if'].call(depth0, "elevationGain", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			        ");
  stack1 = helpers['if'].call(depth0, "elevationLoss", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			    </div>\r\n			</div>\r\n				\r\n			");
  stack1 = helpers['if'].call(depth0, "grade", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			\r\n			");
  stack1 = helpers['if'].call(depth0, "degreesMax", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \r\n				   \r\n		    ");
  stack1 = helpers['if'].call(depth0, "timeOfYearFrom", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n				\r\n			");
  stack1 = helpers['if'].call(depth0, "aspect", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			\r\n	    </div>\r\n	    \r\n	    <div class=\"col-sm-12 col-lg-6\">\r\n	        ");
  stack1 = helpers['if'].call(depth0, "tags", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    </div>\r\n	    \r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "hasPaths", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(35, program35, data),fn:self.program(33, program33, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("    \r\n        </div>\r\n                \r\n	    <div class=\"col-sm-12\">\r\n	        <div class=\"panel panel-default\">\r\n	            <div class=\"panel-heading\">Access point</div>\r\n	            <div class=\"panel-body\">\r\n	               ");
  stack1 = helpers._triageMustache.call(depth0, "accessPoint", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	            </div>\r\n	        </div>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <div class=\"panel panel-default\">\r\n	            <div class=\"panel-heading\">Description</div>\r\n	            <div class=\"panel-body\">\r\n	                <div>");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "markedItinerary", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\r\n	            </div>\r\n	        </div>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    ");
  stack1 = helpers['if'].call(depth0, "haveHazards", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	     \r\n	    ");
  stack1 = helpers['if'].call(depth0, "requiresTools", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	</div>\r\n	\r\n	<div class=\"row\">    \r\n	    <div class=\"col-sm-12\">\r\n	        <h4>Images<span class=\"small\">(");
  stack1 = helpers._triageMustache.call(depth0, "images.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(")</span></h4>\r\n	\r\n	        ");
  stack1 = helpers['if'].call(depth0, "hasImages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(44, program44, data),fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n		    <h4>Map</h4>\r\n		    ");
  stack1 = helpers['if'].call(depth0, "hasPaths", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(48, program48, data),fn:self.program(46, program46, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    </div>    \r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	    \r\n	        <!--  TODO: Add Disqus here -->\r\n	        \r\n	    </div>    \r\n	</div>\r\n	\r\n	<div class=\"modal fade\" id=\"tourDetailsGradeGuideModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n		<div class=\"modal-dialog modal-lg login-view\">\r\n		    <div class=\"modal-content\">\r\n		        <div class=\"modal-header\">\r\n		            <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n		            <h4 class=\"modal-title\" id=\"myModalLabel\">Grades</h4>\r\n		        </div>\r\n		        <div class=\"modal-body\">\r\n	                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about-grades", options) : helperMissing.call(depth0, "partial", "about-grades", options))));
  data.buffer.push("\r\n		        </div>\r\n		    </div>\r\n		</div>\r\n	</div>\r\n\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["touredit-images"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n	<div class=\"row\">\r\n	   <div class=\"col-sm-12\">\r\n	        <div class=\"panel\">\r\n	            <div class=\"row\">\r\n	                <div class=\"col-sm-12 col-lg-2\">\r\n                         <div class=\"thumbnail-wrapper\">\r\n                            <img ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'src': ("newImage.imageFile")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" class=\"thumbnail-image\" />\r\n                        </div>\r\n	                </div>\r\n	                <div class=\"col-sm-12 col-lg-10\">\r\n                        <form class=\"form\">\r\n                            <div class=\"form-group\">\r\n                                <label>Caption</label>\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("image.caption"),
    'maxlength': ("300"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'maxlength': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <div class=\"button-group pull-right\">\r\n                                    <button class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeNewImage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn btn-default\">Cancel</button>\r\n                                    <button class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveNewImage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Upload image</button>\r\n                                </div>                   \r\n                            </div>                         \r\n                        </form>\r\n	                </div>\r\n	            </div>\r\n	        </div>\r\n	     </div>\r\n	</div>\r\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n		    ");
  stack1 = helpers.unless.call(depth0, "image.isNew", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n	            <div class=\"col-sm-12\">\r\n	                <div class=\"\">\r\n	                    <div class=\"row\">\r\n	                        <div class=\"col-sm-12 col-lg-2\">\r\n	                            <div class=\"\">\r\n	                                 <div class=\"thumbnail-wrapper\">\r\n	                                    <img ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'src': ("image.imageFile")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" class=\"thumbnail-image\" />\r\n	                                </div>\r\n	                            </div>\r\n	                        </div>\r\n	                        <div class=\"col-sm-12 col-lg-10\">\r\n	                            <form class=\"form\">\r\n	                                <div class=\"form-group\">\r\n		                                <label>Caption</label>\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("image.caption"),
    'maxlength': ("300"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'maxlength': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"checkbox\">\r\n										    <label>\r\n										        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("isPorfolio"),
    'checked': ("image.isPortfolio")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" Is portfolio image\r\n										    </label>\r\n										 </div>\r\n										 <div class=\"button-group pull-right\">\r\n		                                      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveImage", "image", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("image.isUpdateDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" class=\"btn btn-primary\">Update</button>\r\n		                                      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startDeleteImage", "image", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" data-toggle=\"modal\" data-target=\"#confirmDeleteImageModal\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("image.isDeleteDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" class=\"btn btn-danger\">Delete image</button>\r\n		                                 </div>\r\n                                    </div>                                            \r\n                                </form>\r\n	                        </div>\r\n	                    </div>\r\n	                </div>\r\n	            </div>\r\n		    ");
  return buffer;
  }

  data.buffer.push("<!-- \r\n    Template for an image uploader with preview of selected images    \r\n-->\r\n<div class=\"image-upload-view\">\r\n\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <h4>Upload new images</h4>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <div>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.FileUploadView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\r\n	    </div>\r\n	</div>\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "hasNewImage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <div class=\"spacing-y\">\r\n	           Images will be scaled down to 1024*768px (Recommended to only upload images in landscape format)\r\n	        </div>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <hr />\r\n	        <h4>Current tour images <span class=\"secondary-text\">(");
  stack1 = helpers._triageMustache.call(depth0, "images.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(")</span></h4>\r\n	    </div>\r\n	</div>\r\n	\r\n	<div class=\"row\">\r\n		<div class=\"col-sm-12\">\r\n		");
  stack1 = helpers.each.call(depth0, "image", "in", "images", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	    </div>         \r\n	</div>\r\n	\r\n	<div class=\"modal fade\" id=\"confirmDeleteImageModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n	    <div class=\"modal-dialog modal-lg\">\r\n	        <div class=\"modal-content\">\r\n	            <div class=\"modal-body\">\r\n	                Are you sure you want to delete the image? It will not be possible to restore the image.\r\n	            </div>\r\n	            <div class=\"modal-footer\">\r\n                   <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>                \r\n                   <button class=\"btn btn-danger pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmDeleteImage", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Delete image</button>\r\n	            </div>\r\n	        </div>\r\n	    </div>    \r\n	</div>\r\n\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["touredit-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n            <div class=\"alert alert-danger\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                Looks like you have been logged out, try to log in again.\r\n            </div>	        \r\n	    </div>\r\n	</div>\r\n	");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n            <div class=\"alert alert-danger\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                Something went wrong when saving the tour, please try again.\r\n            </div>  	        \r\n	    </div>\r\n	</div>\r\n	");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n	        <div class=\"alert alert-danger\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                Oh noes, there was some validation errors, please try again.\r\n            </div>  \r\n	    </div>\r\n	</div>\r\n	");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            <div class=\"alert alert-danger\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                Couldn't save draft, area and name must be set.\r\n            </div>  \r\n        </div>	    \r\n	</div>\r\n	");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            <div class=\"alert alert-info alert-dismissible\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                This is a draft, the tour has not yet been published\r\n            </div>  \r\n        </div>   	    \r\n	</div>\r\n	");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            <div class=\"alert alert-danger\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                Tour is marked as deleted and will eventually be permanently deleted from the databse\r\n            </div> \r\n        </div>   \r\n	</div>\r\n	");
  }

function program13(depth0,data) {
  
  
  data.buffer.push("\r\n	<div class=\"row\">\r\n	    <div class=\"col-sm-12\">\r\n            <div class=\"alert alert-success alert-dismissible\" role=\"alert\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                Tour was successfully updated\r\n            </div>	        \r\n	    </div>\r\n	</div>\r\n	");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("\r\n	    <div class=\"row\">\r\n	       <div class=\"col-sm-12\">\r\n	           Saving...\r\n	       </div>\r\n	    </div>\r\n    	\r\n    ");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n		<div class=\"row spacing-y\">\r\n		   <div class=\"col-sm-12\">\r\n                ");
  stack1 = helpers.unless.call(depth0, "isPublished", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("				 \r\n                <button class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("isStartPublishDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startPublishTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                   <span class=\"glyphicon glyphicon-cloud-upload\"></span> Publish\r\n                </button>			 \r\n				");
  stack1 = helpers['if'].call(depth0, "hasChanges", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n				<button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startCancelingEditTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"right\">Exit edit</button>\r\n		   </div>\r\n		</div>\r\n	");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                    <button class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("isSaveAsDraftDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveAsDraft", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                       <span class=\"glyphicon glyphicon-floppy-save\"></span> Save as draft\r\n                    </button>\r\n                ");
  return buffer;
  }

function program20(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span class=\"spacing-x-large\"><span class=\"glyphicon glyphicon-floppy-disk\"></span><em> Tour has unsaved changes</em></span>\r\n                ");
  }

function program22(depth0,data) {
  
  
  data.buffer.push("Select area...");
  }

function program24(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "area.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program26(depth0,data) {
  
  
  data.buffer.push("\r\n			                        <p>Images cannot be uploaded until tour is saved. Please save tour and then come back!</p>\r\n			                    ");
  }

function program28(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n			                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "touredit-images", options) : helperMissing.call(depth0, "partial", "touredit-images", options))));
  data.buffer.push("\r\n			                    ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n							      <tr>\r\n								      <td>");
  data.buffer.push(escapeExpression((helper = helpers.displayTimestamp || (depth0 && depth0.displayTimestamp),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "action.time", options) : helperMissing.call(depth0, "displayTimestamp", "action.time", options))));
  data.buffer.push("</td>\r\n								      <td>");
  data.buffer.push(escapeExpression((helper = helpers.resolveTourAction || (depth0 && depth0.resolveTourAction),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "action.type", options) : helperMissing.call(depth0, "resolveTourAction", "action.type", options))));
  data.buffer.push("</td>\r\n								      <td>");
  stack1 = helpers._triageMustache.call(depth0, "action.userName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n								      <td>");
  stack1 = helpers._triageMustache.call(depth0, "action.comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n							      </tr>\r\n							      ");
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n					    <div class=\"alert alert-danger\" role=\"alert\">\r\n					        Tour data is invalid or incomplete\r\n					    </div>\r\n					\r\n					    <div>\r\n					        <p>The tour lacks to much data to be published. Please add missing data and try again.</p>\r\n					        <p class=\"secondary-text\">\r\n					            The following fields are missing or invalid: \r\n					            ");
  stack1 = helpers.each.call(depth0, "error", "in", "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n					        </p>\r\n					            \r\n					        <p class=\"secondary-text confirmation-message\">\r\n					        Required fields for publish are: Area, Name, Access point, Description, Time min/max and Elevation gain/loss\r\n					        </p> \r\n					    </div>\r\n					");
  return buffer;
  }
function program33(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n					                <code>");
  stack1 = helpers._triageMustache.call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</code>, \r\n					            ");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n					    ");
  stack1 = helpers['if'].call(depth0, "view.haveValidationWarnings", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(39, program39, data),fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n					");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n					        <div class=\"alert alert-warning\" role=\"alert\">\r\n					            Tour data is valid but incomplete\r\n					        </div>\r\n					        <div>\r\n					            <p>The tour lacks some important data. It can be published, but it'll be marked as incomplete.</p>\r\n					            \r\n					            <p class=\"secondary-text confirmation-message\">\r\n					            The following fields are missing:\r\n					            ");
  stack1 = helpers.each.call(depth0, "warning", "in", "validationWarnings", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n					            </p>\r\n					        </div>\r\n					     ");
  return buffer;
  }
function program37(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n					                <code>");
  stack1 = helpers._triageMustache.call(depth0, "warning", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</code>, \r\n					            ");
  return buffer;
  }

function program39(depth0,data) {
  
  
  data.buffer.push("\r\n					         <div class=\"alert alert-success\" role=\"alert\">\r\n					            Tour data is valid\r\n					        </div>\r\n					        <p>Looks like the tour data is fine, just go on and publish!</p>\r\n					     ");
  }

  data.buffer.push("<div class=\"main-view-container\">\r\n \r\n	");
  stack1 = helpers['if'].call(depth0, "authenticationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "serverErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "draftValidationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "isDraft", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "isDeleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	\r\n	");
  stack1 = helpers['if'].call(depth0, "updateSuccessfully", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    ");
  stack1 = helpers['if'].call(depth0, "havePendingOperations", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("     \r\n	\r\n	<div class=\"row\"> \r\n		<div class=\"col-sm-12\">\r\n\r\n			 <ul class=\"nav nav-tabs\" role=\"tablist\">\r\n			    <li class=\"active\"><a href=\"#details-panel\" role=\"tab\" data-toggle=\"tab\">Details</a></li>\r\n			    <li><a href=\"#itinerary-panel\" role=\"tab\" data-toggle=\"tab\">Description</a></li>\r\n			    <li><a href=\"#map-panel\" role=\"tab\" data-toggle=\"tab\">Map</a></li>\r\n			    <li><a href=\"#images-panel\" role=\"tab\" data-toggle=\"tab\">Images</a></li>\r\n			    <li><a href=\"#history-panel\" role=\"tab\" data-toggle=\"tab\">History</a></li>\r\n			</ul>	        \r\n	        \r\n			<div class=\"tab-content\">\r\n			    <div class=\"tab-pane active\" id=\"details-panel\">\r\n				    <form role=\"form\">\r\n				    \r\n	                   <div class=\"row\">\r\n	                        <div class=\"col-sm-4\">			    \r\n						        <div class=\"form-group\">\r\n							        <label for=\"inputArea\">Area</label>\r\n		                            <button type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" title=\"Area\" data-content=\"The area where the tour is located.\"></button>\r\n		                            <div><a data-toggle=\"modal\" data-target=\"#areaPickerModal\">");
  stack1 = helpers.unless.call(depth0, "area", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></div>				        \r\n						        </div>\r\n							</div>\r\n	                        <div class=\"col-sm-8\">  				    \r\n		                        <div class=\"form-group\">\r\n		                            <label for=\"inputName\">Name of tour</label>\r\n		                            <button \r\n		                              type=\"button\"\r\n		                              class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" title=\"Name\" data-content=\"The name of the tour. Name is required and must be between 3 and 80 characters long.\"></button>\r\n		                            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': (""),
    'pattern': ("^.{3,80}$"),
    'value': ("name"),
    'id': ("inputName"),
    'class': ("form-control")
  },hashTypes:{'placeholder': "STRING",'pattern': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'placeholder': depth0,'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n		                        </div>\r\n	                        </div>\r\n	                    </div>\r\n	                    \r\n	                   <div class=\"row\">\r\n	                        <div class=\"col-sm-12\">\r\n		                        <div class=\"form-group\">\r\n		                           <label for=\"inputShortDescription\">Tour summary<span class=\"warn-field\">*</span></label>\r\n		                           <button \r\n		                              type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n		                              title=\"Tour summary\" \r\n		                              data-content=\"A brief description summarizing the highlights of the tour. Description can have a maximum of 300 characters.\">\r\n		                           </button>\r\n		                           ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'maxlength': ("300"),
    'value': ("shortDescription"),
    'id': ("inputShortDescription"),
    'class': ("form-control")
  },hashTypes:{'maxlength': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'maxlength': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n		                        </div>\r\n	                        </div>\r\n	                    </div>\r\n	                    \r\n	                   <div class=\"row\">\r\n	                       <div class=\"col-sm-12 descTextAreaContainer\">\r\n	                           <div class=\"form-group\">\r\n	                                 <label for=\"inputAccessPoint\">Access point<span class=\"req-field\">*</span></label>\r\n	                                 <button \r\n	                                      type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                          title=\"Access point\" \r\n                                          data-content=\"Description of the access point and how to get there. The access point description can have a maximum of 1000 characters.\">\r\n                                     </button>\r\n	                                 ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("accessPoint"),
    'maxlength': ("1000"),
    'id': ("inputAccessPoint"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'maxlength': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n	                           </div>\r\n	                       </div>\r\n	                   </div>\r\n	                   \r\n	                   <div class=\"row\">\r\n	                       <div class=\"col-lg-3\">\r\n	                           <div class=\"form-group\">\r\n	                               <label for=\"inputElevationLoss\">Elevation loss<span class=\"req-field\">*</span></label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Elevation loss\" \r\n                                        data-content=\"Total elevation to descend. Only digits are allowed.\">\r\n                                   </button>	                               \r\n	                               <div class=\"input-group\">\r\n	                                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': (""),
    'pattern': ("App.Validate.numberRegex"),
    'value': ("elevationLoss"),
    'id': ("inputElevationLoss"),
    'class': ("form-control")
  },hashTypes:{'placeholder': "STRING",'pattern': "ID",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'placeholder': depth0,'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n	                                    <div class=\"input-group-addon\">m</div>\r\n	                               </div>\r\n	                           </div>\r\n	                       </div>\r\n	                       <div class=\"col-lg-3\">\r\n	                           <div class=\"form-group\">\r\n	                               <label for=inputElevationGain\">Elevation gain<span class=\"req-field\">*</span></label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Elevation gain\" \r\n                                        data-content=\"Total elevation to climb. Only digits are allowed.\">\r\n                                   </button>    \r\n	                               <div class=\"input-group\">\r\n	                                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': (""),
    'pattern': ("App.Validate.numberRegex"),
    'value': ("elevationGain"),
    'id': ("inputElevationGain"),
    'class': ("form-control")
  },hashTypes:{'placeholder': "STRING",'pattern': "ID",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'placeholder': depth0,'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n	                                    <div class=\"input-group-addon\">m</div>\r\n	                               </div>\r\n	                           </div>\r\n	                       </div>\r\n	                       <div class=\"col-lg-3\">\r\n                               <div class=\"form-group\">\r\n                                   <label for=\"inputHighestPoint\">Highest point<span class=\"warn-field\">*</span></label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Highest point\" \r\n                                        data-content=\"The highest point of the tour. Only digits are allowed.\">\r\n                                   </button> \r\n                                   <div class=\"input-group\">\r\n                                       ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': (""),
    'pattern': ("App.Validate.numberRegex"),
    'value': ("elevationMax"),
    'id': ("inputHighestPoint"),
    'class': ("form-control")
  },hashTypes:{'placeholder': "STRING",'pattern': "ID",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'placeholder': depth0,'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                       <div class=\"input-group-addon\">m</div>\r\n                                   </div>\r\n                               </div>\r\n                           </div>  \r\n	                       <div class=\"col-lg-3\">\r\n	                           <label for=\"inputAspect\">Main aspect of slopes</label>\r\n                               <button \r\n                                    type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                    title=\"Aspect\" \r\n                                    data-content=\"Aspect of the main part of the slopes on the descent route.\">\r\n                               </button> \r\n	                           ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("App.Fixtures.Aspects"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.name"),
    'valueBinding': ("aspect"),
    'id': ("inputAspect"),
    'class': ("form-control")
  },hashTypes:{'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0,'id': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("          \r\n	                       </div>          \r\n	                   </div>	\r\n	                                      \r\n	                   <div class=\"row\">\r\n	                       <div class=\"col-lg-3\">\r\n	                           <div class=\"form-group\">\r\n	                               <label for=\"inputTimeMin\">Time, min<span class=\"req-field\">*</span></label>\r\n	                               <button \r\n	                                    type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n	                                    title=\"Time min\" \r\n	                                    data-content=\"The minimum amount of time that can be expected for the tour. Only digits are allowed.\">\r\n	                               </button> \r\n                                    <div class=\"input-group\">\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': (""),
    'pattern': ("App.Validate.numberRegex"),
    'value': ("timingMin"),
    'id': ("inputTimeMin"),
    'class': ("form-control")
  },hashTypes:{'placeholder': "STRING",'pattern': "ID",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'placeholder': depth0,'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                        <div class=\"input-group-addon\">h</div>\r\n                                    </div>\r\n	                           </div>\r\n	                       </div>\r\n                           <div class=\"col-lg-3\">\r\n                               <div class=\"form-group\">\r\n                                   <label for=\"inputTimeMax\">Time, max<span class=\"req-field\">*</span></label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Time max\" \r\n                                        data-content=\"The maximum amount of time that can be expected for the tour. Only digits are allowed.\">\r\n                                   </button> \r\n                                   <div class=\"input-group\">\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': (""),
    'pattern': ("App.Validate.numberRegex"),
    'value': ("timingMax"),
    'id': ("inputTimeMax"),
    'class': ("form-control")
  },hashTypes:{'placeholder': "STRING",'pattern': "ID",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'placeholder': depth0,'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                        <div class=\"input-group-addon\">h</div>\r\n                                   </div>\r\n                               </div>\r\n                           </div>                      \r\n                           <div class=\"col-lg-3\">\r\n                               <div class=\"form-group\">\r\n                                   <label for=\"inputSeasonFrom\">Season from<span class=\"req-field\">*</span></label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Season from\" \r\n                                        data-content=\"First month of the season when the tour normally is skiable.\">\r\n                                   </button> \r\n                                   ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("App.Fixtures.Months"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.name"),
    'valueBinding': ("timeOfYearFrom"),
    'id': ("inputSeasonFrom"),
    'class': ("form-control")
  },hashTypes:{'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0,'id': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("  \r\n                              </div>\r\n                          </div>\r\n                           <div class=\"col-lg-3\">\r\n                                <div class=\"form-group\">\r\n                                   <label for=\"inputTimeOfYearTo\">Season to<span class=\"req-field\">*</span></label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Season to\" \r\n                                        data-content=\"Last month of the season when the tour normally is skiable.\">\r\n                                   </button> \r\n                                   ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("App.Fixtures.Months"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.name"),
    'valueBinding': ("timeOfYearTo"),
    'id': ("inputTimeOfYearTo"),
    'class': ("form-control")
  },hashTypes:{'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0,'id': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                              </div>\r\n                          </div>\r\n                  	    </div>     \r\n                  	          \r\n	                    <div class=\"row\">\r\n	                        <div class=\"col-lg-3\">\r\n	                            <div class=\"form-group\">\r\n		                            <label for=\"inputGrade\">Grade<span class=\"warn-field\">*</span></label>\r\n                                    <button class=\"info pull-right\" data-toggle=\"modal\" data-target=\"#tourDetailsGradeGuideModal\">");
  data.buffer.push(escapeExpression((helper = helpers.resolveGradeName || (depth0 && depth0.resolveGradeName),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "grade", options) : helperMissing.call(depth0, "resolveGradeName", "grade", options))));
  data.buffer.push("</button>\r\n		                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("App.Fixtures.Grades"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.name"),
    'valueBinding': ("grade"),
    'id': ("inputGrade"),
    'class': ("form-control")
  },hashTypes:{'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0,'id': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n	                            </div>\r\n	                        </div>\r\n                        \r\n	                        <div class=\"col-lg-3\">\r\n	                            <div class=\"form-group\">\r\n	                                <label for=\"inputSteepness\">Steepness, max</label>\r\n                                   <button \r\n                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                        title=\"Steepness\" \r\n                                        data-content=\"Degrees on the steepest part of the route. Only digits are allowed.\">\r\n                                   </button> \r\n	                                <div class=\"input-group\">\r\n	                                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'pattern': ("App.Validate.numberRegex"),
    'value': ("degreesMax"),
    'id': ("inputSteepness"),
    'class': ("form-control")
  },hashTypes:{'pattern': "ID",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'pattern': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n	                                    <div class=\"input-group-addon\">&#176;</div>\r\n	                                </div>\r\n	                             </div>\r\n	                        </div>\r\n	                    </div>\r\n                    \r\n	                    <div class=\"row\">\r\n	                        <div class=\"col-sm-6 descTextAreaContainer\">\r\n	                             <div class=\"form-group\">\r\n	                                  <label for=\"inputHazards\">Hazards</label> ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("haveHazards")
  },hashTypes:{'checkedBinding': "STRING"},hashContexts:{'checkedBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n	                                   <button \r\n	                                        type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n	                                        title=\"Hazards\" \r\n	                                        data-content=\"Description of any special hazards that skiers should be aware of. Description can have a maximum of 300 characters.\">\r\n	                                   </button> \r\n	                                  ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("hazardsDescription"),
    'disabledBinding': ("haveNoHazards"),
    'maxlength': ("500"),
    'id': ("inputHazards"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'disabledBinding': "STRING",'maxlength': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'disabledBinding': depth0,'maxlength': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n	                             </div>\r\n	                        </div>\r\n	                        <div class=\"col-sm-6 columns descTextAreaContainer\">\r\n                                <div class=\"form-group\">\r\n	                                  <label for=\"inputTools\">Requires mountaineering skills/equipment</label> ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("requiresTools")
  },hashTypes:{'checkedBinding': "STRING"},hashContexts:{'checkedBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                       <button \r\n                                            type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                            title=\"Skills/Equipment\" \r\n                                            data-content=\"Description of any mountaineering skills or equipment needed. Rappels, glacier safety equipment etc. Description can have a maximum of 300 characters.\">\r\n                                       </button>                            \r\n	                                  ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("toolsDescription"),
    'disabledBinding': ("doesNotRequireTools"),
    'maxlength': ("500"),
    'id': ("inputTools"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'disabledBinding': "STRING",'maxlength': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'disabledBinding': depth0,'maxlength': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n	                            </div>\r\n	                        </div>\r\n	                    </div>\r\n	                    \r\n	                    <div class=\"row\">\r\n	                        <div class=\"col-sm-12 col-lg-6\">\r\n	                            <label for=\"inputTags\">Tags</label>\r\n                                <button \r\n                                     type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                     title=\"Tags\" \r\n                                     data-content=\"You can tag your tour with tag words that gives a quick overview of the tour. Separate them with comma. For example: steep, powder, fields\">\r\n                                </button>   \r\n	                            ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("tagsString"),
    'maxlength': (500),
    'id': ("inputTags"),
    'class': ("form-control"),
    'id': ("inputTags"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'maxlength': "INTEGER",'id': "STRING",'class': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'id': depth0,'class': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n	                        </div>\r\n	                    </div>\r\n                    	                    \r\n	                </form>\r\n				   \r\n				    <div class=\"row spacing-y-large\">\r\n	                    <div class=\"col-sm-12 small\">\r\n	                        <div class=\"form-group\">\r\n							    <span class=\"req-field\">*</span> Required field (tour cannot be published if not set) <br />\r\n							    <span class=\"warn-field\">*</span> Recommended field (tour will be marked as incomplete if not set)\r\n						    </div>\r\n						</div>\r\n				    </div>\r\n			    </div>\r\n			        \r\n				<div id=\"itinerary-panel\" class=\"tab-pane\">\r\n					<div class=\"row\">\r\n					   <div class=\"col-sm-12\">\r\n					       <div class=\"form-group\">\r\n					           <label for=\"inputDescription\">Description<span class=\"req-field\">*</span></label>\r\n                                <button \r\n                                     type=\"button\" class=\"info pull-right\" data-toggle=\"popover\" data-trigger=\"focus\" \r\n                                     title=\"Description\" \r\n                                     data-content=\"Description of the tour itinerary and anything else that could be useful. Description can have a maximum of 8000 characters.\">\r\n                                </button>  \r\n					           ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("itinerary"),
    'maxlength': ("8000"),
    'id': ("inputDescription"),
    'class': ("form-control large")
  },hashTypes:{'value': "ID",'maxlength': "STRING",'id': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'maxlength': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n					       </div>\r\n					   </div>\r\n					</div>  \r\n				</div>	  \r\n				\r\n				<div id=\"map-panel\" class=\"tab-pane\">\r\n		            <div class=\"row\">\r\n		                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourEditMapView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n		            </div>  \r\n		            <div class=\"row\">\r\n		                <div class=\"col-sm-12 spacing-y\">\r\n		                    Tip: The markers on the browse map on the frontpage are set by the first point added to the tour map above. \r\n		                    Start drawing from the summit point of the tour to make that the point that's marked on the browse map.\r\n		                </div> \r\n	                </div>\r\n			    </div>  \r\n			    \r\n			    <div id=\"images-panel\" class=\"tab-pane\">\r\n		            <div class=\"row\">\r\n			            <div class=\"col-sm-12\">\r\n			                <div class=\"spacing\">\r\n			                    ");
  stack1 = helpers['if'].call(depth0, "isNew", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			                </div>\r\n			            </div>\r\n		            </div>  \r\n	            </div>                    \r\n			      \r\n			    <div id=\"history-panel\" class=\"tab-pane\">\r\n		            <div class=\"row\">\r\n		                <div class=\"col-sm-12 spacing\">\r\n		                    Tour status: <em>");
  stack1 = helpers._triageMustache.call(depth0, "displayStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</em>\r\n		                </div>\r\n		            </div>\r\n		            <div class=\"row\">\r\n		                <div class=\"col-sm-12\">\r\n		                    <table class=\"table table-striped\">\r\n							  <thead>\r\n							      <tr>\r\n								      <th>Time</th>\r\n								      <th>Type</th>\r\n								      <th>User</th>\r\n								      <th>Comment</th>\r\n							      </tr>\r\n							  </thead>\r\n							  <tbody>\r\n							      ");
  stack1 = helpers.each.call(depth0, "action", "in", "actions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n							  </tbody>\r\n							</table>\r\n		                </div>\r\n		             </div> \r\n		        </div> \r\n	        </div>\r\n	        \r\n	    </div>\r\n	</div>\r\n\r\n	\r\n	\r\n    <div class=\"modal fade\" id=\"tourDetailsGradeGuideModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-lg login-view\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">Grades</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about-grades", options) : helperMissing.call(depth0, "partial", "about-grades", options))));
  data.buffer.push("\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    	\r\n    <div class=\"modal fade\" id=\"areaPickerModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-lg\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                    <h4 class=\"modal-title\">Select area</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AreaPickerView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                </div>\r\n            </div>\r\n        </div>    \r\n    </div>\r\n    \r\n    <div class=\"modal fade\" id=\"discardChangesTourModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-lg\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <h4>Unsaved changes</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    The tour has unsaved changes, do you want to discard them?\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>       \r\n                    <button class=\"btn btn-danger pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmDiscardChanges", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Discard changes</button>\r\n                </div>\r\n            </div>\r\n        </div>    \r\n    </div>\r\n	\r\n    <div class=\"modal fade\" id=\"confirmDeleteTourModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-lg areapicker-view\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                    <h4 class=\"modal-title\">Delete tour</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    Are you sure you want to delete the tour?\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n		            <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>\r\n		            <button class=\"btn btn-danger pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmDeleteTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Delete tour</button>                     \r\n                </div>\r\n            </div>\r\n        </div>    \r\n    </div>\r\n	\r\n	<div class=\"modal fade\" id=\"publishTourStep1Modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n        \r\n        <div class=\"modal-dialog modal-lg\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n                    <h4 class=\"modal-title\">Publish tour (Step 1 of 2)</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n					");
  stack1 = helpers['if'].call(depth0, "view.haveValidationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(35, program35, data),fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>\r\n                    <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("view.haveValidationErrors")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "continueToPublishStep2", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Continue</button>\r\n                </div>\r\n            </div>\r\n        </div>        \r\n    </div>\r\n	\r\n	<div class=\"modal fade\" id=\"publishTourStep2Modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n	    \r\n	    <div class=\"modal-dialog modal-lg\">\r\n	        <div class=\"modal-content\">\r\n	            <div class=\"modal-header\">\r\n	                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n	                <h4 class=\"modal-title\">Publish tour (Step 2 of 2)</h4>\r\n	            </div>\r\n	            <div class=\"modal-body\">\r\n	                <form role=\"form\">\r\n	                    <div class=\"form-group\">\r\n	                        <label for=\"inputPublishComment\">What did you change?</label>\r\n	                        ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'id': ("inputChangeComment"),
    'class': ("form-control"),
    'value': ("publishComment"),
    'maxlength': ("500")
  },hashTypes:{'id': "STRING",'class': "STRING",'value': "ID",'maxlength': "STRING"},hashContexts:{'id': depth0,'class': depth0,'value': depth0,'maxlength': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n	                    </div>\r\n	                </form>\r\n	            </div>\r\n	            <div class=\"modal-footer\">\r\n	                <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>\r\n	                <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("view.isPublishDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "continueToPublishStep3", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Publish</button>  	            \r\n	            </div>\r\n	        </div>\r\n	    </div>        \r\n	</div>\r\n	\r\n	<div class=\"modal fade\" id=\"publishTourStep3Modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-lg\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-body\">\r\n                    Changes will be published, do you want to continue?\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button class=\"btn btn-default pull-left\" data-dismiss=\"modal\">Cancel</button>\r\n                    <button class=\"btn btn-primary pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmPublishTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Publish</button>\r\n                </div>\r\n            </div>\r\n        </div>    \r\n    </div>	\r\n    \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["touredit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourEditView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  
});

Ember.TEMPLATES["touritem-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "tour.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }

  data.buffer.push("<div class=\"row tour-item-view\">\n    <div class=\"col-sm-12\">   \n	    <div class=\"item-panel\">\n            <h4> ");
  stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "tour", "tour", options) : helperMissing.call(depth0, "linkTo", "tour", "tour", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <span class=\"small uppercase\">");
  stack1 = helpers._triageMustache.call(depth0, "tour.area.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<span></h4>\n			<div class=\"item-props\">\n				");
  data.buffer.push(escapeExpression((helper = helpers.resolveGradeName || (depth0 && depth0.resolveGradeName),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "tour.grade", options) : helperMissing.call(depth0, "resolveGradeName", "tour.grade", options))));
  data.buffer.push(" | \n				");
  stack1 = helpers._triageMustache.call(depth0, "tour.timingMin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("-");
  stack1 = helpers._triageMustache.call(depth0, "tour.timingMax", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("h | \n				");
  stack1 = helpers._triageMustache.call(depth0, "tour.elevationGain", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("m &uarr; ");
  stack1 = helpers._triageMustache.call(depth0, "tour.elevationLoss", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("m &darr;\n			</div>\n			<div>\n			    ");
  stack1 = helpers._triageMustache.call(depth0, "tour.shortDescription", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["tourmap-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"mapContainer\">\r\n    <div id=\"tourMapRootElement\"></div>\r\n</div>");
  
});

Ember.TEMPLATES["tourmapedit-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<button class=\"btn btn-default pull-right spacing-y\"  data-toggle=\"modal\" data-target=\"#confirmDeleteRoutesModal\">Remove routes</button>\r\n\r\n<div class=\"mapContainer\">\r\n    <div id=\"tourMapRootElement\"></div>\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"confirmDeleteRoutesModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-sm\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                 Are you sure you want to remove all routes from the map?\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button class=\"btn btn-primary pull-left\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closeDeleteRoutes", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Cancel</button>\r\n                <button class=\"btn btn-default pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRoutes", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Remove</button>\r\n            </div>\r\n        </div>\r\n    </div>    \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["tournew"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourEditView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  
});

Ember.TEMPLATES["tours"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n    <img src=\"images/ajax-loader.gif\"/>\r\n");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n	");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TourItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

  data.buffer.push("<!--\r\n    Template for showing list of tours (search result)\r\n-->\r\n");
  stack1 = helpers['if'].call(depth0, "content.isUpdating", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  stack1 = helpers.each.call(depth0, "tour", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["usermenu-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div>\r\n    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToAddNewTour", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"login-link\">\r\n        <div class=\"login-link-container\">\r\n        Add new tour\r\n        </div>\r\n    </a>\r\n    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToMyTours", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"login-link\">\r\n        <div class=\"login-link-container\">\r\n        View my tours\r\n        </div>\r\n    </a>\r\n    <hr />\r\n    <div class=\"disclaimer-text\">\r\n    Logged in as ");
  data.buffer.push(escapeExpression((helper = helpers.maxString || (depth0 && depth0.maxString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "controllers.login.currentUser.userName", 50, options) : helperMissing.call(depth0, "maxString", "controllers.login.currentUser.userName", 50, options))));
  data.buffer.push("\r\n    </div>\r\n    \r\n</div>");
  return buffer;
  
});