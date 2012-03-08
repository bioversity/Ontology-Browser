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
                <form action="access.php" method="post" enctype="multipart/form-data">
                    <table align="left" width="100%" height="100%">
                        <tr height="25px"></tr>
                        <tr>
                        <td width="150">Username:</td>
                    <td><input type="text" name="username" size="30" /></td>
                    </tr>
                    <tr>
                        <td width="150">Password:</td>
                        <td><input type="password" name="password" size="30" /></td>
                    </tr>
                    <td  align='right'> 
                        <p>
                        <input type='submit' value='Submit'/>
                        </p></td>
                    </tr>
                    </table>
                </form>
                
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>