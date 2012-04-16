<?php
	// check if the user is logged
	include 'working_area/logged.php';
	//echo "<pre>"; print_r($_SESSION); echo "</pre>";
?>
	
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">

         <script>
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
                <form action="annotation.php" method="post" enctype="multipart/form-data">
                    <label for="dataset">Please choose the name of your dataset</label>
                    <input type="text" name="dataset" id="dataset">
                    	<?php
                    		if(isset($_SESSION['oldDataset']) && !empty($_SESSION['oldDataset'])){
                    	?>
			                    <label> or choose one from older dataset</label>
			                    <select name="datasetOption">
			                   	<option value=""></option>
		                <?php
	                    		foreach ($_SESSION['oldDataset'] as $dataset) {
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
                    <input type="submit" name="import" value="Import File"  onclick="loading();"/>
                </form>
            </div>
            <div id='loading' style="visibility: hidden"></div>
    </body>
</html>

