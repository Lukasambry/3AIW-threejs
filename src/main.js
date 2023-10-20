import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';


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
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x69bdd7 });
  const cube = new THREE.Mesh(geo, material);

  scene.add(cube);
  transformControl.attach(cube);
}

function initControls() {
  const orbitControl = new OrbitControls(camera, renderer.domElement);
  orbitControl.update();

  const transformControl = new TransformControls(camera, renderer.domElement);
  transformControl.addEventListener('mouseDown', () => orbitControl.enabled = false);
  transformControl.addEventListener('mouseUp', () => orbitControl.enabled = true);

  const controlButtons = document.querySelectorAll('aside button');
  const canvas = document.querySelector('canvas');
  controlButtons.forEach((button) => {
    switch(button.className) {
      case 'move':
        button.addEventListener('click', () => {
          canvas.dataset.mode = 'translate';
          transformControl.setMode('translate')}
        );
        break;
      case 'rotate':
        button.addEventListener('click', () => {
          canvas.dataset.mode = 'rotate';
          transformControl.setMode('rotate')}
        );
        break;
      case 'scale':
        button.addEventListener('click', () => {
          canvas.dataset.mode = 'scale';
          transformControl.setMode('scale')}
        );
        break;
    }
  });

  scene.add(transformControl);
  return { orbitControl, transformControl };
}

const { scene, renderer } = initScene();

const camera = initCamera();
const { transformControl } = initControls();

addCude();

intRenderer();
