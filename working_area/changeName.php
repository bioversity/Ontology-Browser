<?php
	
	// check if the user is logged
	include 'logged.php';
	
	$newName = $_POST['newName'];
		
	
	if($user->setName($newName)){								
		$_SESSION[kSESSION_USER][kTAG_VERSION] ++;				// increment the current version.								
		header('Location: ../home.php');
	}
	else {														// if error return on the user page and print the error
		header('Location: ../home.php?nameError');
	}
?>