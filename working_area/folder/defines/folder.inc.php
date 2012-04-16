<?php

	/**
	 * Defaul folder tag.
	 * 
	 * This file contains the list of the subfolder tags for temporary folder 
	 * and dataset folder
	 * 
	 * @package	Folder
	 * @author 	Marco Frangella <m.frangella@cgiar.org
	 * @version	1.0 11/04/2012
	 * 
	 */
	
	/**
	 * define the upload folder name
	 */
	define('folderUpload', 'upload');
	
	/**
	 * define the folder name for the temporary files,
	 * all files are stored here waiting to be analysed
	 */
	define('folderTemporary', "temporary");
	
	/**
	 * define the folder name for the dataset files,
	 * all files after have been analysed are moved into this folder
	 */
	define('folderDataset', 'dataset');
	

?>