<?php
    if ($_GET['access'] != null)
        echo '<p> access denied<p>';
?>

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
       <input type='submit' value='Submit' />
    </p></td>
 </tr>
 </table>
 </form>