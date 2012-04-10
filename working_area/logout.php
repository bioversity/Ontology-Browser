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
//	session_unset();
//	session_destroy();
	
	unset($_SESSION[kSESSION_USER]);
	
	header('Location: ../index.php');

?>