<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    switch ($_FILES["file"]["type"] ) {
        case "application/vnd.ms-excel": // excel
            echo readXLS();
            break;
        case "text/csv": // csv
            $print = readCSV($_FILES["file"]["tmp_name"], $_FILES["file"]["name"]);
            break;
        default :
            $print = 'file not accepted';
    }
}
    function readXLS(){
        return "xls";
    }
    
    function readCSV($location, $file){
        if (file_exists("upload/" . $file)){
            move_uploaded_file($location, "upload/" . $file);
        //    return "<script>window.onload=MakeRequest('import','fileExist=".$_FILES["file"]["name"]."');</script>";
        }
        else
            move_uploaded_file($location, "upload/" . $file);
        
            require_once "File_CSV/File_CSV/DataSource.php";
            $old = ini_set("auto_detect_line_endings", true);
            $csv = new File_CSV_DataSource;
            // import the csv file or die with the error in read csv
            $csv -> load("upload/".$file) or die('error in read csv');
            $return = "<table id='table1'><thead><tr id='user'>";
            // creation of header
            $header = $csv -> getHeaders();
            $i=1;
            foreach ($header AS $value){
                $return .= "<th id='C".$i."' class='C".$i." notSelected' >".htmlspecialchars($value)."</th>";
                $i++;
            }
            $return .= "</tr><tr id='ontology'>";
            $i=1;
            foreach ($header AS $value){
                $return .= "<td id='C".$i."ontology' class='C".$i." notSelected' ></td>";
                $i++;
            }
            $return .= "</tr></thead><tbody>";
            $row = $csv -> getRows(); 	
            // index to look through the rows
            $i=0; 	 
            while($i<count($row) && $i<10){ 
                $return .= "<tr>";
                $j=1;
                foreach ($row[$i] AS $key => $value){
                    $return .= "<td class='C".$j." notSelected'>".htmlspecialchars($value)."</td>";
                    $j++;
                }
                $return .= "</tr>";
                $i++;
            }
            $return .= "</tbody></table>";
            $return .= '<br><br><input type=\'submit\' name=\'submit\' value=\'Submit\' onclick=validation(\'upload/'.$file.'\'); />';
            ini_set("auto_detect_line_endings", $old);
            //rename("upload/".$file, "upload/".$file.".old");
            return $return;
        
    }
?>