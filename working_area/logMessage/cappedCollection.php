<?php
 	/**
	 * This file contain the Capped Collection Class.
	 * Used to create or use the Capped Collection, for the log message in Reports page
	 * 
	 * @author Marco Frangella <m.frangella@cgiar.org>;
	 * @version 1.0 19/04/2012
	 */

	 /**
	  * import defines
	  */
	 require_once "working_area/defines/defines.inc.php";
	 
	 /**
	  * import the database connection
	  */
	 //require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	 //require_once( kPATH_LIBRARY_SOURCE."CMongoQuery.php" );
	 
	 class CappedCollection{
	 	
		private static $collection;
	 	
		/**
		 * construct for the class CappedCollection
		 */		
		public function __construct(){
			//
			// Instantiate Mongo database.
			//
			$mongo = New Mongo();
			
			//
			// Select default database.
			//
			$db = $mongo->selectDB( DATABASE );
			
			// createh the capped collection if not exist
			$listCollection = $db->listCollections();
			if(self::exist($listCollection)){																				// check if the capped collection already exists
				self::$collection = $db->selectCollection(CAPPEDCOLLECTION);
			}
			else {																											// otherwise create the capped collection
				self::$collection = $db->createCollection(CAPPEDCOLLECTION, $capped=TRUE, $size=SIZECAPPEDCOLLECTION);																									// otherwise create the collection
			}
		}
		
		/**
		 * check if the capped collection already exists
		 * @return	Boolean		TRUE if exist, FALSE if not exist
		 */
		private function exist($listCollection){
			foreach ($listCollection as $coll) {
				if($coll == DATABASE.".".CAPPEDCOLLECTION)
					return TRUE;
			}
			return FALSE;
		}
		
		/**
		 * get the capped collection
		 * @return	Collection 	the capped collection
		 */
		public function getCappedCollection(){
			return self::$collection;
		}
		
		/**
		 * insert the value into the collection
		 * @param	@array 		the array with the value
		 */
	 	public function insert($array) {
			 self::getCappedCollection()->insert($array);
		}
		
		/**
		 * @override	return the MongoDB::find() function
		 */
		public function find($array){
			return self::getCappedCollection()->find($array);
		}
		/**
		 * @override	return the MongoDB::drop() function
		 */
		public function dropCollectio(){
			self::getCappedCollection()->drop();
		} 
		
		/**
		 * @override	return the MongoDB::getName() function
		 */
		public function toString(){
			return self::getCappedCollection()->getName();
		}
	} 

?>