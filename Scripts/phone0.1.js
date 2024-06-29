import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

function init(containerId, modelPath) {
    // Create the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById(containerId).appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(3, 2, 0).normalize();
    scene.add(light);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(modelPath, function (gltf) {
        model = gltf.scene;

        // Position and scale the model
        model.position.set(0, 0, -1);
        model.rotation.set(0, 0, 0.5);
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

// Initialize the scene with the specified container ID and model path
init('three-container', '3dmodels/particlephone.glb');
animate();
