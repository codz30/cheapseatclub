<?php 
  var $url = $_GET['u'];
  if(!$url){
    return;
  }
  else {
    echo "<html><head><title>Redirecting...</title><body>Redirecting to " + $url + "</body></html>";
  }
?>
