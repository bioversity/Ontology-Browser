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
	require_once 'defines/defines.inc.php';
	require_once 'user/user.class.php';
	require_once 'logMessage/cappedCollection.php';
	require_once 'store/store.php';	
	require_once 'folder/folder.php';
	
	session_start();
	
	// if the user is not logged in redirect to index
	if(!(isset($_SESSION[kSESSION_USER]))){
		header("Location: index.php");
		exit;
	}
	// inizialyze variable for user, store, folder and cappedCollection objects
	else {												
		$user = new User($_SESSION[kSESSION_USER]);
		$store = new Store();
		$folder = new Folder($user->getID());
		$cappedCollection = new CappedCollection();
	}
?>