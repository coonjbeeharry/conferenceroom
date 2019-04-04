<?php

namespace AppBundle\Entity;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class Login {

    protected $username;

    protected $password;    


    public function getUsername()
    {
        return $this->username;
    }
   
    public function setUsername($username)
    {
        $this->username = $username;
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
}