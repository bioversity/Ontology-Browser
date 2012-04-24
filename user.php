<?php 
	// import the folder class
	require_once 'working_area/folder/folder.php';
	// check if the user is logged
	include 'working_area/logged.php';

//	echo "<pre>"; print_r($_SERVER); echo "</pre>";
	
?>
<html>
    <head>
        <title>Eurisco intranet</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">

		<script>
			function checkPassword(form){
				return (form.newPassword.value==form.confirmPassword.value && form.newPassword!='');
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
            	<?php echo $user->toString(); ?>
            	<p>Welcome <em><?php echo $user->getName(); ?></em> (<?php echo $user->getEmail(); ?>)</p>
            	<p>In this page you can edit your contanct information</p>
                
                <div id="changePass">
                	<h3>Change your password</h3>
                	<form action="working_area/changePassword.php" method="post" enctype="multipart/form-data" onSubmit="return checkPassword(this)">
                		<?php 	
                			if(isset($_GET['passwordError'])) {		?>
                			<p style="color: red">Please confirm your current password	<input type="password" name="oldPassword" /></p>
                		<?php	
							}	
							else {
                		?>
                		<p>Please confirm your current password	<input type="password" name="oldPassword" /></p>
                		<?php
							}
						?>
                		<p>Insert your new password		<input type="password" name="newPassword" /></p>
                		<p>Confirm your new password	<input type="password" name="confirmPassword" /></p>
                		<input type="submit" name="changePassword" value="Change password"  />
                	</form>
            	</div>
            	
            	<div id="changeName">
                	<h3>Change your name</h3>
                	<form action="working_area/changeName.php" method="post" enctype="multipart/form-data">
                		<?php 	
                			if(isset($_GET['nameError'])) {		?>
                			<p style="color: red">Enter new name	<input type="text" name="newName" /></p>
                		<?php	
							}	
							else {
                		?>
                		<p>Enter new name	<input type="text" name="newName" /></p>
                		<?php 	}	?>
                		<input type="submit" name="changeName" value="Change name"  />
                	</form>
            	</div>

            	<div id="changeEmail">
                	<h3>Change your email</h3>
                	<form action="working_area/changeEmail.php" method="post" enctype="multipart/form-data">
                		<?php 	
                			if(isset($_GET['emailError'])) {		?>
                			<p style="color: red">Enter new email	<input type="text" name="newEmail" /></p>
                		<?php	
							}	
							else {
                		?>
                		<p>Enter new email	<input type="text" name="newEmail" /></p>
                		<?php 	}	?>
                 		<input type="submit" name="changeEmail" value="Change email"  />
                	</form>
            	</div>
                

            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>