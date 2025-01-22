import * as THREE from 'three';

let laserDot = null;
let laserAnimation = null;
let isPlaying = false;

export function startPlay(model, renderer, scene, camera, animate) {
    if (isPlaying) return;
    isPlaying = true;

    const laserGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const laserMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    laserDot = new THREE.Mesh(laserGeometry, laserMaterial);
    scene.add(laserDot);

    animateLaserDot();
    moveCatToLaser(model, renderer, scene, camera, animate);
}

function endPlay(scene) {
    if (!isPlaying) return;
    isPlaying = false;

    if (laserDot) {
        scene.remove(laserDot);
        laserDot = null;
    }

    clearInterval(laserAnimation);
    laserAnimation = null;
}

function animateLaserDot() {
    if (laserAnimation) clearInterval(laserAnimation);

    laserAnimation = setInterval(() => {
        const x = (Math.random() - 0.5) * 10;
        const y = 0.5;
        const z = (Math.random() - 0.5) * 10;

        if (laserDot) laserDot.position.set(x, y, z);
    }, 500);
}

function moveCatToLaser(catModel, renderer, scene, camera, animate) {
    const targetPosition = new THREE.Vector3();

    function followLaser() {
        if (!laserDot || !isPlaying) return;
        targetPosition.copy(laserDot.position);
        catModel.position.lerp(targetPosition, 0.05);
        catModel.lookAt(laserDot.position);
    }

    renderer.setAnimationLoop(() => {
        followLaser();
        renderer.render(scene, camera);
    });

    setTimeout(() => {
        endPlay(scene);
        renderer.setAnimationLoop(animate);
    }, 5000);
}