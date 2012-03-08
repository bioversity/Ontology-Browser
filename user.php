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
        <link rel="stylesheet" type="text/css" href="css/jquery.treeview.css">
        <link rel="stylesheet" type="text/css" href="css/ontologybrowser.css">
        <link rel="stylesheet" type="text/css" href="css/details.css">
      
         <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
         <script type="text/javascript" src="jquery.ontologybrowser.js"></script>
         <script type="text/javascript" src="jquery-impromptu.js"></script>
         <!-- tooltip javascript import -->
         <script type="text/javascript" src="glt.js"></script>
         <script>
             
            var CROPONTOLOGY_URL = "http://www.cropontology.org"; 
             
            $(function(){
                $("table#table1 th").ontologyBrowser(function(termId, termName, elemClicked){
                    var elemClickedId = elemClicked['context'].id;
                    var newId = elemClicked['context'].id+"ontology" ;
                    document.getElementById(newId).innerHTML=termName+" ["+termId+"]"; // put the id between [ ]
                    changeColumn(elemClickedId, true);
 //                   var newLocation = (window.location.href.indexOf("?")==-1) ? window.location.href+"?"+termId+"="+termName : window.location.href+"&"+termId+"="+termName ; 
 //                   window.location.href = newLocation;
                });
            });
            function searchForm(value){
                $.ontologyBrowser.bindClick(value);
            }

            function getXMLHttp(){
                    var xmlHttp
                    try{
                        //Firefox, Opera 8.0+, Safari
                        xmlHttp = new XMLHttpRequest();
                    } catch(e) {
                        //Internet Explorer
                        try {
                        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                        } catch(e) {
                            try {
                                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                            } catch(e) {
                                alert("Your browser does not support AJAX!")
                                return false;
                            }
                        }
                    }
                    return xmlHttp;
                }

            function MakeRequest(value, getValue) {
                var xmlHttp = getXMLHttp();
                xmlHttp.onreadystatechange = function() {
                    if(xmlHttp.readyState == 4) {
                        HandleResponse(xmlHttp.responseText);
                    }
                }
                if (getValue)
                    xmlHttp.open("GET", value+".php?"+getValue, true);
                else
                    xmlHttp.open("GET", value+".php", true);
                xmlHttp.send(null);
            }
            function HandleResponse(response) {
                document.getElementById('working_area').innerHTML = response;
            }
            
            function changeColumn(className, selected){
                var column = document.getElementsByClassName(className);
                if (selected)
                    $(column).addClass("unique").removeClass("notSelected");
                else
                    $(column).addClass("selected").removeClass("notSelected");
            }
            
            function validation(file){
                var getValue="file="+file;
                var $onto= $(document.getElementById('ontology')).children();
                for(var i=0; i<$onto.length; i++){
                    if($($onto[i]).text().indexOf('[')==-1){            // check if present a [ that should be container of id
                        alert('select all fields');
                        break;
                    }
                    if(i !=$onto.length)
                        getValue+="&"
                    getValue+=i+'='+($($onto[i]).text());
                }
                if(i==$onto.length)
                    MakeRequest("validation", getValue)
            }
         // show how many ontologies find for all headers
            $(function(){
                var table =$("table#table1 th");
                var j = 0;
                $("table#table1 th").each(function(){
                    document.getElementById('working_area').style.opacity='0.4';
                    document.getElementById('loading').style.visibility='visible';
                    var currentId = $(this).attr('id');
                    var $currentElement = $(this);
                        var currentValue = $(this).text();
                        $.getJSON(CROPONTOLOGY_URL + "/search?callback=?&q=" + currentValue, function(data){ 
                            if (data.length==1){
                                changeColumn(currentId, false);
                                $currentElement.attr('title', data[0].name+" [" + data[0].id + "]");
                                document.getElementById(currentId+"ontology").innerHTML = data[0].name+" ["+data[0].id+"]";
                            }
                            if (data.length > 1){
                                var title = "";
                                for(var i=0; i<data.length; i++)
                                    title += data[i].name+" [" + data[i].id +"]<br>";
                                $currentElement.attr('title', title);
                                document.getElementById(currentId+"ontology").innerHTML = data.length+' different terms';
                            }
                            j++;    
                            if (j==table.length){
                                document.getElementById('working_area').style.opacity='1';
                                document.getElementById('loading').style.visibility='hidden';
                            }
                        })
                });  
            });
         </script>

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