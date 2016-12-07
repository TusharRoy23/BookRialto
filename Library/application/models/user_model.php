<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user_model extends CI_Model
{
     function __construct()
     {
          // Call the Model constructor
          parent::__construct();
     }

     //get the username & password from tbl_usrs
     function get_user_byid($id)
     {
          $sql = "select * from users where userID = '".$id."'";
          $query = $this->db->query($sql);
           if($query->num_rows()){
               foreach($query->result() as $row)
                    return $row;
           }
           return NULL;
     }
	 function updateProfileImg($userID, $img){
		$this->db->update('users', $img, $userID);
		return $this->db->affected_rows();
	 }
	 function user_activation($hash){
		 $data = array('isActiveAccount' => '1');
		 $this->db->where('hash', $hash);
		 $this->db->update('users', $data);
			//return $this->db->affected_rows();
	 }
	 function getAllUsers(){
		 $this->db->where('userType', 'member');
		 $query = $this->db->get('users');
		 return $query->result();
	 }
	 function return_searchInternalForAllUser($strs){
		$this->db->where('userType','member');
		$this->db->like('firstName',$strs);
		$this->db->or_like('lastName',$strs);
		$this->db->limit(10);
		$query =$this->db->get("users");
        return $query->result();
	 }
	 function return_reported_user($bookID, $ownerID, $userID){
		$this->db->where(array('bookID' => $bookID, 'ownerID' => $ownerID, 'reporterID' => $userID, 'accepted' => '0'));
		$query = $this->db->get('report');
		return $query->row();
	 }
	 function insert_into_reports($data){
		  $this->db->insert('report',$data);
	 }
}?>