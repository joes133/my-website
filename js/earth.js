// Three.js Earth Animation
let scene, camera, renderer, earth, stars;
let animationId;
let earthLoaded = false;

// Initialize
function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create Earth
    createEarth();

    // Create Stars
    createStars();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        
        // Show intro text after earth appears
        setTimeout(() => {
            document.getElementById('intro-text').classList.add('visible');
            
            // Show enter button
            setTimeout(() => {
                document.getElementById('enter-btn').classList.add('visible');
            }, 2000);
        }, 1000);
    }, 1500);

    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onWindowResize, false);

    // Enter button click
    document.getElementById('enter-btn').addEventListener('click', () => {
        // Play sound (if exists)
        const audio = new Audio('assets/sounds/enter.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Transition to library
        transitionToLibrary();
    });
}

// Create Earth
function createEarth() {
    // Earth geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Create a procedural earth texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Ocean background
    ctx.fillStyle = '#1a4d7a';
    ctx.fillRect(0, 0, 1024, 512);

    // Add some "continents" (simplified shapes)
    ctx.fillStyle = '#2d5a3d';
    
    // Asia (including China area)
    ctx.beginPath();
    ctx.ellipse(700, 200, 150, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(500, 180, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(520, 300, 70, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // North America
    ctx.beginPath();
    ctx.ellipse(250, 200, 100, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(300, 350, 50, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(820, 350, 40, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Add some cloud-like effects
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const radius = Math.random() * 30 + 10;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    
    // Material
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpScale: 0.05,
        specular: new THREE.Color('grey'),
        shininess: 10
    });

    // Earth mesh
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    earthLoaded = true;
}

// Create Stars
function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// Animation
function animate() {
    animationId = requestAnimationFrame(animate);

    if (earth) {
        earth.rotation.y += 0.002;
    }

    if (stars) {
        stars.rotation.y += 0.0001;
    }

    renderer.render(scene, camera);
}

// Window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Transition to library
function transitionToLibrary() {
    // Fade out effect
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
    loading.style.background = '#000';

    setTimeout(() => {
        window.location.href = 'library.html';
    }, 1000);
}

// Start
init();
