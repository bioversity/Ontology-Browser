<?php 
	// check if the user is logged
	include 'working_area/logged.php';
	// Global includes.
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	// Class includes.
	require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
	// import the folder class
	require_once 'working_area/folder/folder.php';
	
	echo "<pre>"; print_r($_SESSION); echo "</pre>";
	
?>
<html>
    <head>
        <title>Eurisco intranet</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'>            
				<?php include 'operations.html'; ?>
            </div>
            
            
            <div id='working_area'>
                <?php
                	$userFolder = new Folder($_SESSION[kSESSION_USER]['_id'][':DATA']);
					$temporary = $userFolder->getFolderTemporary();
					$dataset = $userFolder->getFolderDataset();
					echo "<b>Files in dataset folder</b><pre>";
				   	print_r($userFolder->fileList($dataset, true));
				   	echo "</pre>";
					
					$datasetList = $userFolder->listDataset(); 

					if( ! (empty($datasetList) && $userFolder->isEmptyDir($temporary))){
						echo "<b>Folder dataset</b><pre>";
					   	print_r($userFolder->listDataset());
					   	echo "</pre>";
						
						if(empty($_SESSION[kSESSION_USER]['oldDataset'])){
							$_SESSION[kSESSION_USER]['oldDataset'] = $userFolder->listDataset();
						}
						
						echo "click on the name to remove the dataset, please note you will delete all files included in that folder<br>";
						foreach ($userFolder->listDataset() as $datasetValue) {
							if(is_dir($dataset.$datasetValue))
								echo "<a href='user.php?removed=".$dataset.$datasetValue."/'>$datasetValue</a><br>";
						}
							if(isset($_GET['removed'])){
								$userFolder->rrmdir($_GET['removed']);
								foreach($_SESSION[kSESSION_USER]['oldDataset'] as $key => $oldDataset){
									if($dataset.$oldDataset."/"==$_GET['removed']){
										unset($_SESSION[kSESSION_USER]['oldDataset'][$key]);
									}
								}
								header('Location: user.php');
							}
					}
					
					echo "<b>Files in temporary folder</b><pre>";
				   	print_r($userFolder->fileList($temporary, true));
				   	echo "</pre>";
				   	echo "click on the name to analyse all files in the temporary directory<br>";
					if ($handle = opendir($temporary)) {
					    while (false !== ($entry = readdir($handle))) {
					    	$temporaryPath = $temporary.$entry."/";
					    	if($entry!='.' && $entry!='..'){
						    	if(!isset($_SESSION[$temporaryPath]) || empty($_SESSION[$temporaryPath])){
						    		echo "<em>no dataset setted for current folder $temporaryPath</em><br>";	
						    		$userFolder->rrmdir($temporaryPath);
						    	}
								else {
						        	echo "<a href='annotation.php?temporary=$temporaryPath&dataset=$_SESSION[$temporaryPath]'>$entry</a><br>";
								}
							}
					    }
					    closedir($handle);
					}	
					echo "click on the name to remove the temporary folder, please note you will delete all files included in that folder<br>";
					if ($handle = opendir($temporary)) {
					    while (false !== ($entry = readdir($handle))) {
					    	$temporaryPath = $temporary.$entry."/";
					    	if($entry!='.' && $entry!='..')
					        	echo "<a href='user.php?removed=$temporaryPath'>$entry</a><br>";
					    }
					    closedir($handle);
					}				
					
					echo "<b>User information</b><pre>";
				   	print_r($_SESSION[kSESSION_USER]);
				   	echo "</pre>";
                ?>
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>