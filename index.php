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
         <script>
            $(function(){
                $("table#table1 th").ontologyBrowser(function(termId, termName, elemClicked){
                    var newId = (elemClicked['context'].id.indexOf("ontology")!=-1) ? elemClicked['context'].id : elemClicked['context'].id+"ontology" ;
                    document.getElementById(newId).innerHTML=termName+" ["+termId+"]";
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
;
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
            
            function changeColumn(id){
                var old = document.getElementsByClassName("selected");
                $(old).removeClass("selected").addClass("notSelected");
                var column = document.getElementsByClassName(id);
                $(column).addClass("selected").removeClass("notSelected");
            }
            
            function validation(file){
                var getValue="file="+file;
                var $onto= $(document.getElementById('ontology')).children();
                for(var i=0; i<$onto.length; i++){
                    if($($onto[i]).text()==""){
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
         </script>

    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'>
                <p><a href="#" onclick='MakeRequest("home")'>Home Page</a></p>                
                <p><a href="#" onclick='MakeRequest("user");'>User Profile</a></p>
                <p><a href="#" onclick='MakeRequest("import");'>1. Import file</a></p>
                <p><a href="#" >2. Validation</a></p>
                <p><a href="#" style="color:red">Logout</a></p>
            </div>
          
            <div id='working_area'>
                <?php
                    if(isset($_FILES) && !empty($_FILES)){
                        include 'upload_file.php';
                        echo $print;    
                    }
                    else 
                        echo "<script>window.onload=MakeRequest('home');</script>";
                ?>
            </div>
    </body>
</html>