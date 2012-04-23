<?php
	// import class store
	require_once 'working_area/store/store.php';
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
                <form action="annotation.php" method="post" enctype="multipart/form-data" onsubmit="return checkDataset(this)">
                    <label for="dataset">Please choose the name of your dataset</label>
                    <input type="text" name="dataset" id="dataset">
                    	<?php
                    		$store = new Store();
							$datasetList = $store->datasetList($_SESSION[kSESSION_USER][kTAG_LID][kTAG_DATA]);
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
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>

