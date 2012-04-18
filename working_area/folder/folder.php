<?php
	/**
	 * This file contains the class definition for the folder
	 * 
	 * @author Marco Frangella <m.frangella@cgiar.org>;
	 * @version 1.0 11/04/2012
	 */

	/**
	 * import the folders name
	 */ 
	require_once 'defines/folder.inc.php';
 
	class Folder{
			
		private static $path;
		
		private static $userFolder;
		
		/**
		 * construct for the class Folder;
		 * initialize the path array with the temporary and dataset folders
		 * @param	$folderName 	the user code, used to create the personal folder
		 */		
		public function __construct($folderName){
			if(empty(self::$path)){
				self::$path[folderTemporary] = folderUpload."/".$folderName."/".folderTemporary."/";
				self::$path[folderDataset] = folderUpload."/".$folderName."/".folderDataset."/";
				self::$userFolder = folderUpload."/".$folderName."/";
				self::init($folderName);
			}
		}
		/**
		 * create the folder for the current user, if not exist,
		 * with the relative dataset and temporary folder, if not exist.
		 * @param	$folderName		the user code used to  create the personal folder
		 */
		private function init($folderName){
			// create the folder relative to the user if not exist
			if(!file_exists(folderUpload."/".$folderName."/")){
				mkdir(folderUpload."/".$folderName."/", 0777, true);
	    		chmod(folderUpload."/".$folderName."/", 0777);
			}
			// create the folder temporary for the user if not exist
			if(!file_exists(self::getFolderTemporary())){
			 	mkdir(self::getFolderTemporary(), 0777, true);
        		chmod(self::getFolderTemporary(), 0777);	
			}
			// create the folder dataset for the user if not exist
			if(!file_exists(self::getFolderDataset())){
				mkdir(self::getFolderDataset(), 0777, true);
        		chmod(self::getFolderDataset(), 0777);
			}
		}
		
		/**
		 * get the path for temporary and dataset folders.
		 * @return	array 		the array with the path for both temporary and dataset folders
		 */
		public function getPath(){
			return self::$path;
		}
		
		/**
		 * get the path of the temporary folder
		 * @return	string		the temporary folder
		 */
		public function getFolderTemporary(){
			return self::$path[folderTemporary];
		}
		
		/**
		 * get the path for the dataset folder
		 * @return	string		the dataset folder
		 */
		public function getFolderDataset(){
			return self::$path[folderDataset];	
		}
		/**
		 * set the dataset folder
		 * @param	$dataset		the dataset path
		 */
		public function setFolderDataset($dataset){
			self::$path[folderDataset] = $dataset;
		}
		/**
		 * get the user folder
		 * @return	string		the user folder
		 */
		public function getUserFolder(){
			return self::$userFolder;
		}
		/**
		 * set the dataset from the name selected from the user, and if not exist create the relative folder
		 * @param	$currentDatasetFolder		the name of the current dataset folder
		 */
		public function setCurrentDataset($currentDatasetFolder){
			// create the subfolder in the dataset folder relative to the current dataset
			if(!file_exists(self::getUserFolder().folderDataset."/".$currentDatasetFolder."/")){
				mkdir(self::getUserFolder().folderDataset."/".$currentDatasetFolder."/", 0777, true);
				chmod(self::getUserFolder().folderDataset."/".$currentDatasetFolder."/", 0777);
			}
			self::$path[folderDataset] = self::getUserFolder().folderDataset."/".$currentDatasetFolder."/";
		}
		/**
		 * set the current temporary folder, and if not exist create the relative folder
		 * @param	$currentTemporaryFolder		the name of the current temporary folder
		 */
		public function setCurrentTemporary($currentTemporaryFolder){
			// create the subfolder in the temporary folder relative to the current file
			if(!file_exists(self::getUserFolder().folderTemporary."/".$currentTemporaryFolder."/"))
				mkdir(self::getUserFolder().folderTemporary."/".$currentTemporaryFolder."/", 0777, true);	
			self::$path[folderTemporary] = self::getUserFolder().folderTemporary."/".$currentTemporaryFolder."/";
		}
		
		/**
		 * get all file in the directory
		 * @param	$directory				the directory to scan
		 * @param 	exempt		 			the array with the extension to exclude from the list
		 * @return 	array 					all files in the specific folder
		 */
		public function getFiles($directory, $exempt = array('.','..','.ds_store','.svn', '._.ds_store', '__macosx'),&$files = array()) {
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
		
		/**
		 * function used to read all files in the directory and create the 10 rows table in html format
		 * @param	$dir	the directory to scan
		 * @return	html	10 rows table with the content of each files
		 */ 
		public function doAnnotation($dir){
	        $files = self::getFiles($dir);
	        if(empty($files)){              
	            rmdir($dir);                								// remove empty folder
	           	include 'noFile.html';										// print the noFile page
				return FALSE;												// return FALSE to unset the SESSION variable
	        }

            $value = $files[0];												// get the first file in the folder
			if(filesize($dir.$value)==0){									// check if file is empty
				unlink($dir.$value);										
				self::doAnnotation($dir);
			}
			else {
				echo "<p>Analisys of <em>".(pathinfo($dir.$value, PATHINFO_FILENAME))."</em> file";
	            switch (pathinfo($dir.$value, PATHINFO_EXTENSION)) {
	                case "csv":                                       		// csv
					case "txt":												// txt
	                    echo self::readCSV($dir, $value);
	                    break;
	                case "xls":                                         	// excel xls
	                    self::readXLS($dir, $value);
	                    break;
	                case "xlsx":                                         	// excel xlsx 
	                    self::readXLSX($dir, $value);
	                    break;
	                default:                                            	// for all other file
	                    if(is_file($dir.$value)){
                       		copy($dir.$value, self::getFolderDataset()."/".$value);
	                        unlink($dir.$value);
	                    	self::doAnnotation($dir);
	                    }
	                    break;
	            }
				return TRUE;
			}
	    }
		
		/**
		 * function used to create the CSV files for each sheet of XLS files
		 * @param	$location		the temporary folder 
		 * @param	$file			the current file
		 */
		function readXLS($location, $file){
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
	            
	            $fileCsv = fopen($location.$file.'-'.($currentSheet->getTitle()).'.csv', 'w');   
	            fwrite($fileCsv, $testo);
	            fclose($fileCsv);
	        }
	        copy($location.$file, self::getFolderDataset().$file);
	        unlink($location.$file);
	        unset($objReader);
	        unset($objPHPExcel);
	        self::doAnnotation($location);
	    }
		
		/**
		 * function used to create the CSV files for each sheet of XLSX files
		 * @param	$location		the temporary folder 
		 * @param	$file			the current file
		 */
		function readXLSX($location, $file){
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
	        copy($location.$file, self::getFolderDataset().$file);
	        unlink($location.$file);
	        unset($xlsx);
	        self::doAnnotation($location);
	    }
		
		/**
		 * function used to read the CSV files contenuted in the temporary folder
		 * @param	$location		the current temporary folder
		 * @param	$file			the current file to read
		 * @return	html			10 rows table with the content of the file
		 */
		function readCSV($location, $file){
	/*        if (file_exists("upload/dataset/".$_POST['dataset']."/".$file)){
	            $print = "file already exists in this dataset";
	            continue;
	        }
	        else
	            move_uploaded_file($location, "upload/temporary/" . $file);
	   */     
	            $old = ini_set("auto_detect_line_endings", true);
	            $csv = new File_CSV_DataSource;
	            // import the csv file or die with the error in read csv
	            $csv -> load($location.$file) or die('error in read csv');
	            $return = '<p><input type="radio" name="valutation" value="passport" onClick="annotation();"/>passport';
				$return .= '<input type="radio" name="valutation" value="attachment" onClick="validation(\'?attachment=1&temporary='.$location.'&dataset='.self::getFolderDataset().'&prevFile='.$file.'\');"/>attachment (skip file)</p>';
	            $return .= "<table id='table1'><thead><tr id='user'>";
	            // check if the file is comma or tab separated
	            $countComma = count($csv->getHeaders());
				$csv->settings(array('delimiter' => "\t"));
				$csv->load($location.$file);
				$countTab = count($csv->getHeaders());
				if($countComma > $countTab){
					$csv->settings(array('delimiter' => ","));
					$csv->load($location.$file);
				}
				
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
	            $return .= '<br><br><input id=\'submit\' type=\'submit\' name=\'submit\' value=\'Submit\' onClick="validation(\'?temporary='.$location.'&dataset='.self::getFolderDataset().'&prevFile='.$file.'&attachment=0\');" />';
	            ini_set("auto_detect_line_endings", $old);
	            unset($csv);
	            return $return;
	        
	    }
		/**
		 * return a list of all files in the folder, should be recursive and display all files in subfolders too.
		 * @param	$directory		the directory to look in
		 * @param	$recursive		boolean, true if the function have to look in subfolder too, false otherwise
		 * @return	array 			the array contents all file with relative path
		 */
		public function fileList($directory, $recursive) {
			// might be used scandir($directory) but not return full path
			$array_items = array();
			if ($handle = opendir($directory)) {
				while (false !== ($file = readdir($handle))) {
					if ($file != "." && $file != "..") {
						if (is_dir($directory. "/" . $file)) {
							if($recursive) {
								$array_items = array_merge($array_items, self::fileList($directory. "/" . $file, $recursive));
							}
							$file = $directory . "/" . $file;
							if(is_file($file))
								$array_items[] = preg_replace("/\/\//si", "/", $file);
						} else {
							$file = $directory . "/" . $file;
							if(is_file($file))
								$array_items[] = preg_replace("/\/\//si", "/", $file);
						}
					}
				}
				closedir($handle);
			}
			return $array_items;
		}
		
		/**
		 * return the list of the dataset folders
		 * @return	array 		the array with the list of the dataset folders
		 */
		public function listDataset(){
			$array = scandir(self::getFolderDataset());
			$exclude = array('.','..','.DS_Store','.svn', '._.ds_store', '__macosx');
			return array_values(array_diff($array, $exclude));
		}
		
		/**
		 * remove the folder 	example of path: folder1/folder2/
		 * @param	$dir		the directory to remove
		 * @return	boolean		TRUE on success or FALSE on failure
		 */
		public function rrmdir($dir) {
		    foreach(glob($dir . '/*') as $file) {
		        if(is_dir($file))
		            self::rrmdir($file);
		        else
		            unlink($file);
		    }
		    rmdir($dir);
		}
		
		/**
		 * check if a directory is empty
		 * @param	$dir		the directory to check
		 * @return	boolean		TRUE if it is empty, FALSE otherwise 
		 */
		public function isEmptyDir($dir){
			$files = self::fileList($dir, true);	
			return empty($files);
		}
		
		/**
		 * return the directory name
		 * @param	$directory		the path of the directory
		 * @return	String			the name of the directory
		 */
		function toString($directory){
			return pathinfo($directory, PATHINFO_DIRNAME);
		}
		
		/**
		 * create a file .properties contais the array with the selected value 
		 * @param	$directory		the dataset folder 
		 * @param	$file			the current file
		 * @param	$contents		the array with the informations selected by the user
		 */
		 public function createProperties($directory, $file, $contents){
		 	$fileProperties = fopen($directory.$file.'.properties', 'w');
			fwrite($fileProperties, serialize($contents));
            fclose($fileProperties);
		 }
	}
?>