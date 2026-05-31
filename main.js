import * as THREE from "three";
import { World } from "./world.js";
import { Player } from "./player.js";

const canvas = document.getElementById("game");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

/* =========================
   Lighting
========================= */

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.6
);

scene.add(ambientLight);

const sun = new THREE.DirectionalLight(
    0xffffff,
    1.0
);

sun.position.set(
    50,
    100,
    50
);

scene.add(sun);

/* =========================
   World
========================= */

const world = new World(scene);

/* =========================
   Player
========================= */

const player = new Player(
    camera,
    world
);

/* =========================
   Pointer Lock
========================= */

const loadingScreen =
    document.getElementById("loading-screen");

loadingScreen.addEventListener(
    "click",
    () => {

        document.body.requestPointerLock();

        loadingScreen.classList.add(
            "hidden"
        );
    }
);

/* =========================
   Resize
========================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);

/* =========================
   Debug
========================= */

const debug =
    document.getElementById("debug");

/* =========================
   Game Loop
========================= */

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(
        animate
    );

    const delta =
        clock.getDelta();

    player.update(
        delta
    );

    debug.textContent =
        `X: ${player.position.x.toFixed(1)} ` +
        `Y: ${player.position.y.toFixed(1)} ` +
        `Z: ${player.position.z.toFixed(1)}`;

    renderer.render(
        scene,
        camera
    );
}

animate();
