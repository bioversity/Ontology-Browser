<?php
	
	// check if the user is logged
	include 'logged.php';
	
	$oldPassword = $_POST['oldPassword'];
	$newPassword = $_POST['newPassword'];
		
	
	if($user->changePassword($oldPassword, $newPassword)){					// if the password is changed return on the user page
		$_SESSION[kSESSION_USER][kTAG_VERSION] ++;								// increment the current version.								
		header('Location: ../home.php');
	}
	else {																	// if error return on the user page and print the error
		header('Location: ../home.php?passwordError');
	}
?>