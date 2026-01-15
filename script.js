// --- Smooth Scroll (Lenis) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const magnetics = document.querySelectorAll('.magnetic');

let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Immediate update for small cursor
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

// Magnetic Buttons Effect
magnetics.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        follower.classList.add('active');
        gsap.to(el, { duration: 0.3, scale: 1.1 });
    });
    el.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
        gsap.to(el, { duration: 0.3, scale: 1 });
        gsap.to(el, { x: 0, y: 0 });
    });

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Button moves slightly
        gsap.to(el, { duration: 0.3, x: x * 0.3, y: y * 0.3 });
    });
});

// --- Three.js Scene ---
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performant pixel ratio

// Object: Torus Knot Wireframe
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({
    color: 0x7000ff, // Accent color
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Particles System (Stars)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50; // Wide spread
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 30;

// Mouse Interaction for 3D
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    targetX = (event.clientX - windowHalfX) * 0.001;
    targetY = (event.clientY - windowHalfY) * 0.001;
});

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Lerp cursor follower for delay effect
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;

    // Rotate Torus
    torusKnot.rotation.y = elapsedTime * 0.2;
    torusKnot.rotation.z = elapsedTime * 0.1;

    // Interactive Rotation
    torusKnot.rotation.y += 0.5 * (targetX - torusKnot.rotation.y);
    torusKnot.rotation.x += 0.5 * (targetY - torusKnot.rotation.x);

    // Particles movement
    particles.rotation.y = -elapsedTime * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
const tl = gsap.timeline();
tl.from('.logo', { y: -50, opacity: 0, duration: 1 })
    .from('.nav-links li', { y: -50, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.5")
    .from('.hero-content h1', { y: 100, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.5")
    .from('.subtitle', { y: 50, opacity: 0, duration: 1 }, "-=1")
    .from('.cta-btn', { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5");

// Scroll Triggers
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2
    });
});
