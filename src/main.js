import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const container = document.getElementById('container');
const catInfo = document.getElementById('cat-info');

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

loadModel('cat_sitting.glb');

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

    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            model.position.set(1, 1, 0);
            model.scale.set(0.02, 0.02, 0.02);
            scene.add(model);

            updateCatInfo('Whiskers', 'Curious, Playful, Mischievous', 'Chasing laser pointers');
            console.log('Model added');
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
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

function updateCatInfo(name, personality, favoriteActivity) {
    catInfo.innerHTML = `
        <h2>Cat Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Personality:</strong> ${personality}</p>
        <p><strong>Favorite Activity:</strong> ${favoriteActivity}</p>
    `;
}
