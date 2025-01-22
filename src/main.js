import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { catInfoData } from './catInfoData.js';
import { startPurring } from './catPurring.js';
import { startPlay } from './catPlay.js'

const container = document.getElementById('container');
const catInfo = document.getElementById('cat-info');

const petButton = document.getElementById('pet-button');
const playButton = document.getElementById('play-button');

const renderer = createRenderer();
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = createGradientTexture();
scene.environment = createEnvironment();

const camera = createCamera();
camera.position.set(5, 2, 8);

const controls = createOrbitControls(camera, renderer.domElement);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

// List of cat model paths
const catModels = [
    'cat_sitting.glb',
    'cat_black.glb',
    'sphynx_cat.glb'
];

const randomCatModel = catModels[Math.floor(Math.random() * catModels.length)];
loadModel(randomCatModel);

window.onresize = onWindowResize;

renderer.setAnimationLoop(animate);

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

function createGradientTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'hsla(211, 66%, 87%, 1)');
    gradient.addColorStop(1, 'hsla(348, 67%, 88%, 1)');
    gradient.addColorStop(1, 'hsla(272, 26%, 72%, 1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
}

function createEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    return pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
}

function createCamera() {
    return new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
}

function createOrbitControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    controls.target.set(0, 1, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = false;
    return controls;
}

function loadModel(modelPath) {
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    document.getElementById('loading-heart').style.display = 'block';

    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            scene.add(model);

            document.getElementById('loading-heart').style.display = 'none';

            if (catInfoData[modelPath]) {
                const catData = catInfoData[modelPath];
                model.scale.copy(catData.scale);
                controls.target.copy(catData.target);
                if (catData.rotation) {
                    model.rotation.copy(catData.rotation);
                }

                updateCatInfo(catData.name, catData.personality, catData.favoriteActivity, catData.quirkyTrait);
            }

            petButton.addEventListener('click', () => startPurring(model));
            playButton.addEventListener('click', () => startPlay(model, renderer, scene, camera, animate));

            console.log('Model added');
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
            document.getElementById('loading-heart').style.display = 'none';
        }
    );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();
    renderer.render(scene, camera);
}

function updateCatInfo(name, personality, favoriteActivity, quirkyTrait) {
    catInfo.innerHTML = `
        <h2>Cat Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Personality:</strong> ${personality}</p>
        <p><strong>Favorite Activity:</strong> ${favoriteActivity}</p>
        <p><strong>Quirky Trait:</strong> ${quirkyTrait}</p>
    `;
}
