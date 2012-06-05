<?php
//echo "<pre>"; print_r($_GET); echo "</pre>";
		// Global includes.
		require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
		// Class includes.
		require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
		require_once( kPATH_LIBRARY_SOURCE."CWarehouseWrapper.inc.php" );

		$userID = $user->getID();
		
    if(isset($_GET['temporary'])){											// check if is setted the value of Get to execute directly doAnnotation
	    if(file_exists($_GET['temporary']))	{								// check if the temporary folder exist
			
			if (isset($_GET['dataset'])){													// check if exist the dataset
				$folder->setDataset($_GET['dataset']);
			}

			if(isset($_GET['prevFile'])){																		// check if there is a previous file
				// store the file in mongodb
				$fileToStore = $_GET['temporary'].$_GET['prevFile'];
				// create the array with the metadata information
				if(isset($_GET['columnsValue'])){																		// if the user selected the columns value
					$columnsValue = array('columnsValue' => (explode(',', $_GET['columnsValue'])) );
					$metadata = array_merge($columnsValue, array('user'=>$userID, DATASET=>$folder->getDataset() ));
				}
				else {																									// else if selected nothing
					if(isset($_GET['attachment']) && $_GET['attachment']==1){
						$metadata = array('user'=>$userID, DATASET=>$folder->getDataset(), 'attachment'=>TRUE);
					}
					else{
						$metadata = array('user'=>$userID, DATASET=>$folder->getDataset());
					}
				}
				$store->storeFile($fileToStore, $metadata);
				// check if the file imported is the original or the copy created by system
				if(( strpos($fileToStore, '.xls') || strpos($fileToStore, '.xlsx') ) && strpos($fileToStore, '.csv') ){
					$store->updateFile($fileToStore, array(iORIGINAL=>FALSE));
				}
				else {
					$store->updateFile($fileToStore, array(iORIGINAL=>TRUE));
				}
	            unlink($_GET['temporary'].$_GET['prevFile']);													// delete the previus file from temporary folder
            	
            	$cappedCollection->insert(array(iCOLLECTIONUSER=>$userID, iMESSAGE=>$_GET['prevFile']." ".iCOMPLETED, iTIME=> iCURRENTDATE));
			}
            
			$folder->doAnnotation($_GET['temporary']);
		}
		else {																// if not exist
			include 'folder/noFile.html';					
		}

    }
    else{
		$dataset = (!empty($_POST['datasetOption'])) ? $_POST['datasetOption'] : $_POST['dataset'];

		// set current dataset
	    $folder->setDataset($dataset);
		// set the current temporary folder
		$dir = $folder->setTemporaryFolder($dataset);
		
	    switch ($_FILES["file"]["type"] ) {
	        case "application/zip":          //zip
	            $zip = new ZipArchive;
	            $pathZip = $_FILES["file"]["tmp_name"];
	            if ($zip->open($pathZip) === true) {
	                for($i = 0; $i < $zip->numFiles; $i++) {
	                    $filename = $zip->getNameIndex($i);
	                    if (pathinfo($filename, PATHINFO_EXTENSION)){
    			        	$pattern = "/\A\W/";													
							if(preg_match($pattern, pathinfo($filename, PATHINFO_BASENAME))==0){						// check if the filename start with a non-word character
								copy("zip://".$pathZip."#".$filename, $dir.pathinfo($filename, PATHINFO_BASENAME));
							}
						}
	                }                  
	                $zip->close();       
	            } 


	            break;
	        default :
	            move_uploaded_file($_FILES["file"]["tmp_name"], $dir.$_FILES["file"]["name"]);
	            break;
	    }
		$cappedCollection->insert(array(iCOLLECTIONUSER=>$userID, iMESSAGE=>$_FILES["file"]["name"]." ".iIMPORTED, iTIME=> iCURRENTDATE));
		$folder->doAnnotation($dir);
	}
 
?>