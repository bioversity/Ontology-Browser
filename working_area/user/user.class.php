<?php
 	/**
	 * This file contain the User Class.
	 * Used to create an user and all operation related to him
	 * 
	 * @author Marco Frangella <m.frangella@cgiar.org>;
	 * @version 1.0 19/04/2012
	 */
	 
	 /**
	  * import defines for user 
	  */
	require_once( '/Library/WebServer/Library/wrapper/includes.inc.php' );
	require_once( kPATH_LIBRARY_DEFINES."Session.inc.php" );
	require_once( kPATH_LIBRARY_DEFINES."Offsets.inc.php" );
	require_once( kPATH_LIBRARY_DEFINES."Operators.inc.php" );
	
	class User extends CUser{
		
		// User information variable
		private $name;
		private $code;
		private $password;
		private $email;
		private $id;
		
		// user class
		private $user;
		// database 
		private $mongo;
		private $db;
		private $collection;
		
		
		/**
		 * construct for the User class
		 * @param	@userInformation	array contents all information for the user
		 */
		public function __construct($userInformation){
			// inizialyze user variable
			$this->name = $userInformation[kTAG_NAME];
			$this->code = $userInformation[kTAG_CODE];
			$this->password = $userInformation[kOFFSET_PASSWORD];
			$this->email = $userInformation[kOFFSET_EMAIL];
			$this->id=$userInformation[kTAG_LID][kTAG_DATA];
			
			$this->mongo = new Mongo();
			$this->db = $this->mongo->selectDB( "TEST" );
			$this->collection = new CMongoContainer( $this->db->selectCollection( CUser::DefaultContainer() ) );
			
			$this->user = new CUser($userInformation);
		}
		
		/**
		 * get the user name
		 * @return	String	the user name
		 */
		public function getName(){
			return $this->name;
		}
		
		/**
		 * get user code
		 * @return String	the user code
		 */
		public function getCode(){
			return $this->code;
		} 
		
		/**
		 * get the user email
		 * @return String	the user email
		 */
		public function getEmail(){
			return $this->email;
		}
		
		/**
		 * get user id
		 * @return	String	the user id
		 */
		public function getID(){
			return $this->id;
		} 
		
		/**
		 * set the user name
		 * @param	$userName	the user name
		 * 
		 * @return	Boolena		TRUE, if the user name is changed, FALSE all other case
		 */
		public function setName($userName){
			if(!empty($userName)){
				$this->name = $userName;
				$this->user->Name($userName);
				$this->user->Commit($this->collection);
				return TRUE;
			}
			else {
				return FALSE;
			}
		}
		
		/**
		 * change the password
		 * @param	$oldPassword	the current password for the user
		 * @param	$newPassword	the new password
		 * 
		 * @return	Boolean			TRUE, if the password is changed, FALSE, if not
		 */
		public function changePassword($oldPassword, $newPassword){
			if($oldPassword == $this->password){
				$this->password = $newPassword;
				$this->user->Password($newPassword);
				$this->user->Commit($this->collection);
				return TRUE;
			}
			else {
				return FALSE;
			}
		}
		
		/**
		 * set the user email
		 * @param	$userEmail	the user email
		 * 
		 * @return	Boolean		TRUE, if the user email is changed, FALSE all other case
		 */
		public function setEmail($email){
			if(!empty($email) && !(strpos($email, '@')===FALSE)){
				$this->email = $email;
				$this->user->Email($email);
				$this->user->Commit($this->collection);
				return TRUE;
			}
			else {
				return FALSE;
			}
		}
		
		/**
		 * create the string with the user information
		 * 
		 * @return	String		the string with the user information
		 */
		public function toString(){
			$str = "NAME: ".$this->name."\n";
			$str .= "EMAIL: ".$this->email."\n";
			$str .= "PASSWORD: ".$this->password;
			
			return $str;
		} 
	}

?>