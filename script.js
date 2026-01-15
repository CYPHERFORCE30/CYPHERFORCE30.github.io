// Setup Three.js Scene
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const geometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Spread particles
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x7000ff,
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation Loop
camera.position.z = 3;

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate entire system slightly
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Interactive movement
    particlesMesh.rotation.y += mouseX * 0.0001;
    particlesMesh.rotation.x += mouseY * 0.0001;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from('.hero-content h1', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.hero-content .subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.8
});

gsap.from('.cta-btn', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'elastic.out(1, 0.3)',
    delay: 1.1
});

// Scroll Animations
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.1
    });
});

gsap.from('.about-section .glass-panel', {
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
});
