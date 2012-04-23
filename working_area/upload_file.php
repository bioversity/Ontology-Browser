<?php
		// Global includes.
		require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
		// Class includes.
		require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
		require_once( kPATH_LIBRARY_SOURCE."CWarehouseWrapper.inc.php" );
        require_once "File_CSV/File_CSV/DataSource.php";

		// import the folder class
		require_once 'folder/folder.php';
		// import the capped collection class
		require_once 'logMessage/cappedCollection.php';
		
		$user = $_SESSION[kSESSION_USER][kTAG_LID][kTAG_DATA];
		$userFolder = new Folder($user);
		$collection = new CappedCollection();
		$store = new Store();
		
		
    if(isset($_GET['temporary'])){											// check if is setted the value of Get to execute directly doAnnotation
	    if(file_exists($_GET['temporary']))	{								// check if the temporary folder exist
			
			if (isset($_GET['dataset'])){													// check if exist the dataset
				$userFolder->setDataset($_GET['dataset']);
			}

			if(isset($_GET['prevFile'])){																		// check if there is a previous file
				// store the file in mongodb
				$fileToStore = $_GET['temporary'].$_GET['prevFile'];
				// create the array with the metadata information
				if(isset($_GET['columnsValue'])){																		// if the user selected the columns value
					$columnsValue = array('columnsValue' => (explode(',', $_GET['columnsValue'])) );
					$metadata = array_merge($columnsValue, array('user'=>$user, DATASET=>$userFolder->getDataset() ));
				}
				else {																									// else if selected nothing
					$metadata = array('user'=>$user, DATASET=>$userFolder->getDataset());
				}
				$store->storeFile($fileToStore, $metadata);
	            unlink($_GET['temporary'].$_GET['prevFile']);													// delete the previus file from temporary folder
            	$collection->insert(array(iCOLLECTIONUSER=>$_SESSION[kSESSION_USER][kTAG_LID][kTAG_DATA], iMESSAGE=>$_GET['prevFile']." ".iCOMPLETED, iTIME=> iCURRENTDATE));
			}
            
			$userFolder->doAnnotation($_GET['temporary']);
		}
		else {																// if not exist
			include 'folder/noFile.html';					
		}
    }
    else{
		$dataset = (!empty($_POST['datasetOption'])) ? $_POST['datasetOption'] : $_POST['dataset'];

		// set current dataset
	    $userFolder->setDataset($dataset);
		// set the current temporary folder
		$dir = $userFolder->setTemporaryFolder($dataset);
//		 $userFolder->getUserFolder();

		
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
		$collection->insert(array(iCOLLECTIONUSER=>$_SESSION[kSESSION_USER][kTAG_LID][kTAG_DATA], iMESSAGE=>$_FILES["file"]["name"]." ".iIMPORTED, iTIME=> iCURRENTDATE));
		$userFolder->doAnnotation($dir);
	}
 
?>