<?php

namespace App\Database;

use App\Singleton\singletonTrait;
use PDO;
use PDOStatement;

abstract class Database{
    protected $host;
    protected $username;
    protected $dbname;
    protected $password;
    protected $type;
    protected $pdo = null;

    protected static $config;

    use singletonTrait;

    protected function __construct()
    {
<<<<<<< HEAD
        self::$config = require ROOT.DIRECTORY_SEPARATOR."App".DIRECTORY_SEPARATOR."Config".DIRECTORY_SEPARATOR."db.config.php";
=======
        self::$config = require ROOT.DIRECTORY_SEPARATOR."App".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."config.php";
>>>>>>> 4560585fe695ea924c0718d13354f60347ed4ace

        $this->host = self::$config["hostname"];
        $this->username = self::$config["username"];
        $this->dbname = self::$config["dbname"];
        $this->password = self::$config["password"];
        $this->type = self::$config["type"];
    }

    public function getDbType() : string
    {
        return $this->type;
    }

    abstract protected function getPDO() : PDO;
    abstract public function select(string $table, array $columns = [], array $clauses = [], array $clauseLinkers = [], array $parameters = []) : array;
    abstract public function insert(string $table, array $columns = [], array $parameters = []) : bool;
    abstract public function update(string $table, array $columns = [], array $clauses = [], array $clauseLinkers = [], array $parameters = []);
    
    final public function __clone(){}
    final public function __sleep(){}
    final public function __wakeup(){}

}