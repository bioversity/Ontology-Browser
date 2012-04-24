<?php
	
	// check if the user is logged
	include 'logged.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Operators.inc.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Offsets.inc.php';
	
	$newName = $_POST['newName'];
		
	
	if($user->setName($newName)){								// if the name is changed change the $_SESSION variable
		$_SESSION[kSESSION_USER][kTAG_NAME] = $newName;
		header('Location: ../user.php');
	}
	else {														// if not return on the user page and print the error
		header('Location: ../user.php?nameError');
	}
?>