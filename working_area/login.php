<?php

	//
	// Global includes.
	//
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	
	//
	// Class includes.
	//
	require_once( kPATH_LIBRARY_SOURCE."CMongoQuery.php" );
	require_once( kPATH_LIBRARY_SOURCE."CMongoDataWrapperClient.php" );
	require_once( kPATH_LIBRARY_SOURCE."CMongoDataWrapper.inc.php" );
	require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
	require_once( kPATH_LIBRARY_DEFINES."Offsets.inc.php" );
	require_once( kPATH_LIBRARY_SOURCE."CWrapper.inc.php" );

    $username = $_POST['username'];
    $password = $_POST['password'];
	
	$query = array
	(
		kOPERATOR_AND => array
		(
			0 => array
			(
				kAPI_QUERY_SUBJECT => ':CODE',
				kAPI_QUERY_OPERATOR => kOPERATOR_EQUAL,
				kAPI_QUERY_TYPE => kDATA_TYPE_STRING,
				kAPI_QUERY_DATA => $username
			),
			
			1 => array
			(
				kAPI_QUERY_SUBJECT => ':PASS',
				kAPI_QUERY_OPERATOR => kOPERATOR_EQUAL,
				kAPI_QUERY_TYPE => kDATA_TYPE_STRING,
				kAPI_QUERY_DATA => $password
			)
		)
	);
	
	$url = 'http://localhost/newwrapper/MongoDataWrapper.php';
	
	//
	// Prepare query.
	//
	$query_enc = json_encode( $query );
	//
	// Build parameters.
	//
	$params = Array();
	$params[] = kAPI_FORMAT.'='.kDATA_TYPE_JSON;				// Format.
	$params[] = kAPI_OPERATION.'='.kAPI_OP_GET; 				// Command.
	$params[] = kAPI_DATABASE.'='.'TEST';						// Database.
	$params[] = kAPI_CONTAINER.'='.'ENTITIES';					// Container.
	$params[] = kAPI_DATA_QUERY.'='.urlencode( $query_enc );	// Query.
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

	session_start();	
	if($decoded[kAPI_DATA_STATUS][kTAG_STATUS]==0 && $decoded[kAPI_DATA_STATUS][kAPI_AFFECTED_COUNT]==1){
		$_SESSION[kSESSION_USER] = $decoded[kAPI_DATA_RESPONSE][0];
	}

	header('Location: ../user.php');
	
?>
