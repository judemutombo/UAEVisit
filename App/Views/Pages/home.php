<header class="w-full h-[56px] bg-[#3D424A] flex  px-5  text-white relative">
    <div class="title w-1/2  h-full flex items-center">
        <p class="text-xl">UAEVisit</p>
    </div>
    <div class="navLink w-1/2 h-full flex items-center justify-end"> 
        <nav>
            <ul class="flex space-x-4">
                <li>Home</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </nav>
    </div>
</header>
<div class="section panel w-full bg-[#3D424A] relative text-white overflow-hidden" id="panel">
    <div class="slogan w-1/2 h-[160px] absolute top-16 right-5 text-right text-4xl font-bold">  
        <p>
            Live a real experience </br>
            in United Arab Emirats
        </p>
    </div>
    <div class="z-5 circle rounded-[50%]  w-[450px] h-[450px] bg-[#FEAE49] absolute bottom-[-225px]">
    </div>
    <div class="rotator w-[450px] h-[900px] z-10  absolute bottom-[-450px]">
        <img class="object-fill w-full h-1/2 " src="Public/images/burj2.png" alt="burj" width="100%" height="100%">
        <img class="down object-fill w-full h-1/2 " src="Public/images/burj.png" alt="burj" width="100%" height="100%">
    </div>
</div>
<?php
$sections = file_get_contents(ROOT.DIRECTORY_SEPARATOR.'App'.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.'section.json');
$sections = json_decode($sections);

$i = 0;
foreach($sections as $section):
    $bgColor = $i % 2 == 0 ? "bg-[#F6F2F2]" : "";
    $i++;
    $class = match($section->side) {
        "Right" => "section h-[500px] ".$bgColor,
        "Left" => "section flex-row-reverse h-[500px] ".$bgColor,
        "Top" => "section flex-column-reverse flex-wrap-reverse h-[600px] ".$bgColor,
        "Bottom" => "section flex-column flex-wrap h-[600px] ".$bgColor
    };

    $child1Class = match($section->side) {
        "Right" => "section-content w-3/5 h-full",
        "Left" => "section-content w-3/5 h-full",
        "Top" => "section-content w-full h-2/5",
        "Bottom" => "section-content w-full h-2/5"
    };

    $child2Class = match($section->side) {
        "Right" => "plateform-wrapper w-3/5 h-full flex justify-center items-center",
        "Left" => "plateform-wrapper w-3/5 h-full flex justify-center items-center",
        "Top" => "plateform-wrapper w-full h-3/5 flex justify-center items-center",
        "Bottom" => "plateform-wrapper w-full h-3/5 flex justify-center items-center"
    };
    ?>
<div class='<?="section w-full flex ".$class ?>' id=<?=$section->id?>>
    <div class='<?=$child1Class?>'>
        <div class="title w-full h-1/4 flex justify-center items-center  ">
            <p class="text-3xl font-bold">
                <?= $section->title ?>
            </p>
        </div>
        <div class="body w-full h-3/4 p-5">
            <p class="text-2xl text-justify">
                <?= $section->body ?>
            </p>
        </div>
    </div>
    <div class='<?=$child2Class?>'>
        <div class="plateform bg-[#FEAE49]">
        </div>
    </div>
</div>
    <?php
endforeach;
?>

<div class="section services w-full flex h-[550px] pt-5" id="services">
    <div class='plateform-wrapper h-full w-1/2 flex justify-center items-center'>
        <div class="plateform ">
        </div>
    </div>
    <div class="service-content  h-full w-1/2 p-5">
        <div class="w-full text-center h-1/5">
            <p class="font-bold text-4xl ">Our Services</p>
        </div>
        <div class="w-full h-4/5">
        <?php
            $services = file_get_contents(ROOT.DIRECTORY_SEPARATOR.'App'.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.'services.json');
            $services = json_decode($services);

            $i = 0;
            foreach($services as $service): ?>
                <div class="service-card flex h-[120px] w-full rounded-md mb-2">
                    <div class="image-wrapper w-1/5 h-full">
                        <img class="object-fill w-full h-full" src=<?=$service->image?> alt="burj" width="100%" height="100%">
                    </div>
                    <div class="w-4/5 h-full text-left">
                        <div class="w-full h-1/3  flex justify-start items-center">
                            <p class="font-bold text-xl"><?=$service->title?></p>
                        </div>
                        <div class="w-full h-2/3  flex justify-center items-center">
                            <p class="w-full"><?=$service->body?></p>
                        </div>
                    </div>
                </div>
                <?php
            endforeach;
            ?>
        </div>
    </div>
</div>
<div class="section contact w-full flex  pt-5 bg-[#F6F2F2]" id="contact">
    <div class='plateform-wrapper  w-1/2 flex justify-center items-center min-h-max'>
        <div class="plateform ">
        </div>
    </div>
    <div class="contact-content  h-full w-1/2 p-5">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl p-10">
            <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <form class="space-y-5">
                    <div>
                        <label class="block text-gray-600 mb-1">Name</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Name">
                    </div>
                    <div>
                        <label class="block text-gray-600 mb-1">Email</label>
                        <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="you@example.com">
                    </div>
                    <div>
                        <label class="block text-gray-600 mb-1">Message</label>
                        <textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your message..."></textarea>
                    </div>
                    <button type="button" class="bg-[#57BEE6] text-white px-6 py-2 rounded-lg hover:bg-[#3D424A] transition">Send Message</button>
                </form>
            </div>

            <div class="flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Contact</h2>
                <ul class="space-y-4 text-gray-700">
                    <li>
                    <strong>📍 Address:</strong><br>
                    1234 Example Street, Suite 101<br>
                    Abu Dhabi, UAE 00000
                    </li>
                    <li>
                    <strong>📞 Phone:</strong><br>
                    +971 (000) 000-0000
                    </li>
                    <li>
                    <strong>📧 Email:</strong><br>
                    UAEvisit@gmail.com
                    </li>
                    <li>
                    <strong>⏰ Working Hours:</strong><br>
                    Mon - Fri: 9am – 5pm
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div id="container3D"></div>
<footer class="w-full h-[150px] bg-black text-white">
    <div class="w-full flex h-2/3">
        <div class="w-1/3 h-full flex items-center p-5">
            <p class="text-3xl">UAEVisit</p>
        </div>
        <div  class="w-2/3 h-full flex ">
            <div class="w-1/3 h-full flex items-center justify-end">
                <p for="">Subscribe for update</p>
            </div>
            <div class="w-2/3 flex items-center justify-center px-2">
                <div class="sub-input h-[55px] w-full border border-white  flex flex-row rounded-xl overflow-hidden">
                    <div  class="w-11/12 h-full p-1">
                        <input type="email" name="email" id="email"  class="w-full h-full text-white" placeholder="name@example.com...">
                    </div>
                    <div  class="w-1/12 p-1">
                        <button type="button" class="bg-[#FEAE49] w-full h-full rounded-[50%] ">-></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full h-1/3 text-center">
        <p>Copyright <?= date("Y")?> | all right reserved.</p>
    </div>
</footer>