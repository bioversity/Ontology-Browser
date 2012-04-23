<?php
	// include store class to store the file into MongoDB
	require_once 'working_area/store/store.php';
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
      
        <!-- import jquery -->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
         <!-- import ontology browser widget -->
         <script src="JS/JSON/json2.js" type="text/javascript"></script> 
         <script type="text/javascript" src="JS/jquery.ontologybrowser.js"></script>
         <!-- jquery for the details -->
         <script type="text/javascript" src="JS/jquery-impromptu.js"></script>
         <!-- tooltip javascript import -->
         <script type="text/javascript" src="JS/glt.js"></script>
         
         <script>
            /**
             * call the ontologyBrowser plugin
             */ 
            var CROPONTOLOGY_URL = "http://www.cropontology.org"; 
            $(function(){
                $("table#table1 th").ontologyBrowser(function(termId, termName, elemClicked){
                    var elemClickedId = elemClicked['context'].id;
                    var newId = elemClicked['context'].id+"ontology" ;
                    document.getElementById(newId).innerHTML=termName+" ["+termId+"]"; // put the id between [ ]
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
                    values.push($('#C'+i+'ontology').text());
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
    </body>
</html>
