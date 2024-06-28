import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

init();
animate();

function init() {
    // Create the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 0, 0).normalize();
    scene.add(light);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('3dmodels/betterlaptop.glb', function (gltf) {
        model = gltf.scene;
        
        // Position and scale the model
        model.position.set(2, -1, 1);
        model.rotation.set(0, -1, 0);
        model.scale.set(1, 1, 1); // Adjust the scale values as needed
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the model
    if (model) {
        model.rotation.y += 0.005; // Adjust the rotation speed as needed
    }

    renderer.render(scene, camera);
}
