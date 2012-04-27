<?php
	//
	// Global includes.
	//
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	
	//
	// Class includes.
	//
	require_once( kPATH_LIBRARY_SOURCE."CMongoQuery.php" );
	require_once( kPATH_LIBRARY_SOURCE."CWarehouseWrapperClient.php" );

	
	//
	// Use raw parameters or use wrapper client?.
	//
	define( 'kUSE_CLIENT', TRUE );
	
	$url = 'http://localhost/newwrapper/WarehouseWrapper.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
	
	//
	// Use wrapper client.
	//
	if( kUSE_CLIENT ){
		//
		// Build parameters.
		//
		$params = new CWarehouseWrapperClient( $url );
		$params->Operation( kAPI_OP_LOGIN );
		$params->Format( kTYPE_JSON );
		$params->Database( 'TEST' );
		$params->Container( CUser::DefaultContainer() ); 
		$params->Options( kAPI_OPT_SAFE, TRUE );
		$params->UserCode( $username );
		$params->UserPass( $password );
		$params->LogTrace( TRUE );
		$params->LogRequest( TRUE );
		//
		// Get response.
		//
		$decoded = $params->Execute();
		
	}
	//
	// Use raw parameters.
	//
	else{

		//
		// Build parameters.
		//
		$params = Array();
		$params[] = kAPI_OPERATION.'='.kAPI_OP_LOGIN;				// Command.
		$params[] = kAPI_FORMAT.'='.kTYPE_JSON;						// Format.
		$params[] = kAPI_OPT_USER_CODE.'='.$username;				// User code.
		$params[] = kAPI_OPT_USER_PASS.'='.$password;				// User password.
		$params[] = kAPI_DATABASE.'='.'TEST';						// Database.
		$params[] = kAPI_CONTAINER.'='.CUser::DefaultContainer();	// Container.
		$params[] = kAPI_OPT_LOG_TRACE.'='.'1';						// Trace exceptions.
		$params[] = kAPI_OPT_LOG_REQUEST.'='.'1';					// Log request.
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
	}
	
//	echo "<pre>";
//	print_r($decoded);
//	echo "</pre>";
	
	session_start();	
	if( $decoded[kAPI_DATA_STATUS][kTAG_STATUS]==0 && $decoded[kAPI_DATA_STATUS][kAPI_AFFECTED_COUNT]==1 ){
		$_SESSION[kSESSION_USER][kTAG_CODE] = $decoded[kAPI_DATA_RESPONSE][kTAG_CODE];						// USER CODE
		$_SESSION[kSESSION_USER][kTAG_LID] = $decoded[kAPI_DATA_RESPONSE][kTAG_LID][kTAG_DATA];				// USER ID
		$_SESSION[kSESSION_USER][kTAG_VERSION] = $decoded[kAPI_DATA_RESPONSE][kTAG_VERSION];				// USER CURRENT VERSION
	}

	header('Location: ../home.php');
	
?>
