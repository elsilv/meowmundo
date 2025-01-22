const purrIndicator = document.getElementById('purr-indicator');

export function startPurring(cat) {
    purrIndicator.style.display = 'block';
    animateCatPurring(cat);

    setTimeout(stopPurring, 5000);
}

function stopPurring() {
    purrIndicator.style.display = 'none';
}

function animateCatPurring(cat) {
    const originalScale = cat.scale.clone();

    const purringAnimation = setInterval(() => {
        cat.scale.set(
            originalScale.x * 1.02,
            originalScale.y * 1.02,
            originalScale.z * 1.02
        );
        setTimeout(() => {
            cat.scale.copy(originalScale);
        }, 500);
    }, 1000);

    setTimeout(() => {
        clearInterval(purringAnimation);
        cat.scale.copy(originalScale);
    }, 5000);
}
