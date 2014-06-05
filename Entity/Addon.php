<?php

namespace Sulu\Bundle\Product\BaseBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Addon
 */
class Addon
{
    /**
     * @var string
     */
    private $price;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface
     */
    private $product;

    /**
     * @var \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface
     */
    private $addon;


    /**
     * Set price
     *
     * @param string $price
     * @return Addon
     */
    public function setPrice($price)
    {
        $this->price = $price;
    
        return $this;
    }

    /**
     * Get price
     *
     * @return string 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set product
     *
     * @param \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $product
     * @return Addon
     */
    public function setProduct(\Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $product)
    {
        $this->product = $product;
    
        return $this;
    }

    /**
     * Get product
     *
     * @return \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set addon
     *
     * @param \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $addon
     * @return Addon
     */
    public function setAddon(\Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $addon)
    {
        $this->addon = $addon;
    
        return $this;
    }

    /**
     * Get addon
     *
     * @return \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface
     */
    public function getAddon()
    {
        return $this->addon;
    }
}