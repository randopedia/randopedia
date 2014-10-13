<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <meta content="width=device-width" name="viewport">
    <title>Randopedia</title>
    
    <link rel="stylesheet" href="css/foundation.min.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/randopedia.css">
    
    <script src="js/libs/custom.modernizr.js"></script>
    <script type="text/javascript">
		window.ENV = window.ENV || {};
		ENV.EXPERIMENTAL_CONTROL_HELPER = true;
	</script>
</head>
<body>

    <!--
        Default application template. Starts everything.
    -->

    
    <script data-template-name="application" type="text/x-handlebars">
    	<h1>Ember.js Tree Example</h1>
		<div class="row">
			<nav class="top-bar">
   				<ul class="title-area">
       				<!-- Title Area -->
       				<li class="name">
           				<h1><a href="#"> </a></h1>
       				</li>
       				<li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
   				</ul>
    				<section class="top-bar-section">
       				<!-- Left Nav Section --> 	
					<ul class="left">
						{{#each toplevel in controller}}
							<li class="has-dropdown">
								<a class="active" href="#">{{ toplevel.area.name }}</a>
								{{control "areas" toplevel.area}}
							</li>
						{{/each}}
					</ul>
					<ul class="right">
           				<li>{{#linkTo "addtour"}}Add tour{{/linkTo}}</li>
       				</ul>
   	  			</section>
			</nav>
		</div>
	</script>	
    
    <script type="text/x-handlebars" data-template-name="areas">
		{{#if childrens}}
			{{each childrens itemController="area" itemViewClass="App.AreaView"}}
		{{/if}}
	</script> 
	
	<script type="text/x-handlebars" data-template-name="area">		
		{{#if childrens }}
			<li class="has-dropdown"><a href="#">{{ name }}</a> 
   			{{control "areas" content}}</li>
		{{else}}
			<li><a href="#">{{ name }}</a>
		{{/if}}
	</script>   
	
	<!-- 
		JavaScript sources
	--> 
    <script src="js/libs/jquery-1.8.3.min.js"></script>
    <script src="js/libs/handlebars-1.0.0-rc.3.js"></script>
    <script src="js/libs/ember-1.0.0-rc.2.js"></script>
    <script src="js/libs/ember-data-rev12.js"></script>
	<script src="js/libs/foundation.min.js"></script>    
    <script src="js/app.js"></script>
    <script src="js/models.js"></script>
    <script src="js/routes.js"></script>
    <script type="text/javascript">
		// Make sure we don't initialize foundation until DOM is ready
	    $(function() {
	        $(document).foundation();
	    });
	</script>


</body>
</html>