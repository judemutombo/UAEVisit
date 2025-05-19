<?php
if(isset($_GET['url']))
{
    $url = explode("/",$_GET['url']);
}
else{
    $url = array("");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?= '<base href="'.App::urlbase($url).'">' ?>
    <meta charset="utf-8">
    <title><?= App::getInstance()->getTitle()?></title>
    <link rel="icon" href="./Public/images/icon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1" >
    <link rel="stylesheet" type="text/css" href="Public/CSS/style.css">
    <?php require_once ROOT.DIRECTORY_SEPARATOR.'App'.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.'Styles'.DIRECTORY_SEPARATOR.'Loader.php' ?>

    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.172.0/build/three.module.js",
                "GLTFLoader": "https://unpkg.com/three@0.172.0/examples/jsm/loaders/GLTFLoader.js",
                "gsap" : "https://cdn.skypack.dev/gsap"
            }
        }
    </script>
</head>
<body class="overflow-x-hidden">
    <?= $content;?>
    <script src="Public/JS/index.js"  defer></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.min.js"></script>
    <script src="Public/JS/3d.js" type="module" defer></script> 
</body>
</html>