<?php

	/**
	 * This file contains the list all defines used in working_area
	 * 
	 * @package	working_area
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
	define('DATASET', 'dataset');

	
	/**
	 * define the default database for the Capped Collection
	 */
	 define("DATABASE", "TEST");
	
	/**
	 * define the capped collection name
	 */
	define("CAPPEDCOLLECTION", "log");
	
	/**
	 * define the size of the capped collection
	 */
	define('SIZECAPPEDCOLLECTION', 1);
	/**
	 * define the file collection 
	 */
	define('FILECOLLECTION', 'dataset.files');
	
	/****************************
	 * INSERT OPERATION 
	 ****************************/	
	/**
	 * user
	 */
	 define('iCOLLECTIONUSER', 'user');
	 /**
	  * message type
	  */
	  define('iMESSAGE', 'msg');
	  define('iERRORMESSAGE', 'ERROR');
	  define('iWARINGMESSAGE', 'WARN');
	  /**
	   * message operation
	   */
	  define('iCOMPLETED', 'completed');
	  define('iIMPORTED', 'imported');
	  define('iFAILED', 'failed');
	  /**
	   * time
	   */
	  define('iTIME', 'time');
	  /**
	   * type of date
	   */
	   define('iCURRENTDATE',date('d-M-Y H:i:s + e'));
	

?>