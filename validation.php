<?php
 echo "<pre>";print_r($_FILES);echo"</pre>";
 //   rename("upload/".$_FILES['file']['name'], "upload/".$_FILES['file']['name'].".old");
  //  unlink("upload/".$_FILES['file']['name']);

    echo "<pre>";print_r($_GET);echo"</pre>";
    $row = 1;
    if (($handle = fopen($_GET['file'], "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $num = count($data);
            echo "<p> $num fields in line $row: <br /></p>\n";
            $row++;
            for ($c=0; $c < $num; $c++) {
                if ($data[$c]==null)
                    echo "NULL VALUE<br />\n";
                else
                    echo $data[$c] . "<br />\n";
            }
        }
        fclose($handle);
    }
?>
