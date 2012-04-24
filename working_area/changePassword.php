<?php
	
	// check if the user is logged
	include 'logged.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Operators.inc.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Offsets.inc.php';
	
	$oldPassword = $_POST['oldPassword'];
	$newPassword = $_POST['newPassword'];
		
	
	if($user->changePassword($oldPassword, $newPassword)){					// if the password is changed return on the user page
		$_SESSION[kSESSION_USER][kOFFSET_PASSWORD] = $newPassword;
		header('Location: ../user.php');
	}
	else {																	// if not return on the user page and print the error
		header('Location: ../user.php?passwordError');
	}
?>