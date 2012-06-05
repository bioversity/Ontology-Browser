<?php

	// check if the user is logged
	require_once 'working_area/logged.php';
	//echo "<pre>"; print_r($_SESSION); echo "</pre>";
	
	// remove the file in the dataset	
	if(isset($_GET['removed'])){
		$store->remove($_GET['removed']);
		// remove all file created by the excel
		$filesTemporary = $folder->fileList($folder->getUserFolder(), TRUE);
		foreach ($filesTemporary as $fileTemporary) {
			$fileTemporaryName = pathinfo($fileTemporary, PATHINFO_DIRNAME)."/".pathinfo($fileTemporary, PATHINFO_BASENAME);
			if(!(strpos($fileTemporaryName, $_GET['removed'])===FALSE)){
				unlink($fileTemporary);
			}
		}
		$fileName = str_replace($folder->getUserFolder(), '', $_GET['removed']);
		$cappedCollection->insert(array(iCOLLECTIONUSER=>$user->getID(), iMESSAGE=>$fileName." ".iREMOVED, iTIME=> iCURRENTDATE));
//		header('Location: import.php');
	}
	// remove entire dataset
	if(isset($_GET['removedDataset'])){
		$store->removeDataset($_GET['removedDataset']);
		// remove all files created by the excel
		$filesTemporary = $folder->fileList($folder->getUserFolder(), TRUE);
		foreach ($filesTemporary as $fileTemporary) {
			$fileTemporaryName = pathinfo($fileTemporary, PATHINFO_DIRNAME)."/".pathinfo($fileTemporary, PATHINFO_BASENAME);
			if(!(strpos($fileTemporaryName, '.csv')===FALSE && (strpos($fileTemporaryName, '.xls')===FALSE || strpos($fileTemporaryName, '.xlsx')===FALSE)) ){
				unlink($fileTemporary);
			}
		}
		$cappedCollection->insert(array(iCOLLECTIONUSER=>$user->getID(), iMESSAGE=>$_GET['removedDataset']." dataset ".iREMOVED, iTIME=> iCURRENTDATE));
		header('Location: import.php');
	}
	// remove the termporary file or folder
	if(isset($_GET['removedFile'])){
		if (file_exists($_GET['removedFile']) && is_dir($_GET['removedFile'])){
			$folder->rrmdir($_GET['removedFile']);
		}
		elseif (file_exists($_GET['removedFile']) && is_file($_GET['removedFile'])) {
			unlink($_GET['removedFile']);
		}
		header('Location: import.php');
	}
?>
	
