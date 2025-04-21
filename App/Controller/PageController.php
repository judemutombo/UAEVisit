<?php
namespace App\Controller;



class PageController extends MainController{

    public function home() : void
    {
        $this->render("home","template"); //give tha name of the page and the template to render
    }
}