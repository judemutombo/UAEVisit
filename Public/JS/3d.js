import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import {gsap} from 'gsap';

const gui = new dat.GUI();

//floating and travelling plane
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( 
    window.innerWidth / - 2,window.innerWidth / 2, 
    window.innerHeight / 2, window.innerHeight / - 2, 
    1, 1000 
);

camera.position.z = 50

const renderer = new THREE.WebGLRenderer({alpha : true})
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
scene.add(ambientLight)

const topLight = new THREE.DirectionalLight(0x22ffff, 1, 100)
topLight.position.set(-500, 500, 50)
topLight.castShadow = true

topLight.shadow.mapSize.width = window.innerWidth;
topLight.shadow.mapSize.height = window.innerHeight;
topLight.shadow.camera.near = 0.5;
topLight.shadow.camera.far = 500
scene.add(topLight)

//taking off plane

const airportScene = new THREE.Scene();
const airportCamera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight,
    0.1, 10000
);
const ambientLight2 = new THREE.AmbientLight(0xffffff, 1.3)
airportScene.add(ambientLight2)

const topLight2 = new THREE.DirectionalLight(0x22ffff, 1, 100)
topLight2.position.set(-500, 500, 50)
topLight2.castShadow = true

topLight2.shadow.mapSize.width = window.innerWidth;
topLight2.shadow.mapSize.height = window.innerHeight;
topLight2.shadow.camera.near = 0.5;
topLight2.shadow.camera.far = 500
airportScene.add(topLight2)

airportCamera.position.z = 250
const airportRenderer = new THREE.WebGLRenderer({alpha : true})
document.getElementById('airport').appendChild(airportRenderer.domElement);

//logic

let plane;
let plane2;
const loader = new GLTFLoader();
loader.load("./Public/3D/plane_a340.glb",
    function (gltf){
        plane = gltf.scene;
        plane2 = gltf.scene.clone(true);
        scene.add(plane);
        airportScene.add(plane2)
        reportWindowSize(plane, camera);
        reportWindowSize2(plane2, airportCamera);

        plane.traverse(function(node){
            if(node.isMesh){
                node.castShadow = true
                node.receiveShadow = true
            }
        })

        plane2.traverse(function(node){
            if(node.isMesh){
                node.castShadow = true
                node.receiveShadow = true
            }
        })
    },
    undefined, 
    function (error){
        console.log("Error loading GLTF:", error);
    }
);


function render3d(renderer, scene, camera){
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

function renderLoop() {
    render3d(renderer, scene, camera)
    render3d(airportRenderer, airportScene, airportCamera)
	requestAnimationFrame( renderLoop );
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
}

renderLoop()

window.addEventListener("resize", (e) =>{
    resize()
})

function getScaleFactor() {
    let screenWidth = window.innerWidth;
    if (screenWidth < 640) {
        return 0.06;  
    } else if (screenWidth >= 640 && screenWidth < 1024) {
        return 0.1;  
    } else {
        return 0.1;  
    }
}

function reportWindowSize(object, cam) {
    if (object && cam) { 
        let scaleFactor = getScaleFactor();
        object.scale.set(scaleFactor, scaleFactor, scaleFactor);
        object.rotation.set(
            THREE.MathUtils.degToRad(90),
            THREE.MathUtils.degToRad(-90),
            object.rotation.z
        );
        fly(1)
    }
}

function buildAirport(scene){
    const trailGeometry = new THREE.PlaneGeometry(200, 20000)
    const trailMaterial = new THREE.MeshBasicMaterial({color : "black"})
    const trailMesh = new THREE.Mesh(trailGeometry, trailMaterial)
    scene.add(trailMesh)
    trailMesh.rotation.set(THREE.MathUtils.degToRad(-85), 0, 0)
    trailMesh.position.set(0, 0, -425)
/*     const planeFolder = gui.addFolder('plane scale');
    planeFolder.add(trailMesh.rotation, 'x', -1000, 1000).step(0.1);
    planeFolder.add(trailMesh.rotation, 'y', -100, 100).step(0.1);
    planeFolder.add(trailMesh.rotation, 'z', -100, 100).step(0.1);
    planeFolder.open(); */
}

function reportWindowSize2(object, cam){
    if (object && cam) { 
        let scaleFactor = getScaleFactor();
        object.scale.set(scaleFactor, scaleFactor, scaleFactor);
        object.rotation.set(
            0,
            THREE.MathUtils.degToRad(-90),
            0
        );
        object.position.set(0, 18, -425)
        buildAirport(airportScene)
    }
}

let Coordinates = [
    {
        id: 'panel',
        position:{x: -(window.innerWidth/3), y: 70, z: 0}
    },
    {
        id: 'explore',
        position:{x: window.innerWidth / 4, y: 70, z: 0}
    },
    {
        id: 'discover',
        position:{x: -(window.innerWidth / 4), y: 70, z: 0}
    },
    {
        id: 'travel',
        position:{x: window.innerWidth / 4, y: 70, z: 0}
    },
    {
        id: 'business',
        position:{x: window.innerWidth / 4, y: 70, z: 0}
    },
    {
        id: 'way',
        position:{x: -7, y: 70, z: 0}
    },
    {
        id: 'services',
        position:{x: -(window.innerWidth / 4), y: 70, z: 0}
    },
    {
        id: 'contact',
        position:{x: -(window.innerWidth / 4), y: 70, z: 0}
    },
]

const fly = function(direction){
    const sections = document.querySelectorAll(".section")
    let currentSection
    sections.forEach((section)=>{
        const rect = section.getBoundingClientRect();
        if(direction == 1){
            if(rect.top >= 0 && rect.top <= window.innerHeight / 3){
                currentSection = section.id
            }
            console.log("top : ", section.id, " ", rect.top)

        }else{
            if(rect.bottom >= 0 && rect.top <= window.innerHeight / 2){
                currentSection = section.id
            }
            console.log("bottom : ", section.id, " ", rect.bottom)
        }
    })

    const active_coordinate = Coordinates.findIndex( (val) => val.id == currentSection) 
    if(active_coordinate >= 0){
        const new_coordinate = Coordinates[active_coordinate].position
        gsap.to(plane.position, {
            x: new_coordinate.x,
            y: new_coordinate.y,
            z: new_coordinate.z,
            duration : 1,
            ease : "power1.out"
        })
        gsap.to(plane.rotation, {
            y:  direction === 1 ? -Math.PI / 2 : Math.PI / 2,
            duration : 0.5,
            ease : "power1.out"

        })
    }
}

window.addEventListener('wheel', (e)=>{
    if(plane){
        const direction = e.deltaY > 0 ? 1 : -1;
        fly(direction)
    }
})
$('.links').on('click', function (e) {
    e.preventDefault(); 

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    const currentScroll = $(window).scrollTop();
    const targetScroll = targetSection.offsetTop - 30;

    const direction = (targetScroll > currentScroll) ? 1 : -1;
    fly(direction); 

    $('html, body').animate({
        scrollTop: targetScroll
    }, 800, function() {
        fly(direction); 
    });
});


