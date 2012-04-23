<?php 
	// import the folder class
	require_once 'working_area/folder/folder.php';
	// check if the user is logged
	include 'working_area/logged.php';

//	echo "<pre>"; print_r($_SESSION); echo "</pre>";
	
?>
<html>
    <head>
        <title>Eurisco intranet</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">

		<script>
			function checkPassword(form){
				return (form.newPassword.value==form.confirmPassword.value);
			}
		</script>
    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'>            
				<?php include 'operations.html'; ?>
            </div>
            
            
            <div id='working_area'>
            	<p>Welcome <em><?php echo $_SESSION[kSESSION_USER][kTAG_NAME]; ?></em> (<?php echo $_SESSION[kSESSION_USER][kOFFSET_EMAIL]; ?>)</p>
            	<p>In this page you can edit your password, view the list of your imported file, and the list of the file you do not still analyzed</p>
                
                <div>
                	<h3>Change your password</h3>
                	<form action="working_area/changePassword.php" method="post" enctype="multipart/form-data" onSubmit="return checkPassword(this)">
                		Please confirm your old password	<input type="password" name="oldPassword" /><br /><br />
                		Insert your new password		<input type="password" name="newPassword" /> <br /><br />
                		Confirm your new password		<input type="password" name="confirmPassword" /><br /><br />
                		<input type="submit" name="changePassword" value="Change password"  />
                	</form>
            	</div>
                
                <table>File in the dataset
                		
                </table>
                
                <table>File to analyze
                	
                </table>
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>