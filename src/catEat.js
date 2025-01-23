import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons";

const eatIndicator = document.getElementById('eat-indicator');
let turkeyModel = null;
export function startEat(scene, catModel) {
    eatIndicator.style.display = 'block';
    addTurkeyModel(scene, catModel);

    setTimeout(() => stopEat(scene), 5000);
}

function stopEat(scene) {
    eatIndicator.style.display = 'none';

    if (turkeyModel) {
        scene.remove(turkeyModel);
        turkeyModel = null;
    }
}

const addTurkeyModel = (scene, catModel) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('turkey_texture.mtl', (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            'turkey.obj',
            (object) => {
                object.scale.set(0.02, 0.02, 0.02);

                // If the cat model is already loaded, position the turkey relative to it
                if (catModel) {
                    object.position.set(catModel.position.x + 2, catModel.position.y, catModel.position.z + 0.1);
                } else {
                    object.position.set(0, 0, 0);
                }

                turkeyModel = object;
                scene.add(object);
            },
            (xhr) => {
            },
            (error) => {
                console.error('Error loading OBJ:', error);
            }
        );
    });
};
