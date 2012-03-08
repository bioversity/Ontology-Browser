<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'>            
                <p><a href="user.php">User Profile</a></p>
                <p><a href="import.php">1. Import file</a></p>
                <p><a href="#" >2. Validation</a></p>
                <p><a href="#" style="color:red">Logout</a></p>
            </div>
            
            
            <div id='working_area'>
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
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>