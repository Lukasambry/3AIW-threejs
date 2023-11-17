import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


// const gui = new GUI();

function initScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1D1D1D);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return { scene, renderer };
}

function addLights() {
  const positions = [
    { x: 0, y: 1, z: 1 },
    { x: 0, y: 1, z: -1 },
    { x: 1, y: 1, z: 0 },
    { x: -1, y: 1, z: 0 },
  ];

  positions.forEach((position, idx) => {
    const light = new THREE.DirectionalLight(0xFFFFFF, 10);
    light.position.set(position.x, position.y, position.z);

    const lightHelper = new THREE.DirectionalLightHelper(light, 1);
    // light.add(lightHelper);

    // const lightFolder = gui.addFolder(`DirectionalLight ${idx+1}`);
    // lightFolder.add(light.position, 'x', -10, 10);
    // lightFolder.add(light.position, 'y', -10, 10);
    // lightFolder.add(light.position, 'z', -10, 10);

    scene.add(light);
  });

}

function initCamera() {
  const camera = new THREE.PerspectiveCamera(75, (window.innerWidth) / window.innerHeight, 0.01, 1000);
  camera.position.z = 0.01;
  camera.position.y = 0.1;
  camera.position.x = 0.1;

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
  // orbitControl.enableZoom = false;
  orbitControl.enablePan = true;
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

function loadModel() {
  let initialPosition = window.scrollY || window.pageYOffset;
  const loader = new GLTFLoader().setPath('/models/gltf/tiny_house/');
  loader.load('stylized_medieval_house.gltf', (model) => {
    // const houseFolder = gui.addFolder(`House`);
    // houseFolder.add(model.scene.position, 'x', -10, 10);
    // houseFolder.add(model.scene.position, 'y', -10, 10);
    // houseFolder.add(model.scene.position, 'z', -10, 10);
    // transformControl.attach(model.scene);
    model.scene.position.set(0, 0, -0.08);

    document.addEventListener('scroll', event => {
      const position = window.scrollY || window.pageYOffset;
      model.scene.rotation.y = initialPosition < position
      ? model.scene.rotation.y - 0.0001*position
      : model.scene.rotation.y + 0.0001*position;
      initialPosition = position;
    });
    
    scene.add(model.scene);
  });
}

const { scene, renderer } = initScene();

const camera = initCamera();
const { transformControl } = initControls();
addLights();

// addCude();
loadModel();

intRenderer();

