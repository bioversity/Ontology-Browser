<?php
	//
	// Global includes.
	//
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	
	//
	// Class includes.
	//
	require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
	
	session_start();
	
	// if the user is not logged in redirect to index
	if(!(isset($_SESSION[kSESSION_USER]))){
		header("Location: index.php");
		exit;
	}
?>