<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Room
 *
 * @ORM\Table(name="room")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RoomRepository")
 */
class Room
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
     * @ORM\Column(name="roomname", type="string", length=255)
     */
    private $roomname;

    /**
     * @var string
     *
     * @ORM\Column(name="imagepath", type="string", length=255)
     */
    private $imagepath;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     */
    private $description;


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
     * Set roomname
     *
     * @param string $roomname
     *
     * @return Room
     */
    public function setRoomname($roomname)
    {
        $this->roomname = $roomname;

        return $this;
    }

    /**
     * Get roomname
     *
     * @return string
     */
    public function getRoomname()
    {
        return $this->roomname;
    }

    /**
     * Set imagepath
     *
     * @param string $imagepath
     *
     * @return Room
     */
    public function setImagepath($imagepath)
    {
        $this->imagepath = $imagepath;

        return $this;
    }

    /**
     * Get imagepath
     *
     * @return string
     */
    public function getImagepath()
    {
        return $this->imagepath;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Room
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
}

