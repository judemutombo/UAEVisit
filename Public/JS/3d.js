import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import {gsap} from 'gsap'

const gui = new dat.GUI();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( 
    window.innerWidth / - 2, 
    window.innerWidth / 2, 
    window.innerHeight / 2, 
    window.innerHeight / - 2, 
    1, 
    1000 
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



let plane;
const loader = new GLTFLoader();
loader.load("./Public/3D/plane_a340.glb",
    function (gltf){
        plane = gltf.scene;
        scene.add(plane);
        reportWindowSize();

        plane.traverse(function(node){
            if(node.isMesh){
                node.castShadow = true
                node.receiveShadow = true
            }
        })
        /* const planeFolder = gui.addFolder('plane scale');
        planeFolder.add(plane.position, 'x', -1000, 1000).step(0.1);
        planeFolder.add(plane.position, 'y', -100, 100).step(0.1);
        planeFolder.add(plane.position, 'z', -100, 100).step(0.1);
        planeFolder.open(); */
    },
    undefined, 
    function (error){
        console.log("Error loading GLTF:", error);
    }
);

addEventListener("wheel", (e)=>{
   /*  if(e.deltaY >= 0){
        camera.fov += 1
    }else{
        camera.fov -= 1
    }
    camera.fov = THREE.MathUtils.clamp(camera.fov, 10, 120);
    render3d(renderer, scene, camera) */
})

function render3d(renderer, scene, camera){
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

function renderLoop() {
    render3d(renderer, scene, camera)
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

function reportWindowSize() {
    if (plane && camera) { 
        let newWidth = window.innerWidth;

        let scaleFactor = getScaleFactor();
        plane.scale.set(scaleFactor, scaleFactor, scaleFactor);
        plane.rotation.set(
            THREE.MathUtils.degToRad(90),
            THREE.MathUtils.degToRad(-90),
            plane.rotation.z
        );
        fly(1)
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