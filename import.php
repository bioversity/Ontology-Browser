<?php
    if(isset($_GET['fileExist'])){
        echo 'file '.$_GET['fileExist'].' already exist, please change the name and import it again    ';
        echo '<br /><br />';
    }
    unset($_FILES);
?>

<form action="#" method="post" enctype="multipart/form-data">
    <label for="file">File: </label>
    <input type="file" name="file" id="file" />
    <br />
<input type="submit" name="import" value="Import File" onclick='MakeRequest("upload_file");' />
</form>