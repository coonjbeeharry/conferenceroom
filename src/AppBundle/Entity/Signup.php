<?php

namespace AppBundle\Entity;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class Signup {

    protected $firstname;
    protected $password; 
    protected $lastname;
    protected $email;
       

    public function getFirstname()
    {
        return $this->firstname;
    }
   
    public function setFirstname($username)
    {
        $this->firstname = $username;
        return null;
    }
 
    public function getPassword()
    {
        return $this->password;
    }
   
    public function setPassword($password)
    {
        $this->password = $password;
        return null;
    }
    
    public function getLastname()
    {
        return $this->lastname;
    }
   
    public function setlastname($username)
    {
        $this->lastname = $username;
        return null;
    } 

    public function getEmail()
    {
        return $this->email;
    }
   
    public function setEmail($email)
    {
        $this->email = $email;
        return null;
    }
}