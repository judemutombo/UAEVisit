<?php

namespace App\Singleton;

trait SingletonTrait{
    
    protected static $instance = null;

    public static function getInstance()
    {
        if(self::$instance == null)
        {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

