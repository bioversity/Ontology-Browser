<?php
 	/**
	 * This file contain the Store Class.
	 * Used to store the documents and their metadata inside mongodb
	 * 
	 * @author Marco Frangella <m.frangella@cgiar.org>;
	 * @version 1.0 19/04/2012
	 */
	 
	 /**
	  * import defines
	  */
	 require_once "working_area/defines/defines.inc.php";
	 
	 class Store extends MongoGridFS{
		
		private  $mongo;
		private  $db;
		
		/**
		 * use the construct of MongoGrifFs to create the object Store
		 * @param	$db					the database 
		 * @param	$collection 		the collection name prefix, by default is "fs", this will create the collection fs.files and fs.chunks
		 */
		public function __construct($collection=DATASET){
			$this->mongo = new Mongo();
			$this->db = $this->mongo->selectDB(DATABASE);
			parent::__construct($this->db, $collection);
		}
		
		/**
		 * override the method storeFile, forcing the safe value
		 * if the file already exist in the selected dataset, will override the file and the metadata information
		 * @param	$filename			the name of the file
		 * @param	$metadata			other metadata to add to the file saved
		 * @param	$option				Options for the store. Use "safe" to check that this store succeeded.
		 * 
		 * @return	_id					Returns the _id of the saved object
		 */
		public function storeFile($filename, $metadata=array(), $option=array() ){
			try{
				$optionSafe = array_merge(array('safe'=>TRUE), $option);	
				$oldFile = parent::findOne($filename);				
				if($oldFile == NULL){
					parent::storeFile($filename, $metadata, $optionSafe);		
				}
				else {
					parent::delete($oldFile->file[kTAG_LID]);
					parent::storeFile($filename, $metadata, $optionSafe);
				}
			}
			catch (MongoCursorException $error){
				echo "error message: ".$error->getMessage()."\n";
   				echo "error code: ".$error->getCode()."\n";
			}	
		}
		
		/**
		 * remove the file selected
		 * @param	$filename		the file to remove
		 * 
		 * @return	boolean			if the removal was successfully sent to the database
		 */
		public function remove($filename){
			try{
				parent::remove(array('filename'=> array('$regex' => $filename)), array('safe'=>TRUE));
			}
			catch (MongoCursorException $error){
				echo "error message: ".$error->getMessage()."\n";
   				echo "error code: ".$error->getCode()."\n";
			}	
		}
		
		/**
		 * remove the file selected
		 * @param	$datasetName		the file to remove
		 * 
		 * @return	boolean				if the removal was successfully sent to the database
		 */
		public function removeDataset($datasetName){
			try{
				parent::remove(array(DATASET=>$datasetName), array('safe'=>TRUE));
			}
			catch (MongoCursorException $error){
				echo "error message: ".$error->getMessage()."\n";
   				echo "error code: ".$error->getCode()."\n";
			}	
		}
		
		/**
		 * update file infomation
		 * @param	$filename		the name of the file
		 * @param	$metadata		the metadata array to merge with
		 * @param	$changeFile		DEFAULT FALSE, if TRUE, delete the previus file, and import the new one with new metadata
		 * 
		 * @return	boolean			return TRUE if the metadata are updated, FALSE if not
		 */
		public function updateFile($filename, $metadata, $changeFile=FALSE){
			if($currentFile= parent::findOne($filename)){
				if($changeFile){																	// check if the user want change the file
					parent::delete($currentFile->file[kTAG_LID]);
					$this->storeFile($filename, $metadata);
					return TRUE;
				}
				else{																				// update only the metadata information
					$collection = $this->db->selectCollection(FILECOLLECTION);
					$collection->update(array("filename" => $filename), array('$set'=>$metadata));
					return TRUE;
				}
			}
			return FALSE;													// if any file was updated return false
		}
		
		/**
		 * get the dataset list for user
		 * @param	$user		the user that call the function
		 * 
		 * @return	array 		the array with all dataset
		 */
		public function datasetList($user){
			$datasetList = array();
			$collection = $this->db->selectCollection(FILECOLLECTION);
			// filter for user
			$filter = $collection->find(array("user"=>$user));
			foreach ($filter as $value) {
				if(!in_array($value[DATASET], $datasetList)){
					array_push($datasetList, $value[DATASET]);
				}
			}
			return $datasetList;
		} 
		
	}
	
?>
