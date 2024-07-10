import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model, mixer;

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
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 3, 0);
    scene.add(light);



    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(modelPath, function (gltf) {
        model = gltf.scene;

        // Position and scale the model
        model.position.set(3.5, 0, 0);
        model.rotation.set(0, 0.5, 0);
        model.scale.set(0.75, 0.75, 0.75); // Adjust the scale values as needed
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
    

    renderer.render(scene, camera);
}

// Initialize the scene with the specified container ID and model path
init('three-container', '3dmodels/phonee.glb');
animate();
