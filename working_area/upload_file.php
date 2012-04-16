<?php
		// Global includes.
		require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
		// Class includes.
		require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
		require_once( kPATH_LIBRARY_SOURCE."CWarehouseWrapper.inc.php" );
        require_once "File_CSV/File_CSV/DataSource.php";

		// import the folder class
		require_once 'folder/folder.php';
		
		$user = $_SESSION[kSESSION_USER][':CODE'];
		$userFolder = new Folder($user);
		
		
    if(isset($_GET['temporary'])){											// check if is setted the value of Get to execute directly doAnnotation
	    if(file_exists($_GET['temporary']))	{								// check if the temporary folder exist
			if (file_exists($_GET['dataset'])){								// check if exist the dataset
				$userFolder->setFolderDataset($_GET['dataset']);
			}
			else {
				$currentDataset = substr($_GET['dataset'], -(stripos($_GET['dataset'], "/")));
				$userFolder->setCurrentDataset($currentDataset);
			}
//            $_SESSION[$_GET['temporary']] = $userFolder->getFolderDataset();
//			print_r($_SESSION);
			
			if(isset($_GET['prevFile'])){
				copy($_GET['temporary'].$_GET['prevFile'], $_GET['dataset'].$_GET['prevFile']); 				// move the previus file from temporary folder to dataset folder 
	            unlink($_GET['temporary'].$_GET['prevFile']);													// delete the previus file from temporary folder
            }
            
            
			if(!file_exists($_GET['temporary'])){						// check if there's any file in the folder, 
				unset($_SESSION[$_GET['temporary']]);   				// otherwise unset the relative session
			}
			else {
				$userFolder->doAnnotation($_GET['temporary']);
			}
		}
		else {													// if not exist
			echo "no more file";
			echo "<br>"; 
            echo "to view the report of your imported file please go to the <a href='reports.php'>validation</a> page";
			echo "<br><br>";
			
			// destroy the session with the relationship between temporary and dataset
			unset($_SESSION[$_GET['temporary']]);
		}
    }
    else{
	    
	    $folder = substr($_FILES['file']['tmp_name'], (strrpos($_FILES['file']['tmp_name'], "/")+1));
	    $userFolder->setCurrentTemporary($folder);
		$dir = $userFolder->getFolderTemporary();
		$dataset = (!empty($_POST['datasetOption'])) ? $_POST['datasetOption'] : $_POST['dataset'];

		// create the list of the dataset
		if (isset($_SESSION['oldDataset']) && !in_array($dataset, $_SESSION['oldDataset'])){
			$_SESSION['oldDataset'][] = $dataset;
		}
		else if(!isset($_SESSION['oldDataset']))
			$_SESSION['oldDataset'][] = $dataset;

		// set current dataset
	    $userFolder->setCurrentDataset($dataset);
		// set the session variable for the relationship between the dataset and the relative temporary folder
		$_SESSION[$dir] = $userFolder->getFolderDataset(); 

	    switch ($_FILES["file"]["type"] ) {
	        case "application/zip":          //zip
	            $zip = new ZipArchive;
	//                $zip->open($_FILES["file"]["tmp_name"]);
	//                $zip->extractTo($dir);
	//                $zip->close();
	            $pathZip = $_FILES["file"]["tmp_name"];
	            if ($zip->open($pathZip) === true) {
	                for($i = 0; $i < $zip->numFiles; $i++) {
	                    $filename = $zip->getNameIndex($i);
	                    $fileinfo = pathinfo($filename);
	                    if (pathinfo($filename,PATHINFO_EXTENSION))
	                        copy("zip://".$pathZip."#".$filename, $dir.$fileinfo['basename']);
	                }                  
	                $zip->close();       
	            } 
	            break;
	        default :
	            move_uploaded_file($_FILES["file"]["tmp_name"], $dir.$_FILES["file"]["name"]);
	            break;
	    }
		
		$userFolder->doAnnotation($dir);
	}
 
?>