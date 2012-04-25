<?php 
	header_remove();
?>
<html>
    <head>
        <title>Eurisco intranet</title>
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
					// Global includes.
					require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
					// Class includes.
					require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
            	
            		session_start();
					// check if the user is logged, if true redirect to the user profile page
					if((isset($_SESSION[kSESSION_USER])))
						header("Location: home.php");
					else {

            	?>
            	
	                <form action="working_area/login.php" method="post" enctype="multipart/form-data">
	                    <table align="left" width="100%" height="100%">
	                        <tr height="25px"></tr>
	                        <tr>
	                        <td width="150">Username:</td>
	                    <td><input type="text" name="username" size="30" /></td>
	                    </tr>
	                    <tr>
	                        <td width="150">Password:</td>
	                        <td><input type="password" name="password" size="30" /></td>
	                    </tr>
	                    <td  align='right'> 
	                        <p>
	                        <input type='submit' value='Submit'/>
	                        </p></td>
	                    </tr>
	                    </table>
	                </form>
                
                <?php
					}
				?>
                
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>