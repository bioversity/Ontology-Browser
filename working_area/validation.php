<?php
/*	
	// import the folder class
	require_once 'folder/folder.php';
	
	$user = $_SESSION[kSESSION_USER][kTAG_LID][kTAG_DATA];
	$userFolder = new Folder($user);
	
	$dataset = $userFolder->getFolderDataset();
	$datasetFiles = $userFolder->fileList($dataset, true);
	
	echo "File list<pre>";
	print_r($datasetFiles);
	echo "</pre>";
	
	foreach ($datasetFiles as $file) {
		if(strpos($file, '.properties')){
			echo "$file<pre>";
			print_r(unserialize(file_get_contents($file)));
			echo "</pre>";
		}
	}
	
*/	
	
	
	$collection = new CappedCollection();
	
	$findForCurrentUser = array('user' => $_SESSION[kSESSION_USER][kTAG_LID][kTAG_DATA]);
	
	$msgs = $collection->find($findForCurrentUser);

	foreach ($msgs as $msg) {
	    echo $msg['msg']." ".$msg['time']."<br>";
	}
	
	
	
	
?>
