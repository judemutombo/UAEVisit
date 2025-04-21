<?php
use App\StyleLoader\StyleLoader;
StyleLoader::addTailwindConfigFile("window.tailwind.config"); 
StyleLoader::addTailwindCssFile("tailwindcss"); 
App::importStyles() 
?>