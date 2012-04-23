<?php
	
	// check if the user is logged
	include 'logged.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Operators.inc.php';
	require_once '/Library/WebServer/Library/wrapper/defines/Offsets.inc.php';
	
	$mongo = new Mongo();
	$db = $mongo->selectDB('TEST');
	$collection = $db->selectCollection('CWarehouseWrapper');
	
	$collection->update (	array(kOPERATOR_AND=>array(kTAG_CODE=> $_SESSION[kSESSION_USER][kTAG_CODE]), array(kOFFSET_PASSWORD=>$_POST['oldPassword'])), 
							array('$set'=>array(kOFFSET_PASSWORD=>$_POST['newPassword'])) );
	
	
	print_r($collection->findOne(array(kOPERATOR_AND=>array(kTAG_CODE=> $_SESSION[kSESSION_USER][kTAG_CODE]), array(kOFFSET_PASSWORD=>$_POST['oldPassword']))))	;	
	//header('Location: ../user.php');
?>