<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'>            
				<?php include 'operations.html'; ?>
            </div>
            
            
            <div id='working_area'>
                <?php
                   include 'working_area/logged.php';
                   
				   echo "<pre>";
				   print_r($_SESSION['user']);
				   echo "</pre>";
                ?>
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>