<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\ProductBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;

class CurrencyRepository extends EntityRepository
{
    /**
     * Find a currency by it's id
     *
     * @param mixed $id
    * @return mixed|null
    */
    public function findById($id)
    {
        try {
            $qb = $this->createQueryBuilder('currency')
                ->andWhere('currency.id = :currencyId')
                ->setParameter('currencyId', $id);

            return $qb->getQuery()->getSingleResult();
        } catch (NoResultException $exc) {
            return null;
        }
    }

    /**
     * Find a currency by it's name
     *
     * @param string $name
     * @return mixed|null
     */
    public function findByName($name)
    {
        try {
            $qb = $this->createQueryBuilder('currency')
                ->andWhere('currency.name = :currencyName')
                ->setParameter('currencyName', $name);

            return $qb->getQuery()->getSingleResult();
        } catch (NoResultException $exc) {
            return null;
        }
    }
}
