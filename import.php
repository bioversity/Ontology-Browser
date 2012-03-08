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

         <script>
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
                <form action="annotation.php" method="post" enctype="multipart/form-data">
                    <label for="dataset">Please choose the name of your dataset</label>
                    <input type="text" name="dataset" id="dataset">
                    <br /><br />
                    <label for="file">File: </label>
                    <input type="file" name="file" id="file" />
                    <br />
                    <input type="submit" name="import" value="Import File"  onclick="loading();"/>
                </form>
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>

