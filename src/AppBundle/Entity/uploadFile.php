<?php 
namespace AppBundle\Entity; 
use Symfony\Component\Validator\Constraints as Assert;
  class uploadFile { 
       
 
   private $photo; 
      
   public function getPhoto() { 
      return $this->photo; 
   } 
   public function setPhoto($photo) { 
      $this->photo = $photo; 
      return $this; 
   } 


} 