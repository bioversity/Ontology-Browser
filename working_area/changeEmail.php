<?php
	
	// check if the user is logged
	include 'logged.php';
	
	$newEmail = $_POST['newEmail'];
		
	
	if($user->setEmail($newEmail)){
		$_SESSION[kSESSION_USER][kTAG_VERSION] ++;				// increment the current version.								
		header('Location: ../home.php');
	}
	else {														// if error return on the user page and print the error
		header('Location: ../home.php?emailError');
	}
?>