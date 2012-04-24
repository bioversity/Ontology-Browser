<?php
	// import class
	require_once 'working_area/store/store.php';
	require_once 'working_area/folder/folder.php';
	// check if the user is logged
	include 'working_area/logged.php';
	//echo "<pre>"; print_r($_SESSION); echo "</pre>";
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
     			console.log(form.dataset.value)
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
	                <form action="annotation.php" method="post" enctype="multipart/form-data" onsubmit="return checkDataset(this)">
	                    <label for="dataset">Please choose the name of your dataset</label>
	                    <input type="text" name="dataset" id="dataset">
	                    	<?php
	                    		$store = new Store();
								$datasetList = $store->datasetList($user->getID());
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
                </div>
            	
            	<div id="dataset">
            		<h3>File stored in the dataset</h3>
            		<?php
            			$folder = new Folder($user->getID());
						foreach ($datasetList as $dataset) {
							$files[$dataset] = $folder->getFileInDataset($dataset);
							echo "<pre>"; print_r($files); echo "</pre>";					
						}
					?>
            	</div>
            	
            	<div id="temporary">
            		<h3>File imported waiting for valutation</h3>
            		<?php
            			$temporary = $folder->fileList($folder->getUserFolder(), TRUE);
            			foreach ($temporary as $fileTemp) {
            				$temporaryPath = substr($fileTemp, 0, strrpos($fileTemp, '/')).'/';
							$dataset = substr($temporaryPath, (strrpos($temporaryPath, '/',-2)+1));
							$key = "<a href='annotation.php?temporary=$temporaryPath&dataset=$dataset'>$dataset</a>";
							$tempFiles[$key][] = str_replace($temporaryPath, '', $fileTemp);
						}	
						echo "<pre>"; print_r($tempFiles); echo "</pre>";
            		?>
            	</div>
            
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>

