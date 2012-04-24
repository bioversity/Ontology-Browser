<?php
	
	// check if the user is logged
	include 'logged.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Operators.inc.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Offsets.inc.php';
	
	$newEmail = $_POST['newEmail'];
		
	
	if($user->setEmail($newEmail)){								// if the email is changed change the $_SESSION variable
		$_SESSION[kSESSION_USER][kOFFSET_EMAIL] = $newEmail;
		header('Location: ../user.php');
	}
	else {														// if not return on the user page and print the error
		header('Location: ../user.php?emailError');
	}
?>