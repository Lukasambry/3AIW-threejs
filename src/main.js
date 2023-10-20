import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function initScene() {
  const scene = new THREE.Scene()

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return { scene, renderer };
}

function initCamera() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  return camera;
}

function intRenderer() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  requestAnimationFrame(intRenderer);
  renderer.render(scene, camera);
}

function addCude() {
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x69bdd7 });
  return new THREE.Mesh(cube, material);
}

function initControls() {
  const orbitControl = new OrbitControls(camera, renderer.domElement);
  orbitControl.update();

  return { orbitControl };
}

const { scene, renderer } = initScene();

const camera = initCamera();

const cube = addCude();
scene.add(cube);

intRenderer();
initControls();