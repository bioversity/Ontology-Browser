<?php
    //
    // Global includes.
    //
    require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
    //
    // Class includes.
    //
    require_once( kPATH_LIBRARY_SOURCE."CMongoDataWrapper.php" );
    
    $url = 'http://localhost/newwrapper/MongoDataWrapper.php';
    
    $query = new CMongoQuery();
    $statement = array
    (
            kAPI_QUERY_SUBJECT => kTAG_ID_NATIVE,
            kAPI_QUERY_OPERATOR => kOPERATOR_EQUAL,
            kAPI_QUERY_TYPE => kDATA_TYPE_MongoBinData,
            kAPI_QUERY_DATA => array( kTAG_TYPE => kDATA_TYPE_BINARY, kTAG_DATA => '74a42cf85a2eacb967701c00328b03e2' )
    );
    $query->AppendStatement( $statement );

    $query_json = json_encode( $query );

    $params = array( (kAPI_FORMAT.'='.kDATA_TYPE_JSON),
                                        (kAPI_OPERATION.'='.kAPI_OP_GET),
                                        (kAPI_DATABASE.'='."TEST"),
                                        (kAPI_CONTAINER.'='."USERS"),
                                        (kAPI_DATA_QUERY.'='.urlencode( $query_json )) );
    $request = $url.'?'.implode( '&', $params );
    $response = file_get_contents( $request );
    $decoded = json_decode( $response, TRUE );

    echo( '<pre>' ); print_r($decoded);echo( '</pre>' );
    
?>