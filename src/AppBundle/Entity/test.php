<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * test
 *
 * @ORM\Table(name="test")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\testRepository")
 */
class test
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="t1", type="string", length=255)
     */
    private $t1;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set t1
     *
     * @param string $t1
     *
     * @return test
     */
    public function setT1($t1)
    {
        $this->t1 = $t1;

        return $this;
    }

    /**
     * Get t1
     *
     * @return string
     */
    public function getT1()
    {
        return $this->t1;
    }
}

