<?php

namespace App\Singleton;

use App\Database\Database;

trait SingletonDbTrait{
    
    protected static $instance = null;

    public static function getInstance(Database $db)
    {
        if(self::$instance == null)
        {
            self::$instance = new self($db);
        }
        return self::$instance;
    }
}