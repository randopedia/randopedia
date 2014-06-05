<!DOCTYPE html>
<html>
  <head>
    <title>Authorize</title> 
    <script>

      function sendAuthEvent() {
    	  var controller = window.opener.App.__container__.lookup("controller:login");
    	  var boundSend = controller.send.bind(controller);
    	  boundSend('requestAuthentication');
      }
      
      window.opener.App.oauth.onRedirect(window.location.hash);
      sendAuthEvent();
      window.close();
      
    </script>
  </head>
</html>