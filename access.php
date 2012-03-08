<?php

    $username = $_POST['username'];
    $password = md5($_POST['password']);
    session_start();
				
    if ($username != null){                              //check if user exist
        $_SESSION['user']=$username;
        echo '<pre>'.$_SESSION['user'].'</pre>';  
        exit; 
    }
    else {   	
        echo '<p>access denied</p>';
        exit;   
    }	
      

		

?>
