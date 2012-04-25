<?php
	//
	// Global includes.
	//
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	
	//
	// Class includes.
	//
	require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
	require_once( kPATH_LIBRARY_DEFINES."Offsets.inc.php" );
	
	//
	// Class User include
	//
	require_once 'user/user.class.php';
	require_once 'defines/defines.inc.php';
	
	session_start();
	
	// if the user is not logged in redirect to index
	if(!(isset($_SESSION[kSESSION_USER]))){
		header("Location: index.php");
		exit;
	}
	// create the user with the information saved in session, for more info have a look to working_area/user/user.class.php
	else {												
		$user = new User($_SESSION[kSESSION_USER]);
	}
?>