// Smooth scrolling for navbar links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.for(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Your existing Three.js and video hover play/pause code here
import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'jsm/loaders/DRACOLoader.js';
import { AnimationMixer } from 'three';

let scene, camera, renderer, model, mixer, clock;

function init(containerId, modelPath) {
    // Create the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 0); // Position the camera on the Z-axis
    camera.lookAt(0, 0, 0); // Make the camera look at the origin (0, 0, 0)

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById(containerId).appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 0, 0).normalize();
    scene.add(light);

    // Load the GLTF model
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(modelPath, function (gltf) {
        model = gltf.scene;
        mixer = new AnimationMixer(model);

        // Set up animation
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });

        // Position and scale the model
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1); // Adjust the scale values as needed
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
    
    clock = new THREE.Clock();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
}

// Initialize the scene with the specified container ID and model path
init('three-container', '3dmodels/particleLogo.glb');
animate();

// Add video hover play/pause behavior
document.querySelectorAll('.card-video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
});
