import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xf71156 });
const torus = new THREE.Mesh(geometry, material);

// ff6347
scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./Images/space.jpg');
scene.background = spaceTexture;

// Avatar

const jasTexture = new THREE.TextureLoader().load('./Images/avatar.jpg');

const jas = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jasTexture }));

scene.add(jas);

// earth 
const earthTexture = new THREE.TextureLoader().load('./Images/earth.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 31, 31),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);

scene.add(earth);

earth.position.z = 20;
earth.position.setX(-5);

// Moon
const moonTexture = new THREE.TextureLoader().load('./Images/moon.jpg');
const surfaceTexture = new THREE.TextureLoader().load('./Images/surface.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 20, 20),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: surfaceTexture,
  })
);

scene.add(moon);

moon.position.z = 25;
moon.position.setX(-9);


// mars
const marsTexture = new THREE.TextureLoader().load('./Images/mars.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3.5, 33, 33),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

scene.add(mars);

mars.position.z = 33;
mars.position.setX(-20);


// jupiter
const jupiterTexture = new THREE.TextureLoader().load('./Images/jupiter.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(8, 37, 37),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);

scene.add(jupiter);

jupiter.position.z = 50;
jupiter.position.setX(-40);


// venus
const venusTexture = new THREE.TextureLoader().load('./Images/venus.jpg');
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(9,48, 48),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);

scene.add(venus);

venus.position.z = 100;
venus.position.setX(-50);

// neptune
const neptuneTexture = new THREE.TextureLoader().load('./Images/neptune.jpg');
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(10,40,40),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);

scene.add(neptune);

neptune.position.z = 160;
neptune.position.setX(-60);

// **********************************************************************

jas.position.z = -5;
jas.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  venus.rotation.x += 0.05;
  venus.rotation.y += 0.075;
  venus.rotation.z += 0.05;

  neptune.rotation.x += 0.05;
  neptune.rotation.y += 0.075;
  neptune.rotation.z += 0.05;

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  jas.rotation.x += 0.05;
  jas.rotation.y += 0.01;
  jas.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  jupiter.rotation.x += 0.005;
  earth.rotation.x += 0.005;
  mars.rotation.x += 0.005;
  venus.rotation.x += 0.005;
  neptune.rotation.x += 0.005;
  jas.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();