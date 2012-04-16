<?php
//if ($_SERVER['REQUEST_METHOD'] == 'POST') {
if (true){              // check if user has no file pending 
    if(isset($_GET['doAnnotation'])){       // check if is setted the value of Get to execute directly doAnnotation
        $_POST['dataset'] = $_GET['dataset'];    
        doAnnotation($_GET['doAnnotation']);
    }
    else{
        mkdir("upload/dataset/".$_POST['dataset']."/");
        $folder = substr($_FILES['file']['tmp_name'], (strrpos($_FILES['file']['tmp_name'], "/")+1));
        $dir = "upload/temporary/".$folder."/";
        mkdir($dir, 0777, true);
        chmod($dir, 0777);
        switch ($_FILES["file"]["type"] ) {
            case "application/zip":          //zip
                $zip = new ZipArchive;
//                $zip->open($_FILES["file"]["tmp_name"]);
//                $zip->extractTo($dir);
//                $zip->close();
                $path = $_FILES["file"]["tmp_name"];
                if ($zip->open($path) === true) {
                    for($i = 0; $i < $zip->numFiles; $i++) {
                        $filename = $zip->getNameIndex($i);
                        $fileinfo = pathinfo($filename);
                        if (pathinfo($filename,PATHINFO_EXTENSION))
                            copy("zip://".$path."#".$filename, $dir.$fileinfo['basename']);
                    }                  
                    $zip->close();                  
                } 
                break;
            default :
                move_uploaded_file($_FILES["file"]["tmp_name"], $dir.$_FILES["file"]["name"]);
                break;
        }
        doAnnotation($dir);
    }
}
else {              // if has some file pending, the API return the dir
    doAnnotation($dir);
}

    function getFiles($directory,$exempt = array('.','..','.ds_store','.svn', '._.ds_store', '__macosx'),&$files = array()) {
        $handle = opendir($directory);
        while(false !== ($resource = readdir($handle))) {
            if(!in_array(strtolower($resource),$exempt)) {
                if(is_dir($directory.$resource.'/'))
                    array_merge($files, getFiles($directory.$resource.'/',$exempt,$files));
                else
                    $files[] = $resource;
            }
        }
        closedir($handle);
        return $files;
    } 

    function doAnnotation($dir){
        $files = getFiles($dir);
        if(empty($files)){              
            rmdir($dir);                // remove empty folder
            echo "no more file"; 
        }
        else{
            $value = $files[0];
            switch (pathinfo($dir.$value, PATHINFO_EXTENSION)) {
                case "csv":                                        //csv
                    echo readCSV($dir, $value);
                    break;
                case "xls":                                         // excel xls
                    readXLS($dir, $value);
                    break;
                case "xlsx":                                         // excel xlsx 
                    readXLSX($dir, $value);
                    break;
                default:                                            // for all other file
                    if(is_file($dir.$value)){                   
                        copy($dir.$value, "upload/dataset/".$_POST['dataset']."/".$value);
                        unlink($dir.$value);
                        doAnnotation($dir);
                    }
                    break;
            }
        }
    }
    
    function readXLS($location, $file){
        error_reporting(E_ALL); 
        require_once "File_Excel/PHPExcel.php";
        require_once 'File_Excel/PHPExcel/IOFactory.php';
        // instantiate reader class
        $objPHPExcel = new PHPExcel();
        $objReader = new PHPExcel_Reader_Excel5();
        $objReader->setReadDataOnly(true);
        $objPHPExcel = $objReader->load( $location.$file );
        $countSheet = $objPHPExcel->getSheetCount();
        for ($i=0; $i<$countSheet; $i++){
            $currentSheet = $objPHPExcel->getSheet($i);
            $rowIterator = $currentSheet->getRowIterator();
            $testo = '';
            $countColumns = 0;
            foreach($rowIterator as $row){
                $cellIterator = $row->getCellIterator();
                if(1 == $row->getRowIndex ()) {
                    $cellIterator->setIterateOnlyExistingCells(true);
                    foreach ($cellIterator as $cell) {
                        if ($cell->getCalculatedValue()!=''){
                            $countColumns++;
                            $testo .= $cell->getCalculatedValue().",";
                        }
                    }
                }
                $testo = substr($testo, 0, -1)."\n";
                for($j=0; $j<$countColumns; $j++){
                     if($row->getRowIndex ()>1)
                        $testo .= $currentSheet->getCellByColumnAndRow($j, $row->getRowIndex())->getCalculatedValue().",";
                    if ($j== ($countColumns-1))
                        $testo = substr($testo, 0, -1)."\n";
                }
            }
            
            $fileCsv = fopen($location.$file.'-sheet'.$i.'.csv', 'w');   
            fwrite($fileCsv, $testo);
            fclose($fileCsv);
        }
        copy($location.$file, "upload/dataset/".$_POST['dataset']."/".$file);
        unlink($location.$file);
        unset($objReader);
        unset($objPHPExcel);
        doAnnotation($location);
    }
    
    function readXLSX($location, $file){
        require_once 'File_Excel/simplexlsx.class.php';
        
        $xlsx = new SimpleXLSX($location.$file);
        for ($i=1; $i<=$xlsx->sheetsCount(); $i++){
            $fileCsv = fopen($location.$file.'-sheet'.$i.'.csv', 'w');
            foreach($array = $xlsx->rows($i) as $sheet => $rows){
                $row= implode(",", $rows);
                fwrite($fileCsv, $row);
                fwrite($fileCsv, "\n");
            }
            fclose($fileCsv);
        }
        copy($location.$file, "upload/dataset/".$_POST['dataset']."/".$file);
        unlink($location.$file);
        unset($xlsx);
        doAnnotation($location);
    }
    
    function readCSV($location, $file){
/*        if (file_exists("upload/dataset/".$_POST['dataset']."/".$file)){
            $print = "file already exists in this dataset";
            continue;
        }
        else
            move_uploaded_file($location, "upload/temporary/" . $file);
   */     
            require_once "File_CSV/File_CSV/DataSource.php";
            $old = ini_set("auto_detect_line_endings", true);
            $csv = new File_CSV_DataSource;
            // import the csv file or die with the error in read csv
            $csv -> load($location.$file) or die('error in read csv');
            $return = '<p><input type="radio" name="linguaggio" value="passport" onclick="annotation();"/>passport</p>';
            $return .= "<table id='table1'><thead><tr id='user'>";
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
            copy($location.$file, "upload/dataset/".$_POST['dataset']."/".$file);
            unlink($location.$file);
            $return .= '<br><br><input id=\'submit\' type=\'submit\' name=\'submit\' value=\'Submit\' onClick="validation(\''.$location.'&dataset='.$_POST['dataset'].'\');" />';
            ini_set("auto_detect_line_endings", $old);
            unset($csv);
            return $return;
        
    }
    
?>