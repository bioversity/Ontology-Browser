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
        <link rel="stylesheet" type="text/css" href="css/log.css">
      
        <!-- import jquery -->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
         <!-- import ontology browser widget -->
         <script src="JS/JSON/json2.js" type="text/javascript"></script> 
         <script type="text/javascript" src="JS/jquery.ontologybrowser.js"></script>
         <!-- import log information plugin not used for the moment 
         <script type="text/javascript" src="JS/jquery.logInfo.js"></script> -->
         <!-- jquery for the details -->
         <script type="text/javascript" src="JS/jquery-impromptu.js"></script>
         <!-- tooltip javascript import -->
         <script type="text/javascript" src="JS/glt.js"></script>
         
         <script>
             
            var CROPONTOLOGY_URL = "http://www.cropontology.org"; 
            var JSONS = {'test': [{'userId':'1','fileId':'2','op':'upload file', 'status':'running', 'progress':'10%', 'mess':'no mess'},{'userId':'1','fileId':'2','op':'upload file', 'status':'running', 'progress':'30%', 'mess':'no mess'},{'id':'2','op':'parsing file', 'status':'running', 'progress':'20%', 'mess':'no mess'},{'userId':'1','fileId':'1','op':'upload file', 'status':'waiting', 'progress':'50%', 'mess':'no mess'}]};
            $(function(){
                $("table#table1 th").ontologyBrowser(function(termId, termName, elemClicked){
                    var elemClickedId = elemClicked['context'].id;
                    var newId = elemClicked['context'].id+"ontology" ;
                    document.getElementById(newId).innerHTML=termName+" ["+termId+"]"; // put the id between [ ]
                    changeColumn(elemClickedId, true);
 //                   var newLocation = (window.location.href.indexOf("?")==-1) ? window.location.href+"?"+termId+"="+termName : window.location.href+"&"+termId+"="+termName ; 
 //                   window.location.href = newLocation;
                });
              //  $("div#log").logInfo('1',JSONS);
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
                var column = $("."+className);
                if (selected)
                    $(column).addClass("unique").removeClass("notSelected");
                else
                    $(column).addClass("selected").removeClass("notSelected");
            }
            
            function validation(dir){
                var getValue="?doAnnotation="+dir;
                loading();
                window.location = "annotation.php"+getValue;
            }
         // show how many ontologies find for all headers
            function annotation(){
                $(function(){
                    var table =$("table#table1 th");
                    var j = 0;
                    $("table#table1 th").each(function(){
                        document.getElementById('working_area').style.opacity='0.4';
                        document.getElementById('loading').style.visibility='visible';
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
            
            function loading(){
                document.getElementById('working_area').style.opacity='0.4';
                document.getElementById('loading').style.visibility='visible';
             }
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
                    include 'upload_file.php';
                ?>
            
                <div id="log">
                    <script>             
                        $(document).ready( function() { 
                            $('#log').load('log.php');
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
