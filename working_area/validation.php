<?php
	//
	// Global includes.
	//
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	
	//
	// Style includes.
	//
	require_once( '/Library/WebServer/Library/wrapper/styles.inc.php' );
	
	//
	// Class includes.
	//
	require_once( kPATH_LIBRARY_SOURCE."CMongoDataWrapper.php" );
	
	
	/*=======================================================================================
	 *	TEST WRAPPER OBJECT																	*
	 *======================================================================================*/
	 
	//
	// Init local storage.
	//
	$url = 'http://localhost/newwrapper/MongoDataWrapper.php';
	
	//
	// Build parameters.
	//
	$params = Array();
	$params[] = kAPI_FORMAT.'='.kDATA_TYPE_JSON;				// Format.
	$params[] = kAPI_OPERATION.'='.kAPI_OP_GET;					// Command.
	$params[] = kAPI_DATABASE.'='.'TEST';						// Database.
	$params[] = kAPI_CONTAINER.'='.'CMongoDataWrapper';			// Container.
	//
	// Build request.
	//
	$request = $url.'?'.implode( '&', $params );
	//
	// Get response.
	//
	$response = file_get_contents( $request );
	//
	// Decode response.
	//
	$decoded = json_decode( $response, TRUE );
	
	echo( '<pre>' ); 
	print_r( $decoded ); 
	echo( '</pre>' );

?>
