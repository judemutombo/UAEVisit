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
</head>
<body class="overflow-x-hidden">
    <?= $content;?>
    <script src="Public/JS/index.js" defer></script> 
</body>
</html>