<?php
	// check if the user is logged
	include 'working_area/logged.php';
	
//	echo "<pre>"; print_r($_SESSION); echo "</pre>";
?>
<!DOCTYPE text/html>
<html>
    <head>
        <title>Eurisco intranet</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/jquery.treeview.css">
        <link rel="stylesheet" type="text/css" href="css/ontologybrowser.css">
        <link rel="stylesheet" type="text/css" href="css/details.css">
        <link rel="stylesheet" type="text/css" href="css/log.css">
        <link rel="stylesheet" type="text/css" href="css/ForceDirected.css">
      	<link rel="stylesheet" type="text/css" href="css/base.css">
        <!-- import jquery -->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="http://arborjs.org/js/jquery.address-1.4.min.js"></script>
		<!-- import json definition -->
         <script src="js/JSON/json2.js" type="text/javascript"></script> 
         <!-- import javascript defines -->
         <script src="js/defines/utilities.js"></script>
         <script src="js/defines/jquery.ontologyBrowser.inc.js"></script>
         <!-- import ontology browser widget -->
         <script type="text/javascript" src="js/jquery.ontologybrowser.js"></script>
         <!-- jquery for the details -->
         <script type="text/javascript" src="js/jquery-impromptu.js"></script>
         <!-- tooltip javascript import -->
         <script type="text/javascript" src="js/glt.js"></script>
         <!-- import jit to create graph -->
		 <script language="javascript" type="text/javascript" src="js/jit.js"></script>
         <script>
            /**
             * call the ontologyBrowser plugin
             */ 
            $(function(){
                $("table#table1 th").ontologyBrowser(function(termId, termName, elemClicked){
                    var elemClickedId = elemClicked['context'].id;
                    var newId = elemClicked['context'].id+"ontology" ;
                    document.getElementById(newId).innerHTML=termName; //+" ["+termId+"]"; // put the id between [ ]
                    
                    changeColumn(elemClickedId, true);
                });
            });

			/**
			 * bind click for ontology browser plugin
			 */
            function searchForm(value){
                $.ontologyBrowser.bindClick(value);
            }
			
			/**
			 * change the layout for the columns with value
			 */
            function changeColumn(className, selected){
                var column = $("."+className);
                if (selected)
                    $(column).addClass("unique").removeClass("notSelected");
                else
                    $(column).addClass("selected").removeClass("notSelected");
            }
            
            /**
             * send the paramiters for the other files
             */
            function validation(getValue){
            	var tr = $('#ontology').children();
        		var values = new Array();	
            	for(var i=1; i<(tr.length+1); i++){
            		var string = $('#C'+i+'ontology').text();
                    //string = string.slice(string.indexOf('[')+1,string.indexOf(']'));
                    values.push(string);
            	}
            	if(!emptyArray(values))
    				getValue += '&columnsValue='+values;

                loading();
                window.location = "annotation.php"+getValue;
            }
         	
         	/**
         	 * check if the array is empty
         	 */
         	function emptyArray(array){
         		var empty=0;
         		for(var i=0; i<array.length; i++){
         			if(array[i].length==0)
         				empty ++;
         		}
         		return (empty==array.length);
         	}
         	/**
         	 * show how many ontologies find for all headers,
         	 * if is unique display the term finded
         	 */
            function annotation(){
                $(function(){
                    var table =$("table#table1 th");
                    var j = 0;
                    $("table#table1 th").each(function(){
                        loading();
                        document.getElementById('submit').style.visibility='hidden';
                        var currentId = $(this).attr('id');
                        var currentValue = $(this).text();
                       
						var queryID = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_LID+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_BINARY+'","'+kAPI_QUERY_DATA+'":{"'+kTAG_TYPE+'":"'+kTYPE_BINARY+'", "'+kTAG_DATA+'":"'+md5(currentValue)+'"}},{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NODE+'", "'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_NOT_NULL+'"}]}';
						var queryCode = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_CODE+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+currentValue+'"},{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NODE+'", "'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_NOT_NULL+'"}]}';
						var queryName = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NAME+':'+kTAG_DATA+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_CONTAINS_NOCASE+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+currentValue.toLowerCase()+'"}]}'
						
						var query = '['+queryID+','+queryCode+','+queryName+']';
                        
					    $.getJSON(CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_MATCH+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_DATA_QUERY+'='+query, function(data){
							if(data[kAPI_DATA_STATUS][kAPI_AFFECTED_COUNT] == 1){
								var node = data[kAPI_DATA_RESPONSE][0][kTAG_NODE][0];
								$.getJSON(CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_NODES+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+node+']', function(dataNode){
									if(dataNode[kAPI_DATA_RESPONSE][kAPI_RESPONSE_NODES][node][kTAG_KIND] && jQuery.inArray(kTYPE_MEASURE, dataNode[kAPI_DATA_RESPONSE][kAPI_RESPONSE_NODES][node][kTAG_KIND])>-1){
										var valueTerm = dataNode[kAPI_DATA_RESPONSE][kAPI_RESPONSE_NODES][node][kTAG_TERM];
										var valueInner = dataNode[kAPI_DATA_RESPONSE][kAPI_RESPONSE_TERMS][valueTerm][kTAG_GID]
										changeColumn(currentId, false);
		                                document.getElementById(currentId+"ontology").innerHTML = valueInner;
	                               	}
								})
							}
							j++;    
                            if (j==table.length){
                                document.getElementById('working_area').style.opacity='1';
                                document.getElementById('loading').style.visibility='hidden';
                                document.getElementById('submit').style.visibility='visible';
                            }				    
						}) 
                    });  
                });
            }
            
            /**
             * display the loading 
             */
            function loading(){
                document.getElementById('working_area').style.opacity='0.4';
                document.getElementById('loading').style.visibility='visible';
             }
         </script>

    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'> <?php include 'operations.html'; ?> </div>
            
            
            <div id='working_area'>	
			<!-- jit -->
			<div id="center-container" style="display: none">
    			<div id="infovis"></div>    
			</div>
			<!-- jit -->
                <?php
                    include 'working_area/upload_file.php';
                ?>
            
                <div id="log">
                    <script>             
                        $(document).ready( function() { 
                            $('#log').load('working_area/log.php');
                            setInterval( function() {
                                $('#log').load('log.php'); 
                            }, 100000000000000); 
                        });
                    </script>
                </div>
            </div>
            <div id='loading' style="visibility: hidden"></div>
        </div>
    </body>
</html>