<html>
    <head>
        <title>Eurisco intranet</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">

         <script>
         	
         	/**
         	 * check if the import fields are completed
         	 */
     		function checkDataset(form){
	     		if(form.file.value==''){											// check if no file is selected
	     			document.getElementById('working_area').style.opacity='1';
	           		document.getElementById('loading').style.visibility='hidden';
	     			return false;
	     		}
	     		if(form.dataset.value=="" && form.datasetOption.value==""){			// check if the user not write any dataset or not select one already existing
	     			document.getElementById('working_area').style.opacity='1';
	           		document.getElementById('loading').style.visibility='hidden';
	     			return false;
	     		}
	     		return true															// if is all ok continue
     		}
     		
     		/**
     		 * redirect onClick function
     		 */
     		function goToPage(link){
     			window.location = link;
     		}
     		/**
     		 * function used to display the loading image
     		 */
         	function loading(){
	            document.getElementById('working_area').style.opacity='0.4';
	            document.getElementById('loading').style.visibility='visible';
        	}
         </script>

    </head>
    <body>
        <div id="container">
            <div id='header'></div>

            <div id='operations'>            
				<?php include 'operations.html'; ?>
            </div>
            
            
            <div id='working_area'>
            	<p>In this page you can mangaer your file, decide if import new, continue your work with previous file imported and not yet evalauted, or have a view all files in the dataset</p>
                <div id="importNewFile">
                	<h3>Import new File</h3>
                	<?php
                			// get the dataset List
							$datasetList = $store->datasetList($user->getID());
                		
                			if(!$folder->isFull()){
                	?>
		                <form action="annotation.php" method="post" enctype="multipart/form-data" onsubmit="return checkDataset(this)">
		                    <label for="dataset">Please choose the name of your dataset</label>
		                    <input type="text" name="dataset" id="dataset">
		                    	<?php
									if(!empty($datasetList)){
		                    	?>
					                    <label> or choose one from older dataset</label>
					                    <select id="datasetOption" name="datasetOption">
					                   	<option value=""></option>
				                <?php
			                    		foreach ($datasetList as $dataset) {
											echo "<option value='$dataset'>$dataset</option>";
										}
									}
									else {
										echo "<select name='datasetOption' style='visibility:hidden'>";
									}
		                    	?>
		                    </select>
		                    <br /><br />
		                    <label for="file">File: </label>
		                    <input type="file" name="file" id="file" />
		                    <br /><br />
		                    <input type="submit" name="import" value="Import File"  onClick="loading();"/>
		                </form>
		            <?php
	            		}   
	            		else {
							echo "<p>Allow space is full, please analyze your files before import others";
						} 
	                ?>
                </div>
            	
            	<div id="dataset">
            		<?php
            			
						$files = array();
						foreach ($datasetList as $dataset) {
							$files[$dataset] = $folder->getFileInDataset($dataset);
						}
						if(!empty($files)){
					?>
            				<h3>File stored in the dataset</h3>
							<table id='datasetTable'>
								<?php
									foreach ($files as $key => $value) {
										echo "<tr><th>$key</th><th></th>";												// create the header with the dataset name
										echo "<th id='removeFolder' onClick='goToPage(\"import.php?removedDataset=$key\")'></th></tr>";
										echo "<tr><td></td><td><table id='fileDatasetTable'>";							// create the table with all files in the dataset
										foreach ($value as $fileInDataset) {
											$fileInDatasetName = str_replace($folder->getUserFolder().$key.'/', '', $fileInDataset);
											echo "<tr><td>$fileInDatasetName</td>";										// create the row with the file
											echo "<td id='remove' onClick='goToPage(\"import.php?removed=$fileInDataset\")'></td></tr>";
										}	
										echo "</table></td></tr>";														// close the files table
									}
								?>
							</table>
							
					<?php
						}
					?>
            	</div>
            	
            	<div id="temporary">
            		<?php
            			$temporary = $folder->fileList($folder->getUserFolder(), TRUE);
            			$tempFiles = array();
            			foreach ($temporary as $fileTemp) {
            				$temporaryPath = substr($fileTemp, 0, strrpos($fileTemp, '/')).'/';
							$tempFiles[$temporaryPath][] = $fileTemp;
						}	

						if (!empty($tempFiles)){
					?>
							<h3>File imported waiting for valutation</h3>
							<table id='temporaryTable'>
								<?php
									foreach ($tempFiles as $key => $value) {
			            				$temporaryPath = substr($key, 0, strrpos($key, '/')).'/';
										$dataset = substr($temporaryPath, (strrpos($temporaryPath, '/',-2)+1),-1);
										$edit = "<th id=\"edit\" onClick='goToPage(\"annotation.php?temporary=$temporaryPath&dataset=$dataset\")'><th>";
										echo "<tr>$edit<th>$dataset</th><th></th>";															// create the header with the dataset name
										echo "<th id='removeFolder' onClick='goToPage(\"import.php?removedFile=$key\")'></th></tr>";
										echo "<tr><td></td><td></td><td></td><td><table id='fileTemporaryTable'>";							// create the table with all files in the dataset
										foreach ($value as $fileInTemporary) {
											$fileInTemporaryName = str_replace($temporaryPath, '', $fileInTemporary);
											echo "<tr><td>$fileInTemporaryName</td>";												// create the row with the file
											echo "<td id='remove' onClick='goToPage(\"import.php?removedFile=$fileInTemporary\")'></td></tr>";
										}	
										echo "</table></td></tr>";																	// close the files table
									}
								?>
							</table>
					<?php
						}
            		?>
            	</div>
            
            </div>
            <div id='loading' style="visibility: hidden"></div>
        </div>
    </body>
</html>

