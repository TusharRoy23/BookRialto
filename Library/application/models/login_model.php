<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class login_model extends CI_Model
{
     function __construct()
     {
          // Call the Model constructor
          parent::__construct();
     }

     //get the username & password from tbl_usrs
     function get_user($usr, $pwd)
     {
          $sql = "select * from users where userName = '" . $usr . "' and password = '" . md5($pwd) . "'";
          $query = $this->db->query($sql);
           if($query->num_rows()){
               foreach($query->result() as $row)
                    return $row;
           }
           return NULL;
     }
	 /*function get_Type($username){
		 
	 }*/
}?>