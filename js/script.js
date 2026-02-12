// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", function () {

    // ===== FONDO 3D SUAVE ROMÁNTICO =====
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById("three-container");
    container.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff
    });

    const particles = new THREE.Points(
        particlesGeometry,
        particlesMaterial
    );

    scene.add(particles);

    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});


// ===== FUNCIÓN DEL BOTÓN =====
function verificarFecha() {

    const fecha = document.getElementById("fecha").value;
    const mensaje = document.getElementById("mensaje");
    const musica = document.getElementById("musica");

    if (!fecha) {
        mensaje.innerHTML = "<p>Selecciona nuestra fecha 🤍</p>";
        return;
    }

    if (fecha === "2025-10-26") {

        // Música
        if (musica) {
            musica.play().catch(error => console.log(error));
        }

        // Mensaje romántico
        mensaje.innerHTML = `
            <div class="fade-in">
                <div class="heart">🤍</div>
                <h2>Desde el 26 de Octubre de 2025</h2>
                <p>Te amo mi Pulguita hermosa 🥺💕</p>
            </div>
        `;

        explosion();

    } else {
        mensaje.innerHTML = "<p style='color:white;'>Esa no es nuestra fecha 😜</p>";
    }
}


// ===== EXPLOSIÓN DE CORAZONES =====
function explosion() {

    for (let i = 0; i < 40; i++) {

        const corazon = document.createElement("div");
        corazon.innerHTML = "🤍";

        corazon.style.position = "fixed";
        corazon.style.left = "50%";
        corazon.style.top = "50%";
        corazon.style.fontSize = "20px";
        corazon.style.transform = "translate(-50%, -50%)";
        corazon.style.transition = "all 2s ease-out";
        corazon.style.pointerEvents = "none";

        document.body.appendChild(corazon);

        setTimeout(() => {
            corazon.style.left = Math.random() * 100 + "vw";
            corazon.style.top = Math.random() * 100 + "vh";
            corazon.style.opacity = 0;
        }, 50);

        setTimeout(() => {
            corazon.remove();
        }, 2000);
    }
}
