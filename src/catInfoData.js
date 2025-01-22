import * as THREE from 'three';

export const catInfoData = {
    'cat_sitting.glb': {
        name: 'Loki',
        personality: 'Serious, mysterious, and a bit of a lone wolf—until you win him over.',
        favoriteActivity: 'Solving puzzles or exploring new areas in the house. Loki loves a good challenge.',
        quirkyTrait: 'He occasionally raises an eyebrow as if he’s judging the situation, but deep down, he cares.',
        scale: new THREE.Vector3(0.025, 0.025, 0.025),
        target: new THREE.Vector3(0, 0, 0)
    },
    'cat_black.glb': {
        name: 'Nimbus',
        personality: 'Deep thinker with a touch of sadness. He’s a softie once you get past the gloom.',
        favoriteActivity: 'Watching the rain and contemplating life.',
        quirkyTrait: 'Stares off into space, probably plotting world domination... or a nap.',
        scale: new THREE.Vector3(0.15, 0.15, 0.15),
        target: new THREE.Vector3(0, 1.2, 0)
    },
    'sphynx_cat.glb': {
        name: 'Zippy',
        personality: 'Always ready for an adventure! Never without his trusty backpack, even if it’s just to the kitchen.',
        favoriteActivity: 'Exploring new places (or hiding treats in his backpack).',
        quirkyTrait: 'She loves to sunbathe and has a special spot by the window to soak up every ray of sunlight.',
        scale: new THREE.Vector3(5.0, 5.0, 5.0),
        target: new THREE.Vector3(0, 0.1, 0)
    }
};
