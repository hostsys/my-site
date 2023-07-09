import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// import './assets/main.css'
import './index.css';
import './assets/main.css';

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

// BACKGROUND SCENE START

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const bgScene = new THREE.Scene();

// shape

// const geometry = new THREE.SphereGeometry(6, 8, 8);
// const material = new THREE.MeshStandardMaterial({
//   color: 'red',
// });
// const mesh = new THREE.Mesh(geometry, material);
// bgScene.add(mesh);
const bgGeometry = new THREE.BufferGeometry();
const positions = [];
for (let i = 0; i < 3000; i++) {
  const particle = new THREE.Vector3(
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * 600 - 300
  );

  particle.velocity = 0;
  particle.acceleration = 0.02;
  positions.push(particle.x, particle.y, particle.z);
  // bgGeometry.vertices.push(particles);
  bgGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );
}

// import './public/star-texture.png';
const bgTexture = new THREE.TextureLoader().load('star-texture.png');
const bgMaterial = new THREE.PointsMaterial({
  color: 'white',
  size: 1,
  map: bgTexture,
});
const stars = new THREE.Points(bgGeometry, bgMaterial);
bgScene.add(stars);

// camera

// const bgCamera = new THREE.PerspectiveCamera(
//   45,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
const bgCamera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  1,
  1000
);
bgCamera.position.z = 1;
bgCamera.rotation.x = Math.PI / 2;
bgScene.add(bgCamera);

// light

// const bgLight = new THREE.PointLight(0xffffff, 1, 15);
// bgLight.position.set(0, 0, 10);
// bgScene.add(bgLight);

// renderererer
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(bgScene, bgCamera);

// resize
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // tell the camera
  bgCamera.aspect = sizes.width / sizes.height;
  bgCamera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// rotation q and e
// press
let rotateLeft = false;
let rotateRight = false;

window.addEventListener('keydown', (downEvent) => {
  //case of q
  if (downEvent.key === 'q' || downEvent.key === 'Q') {
    rotateLeft = true;
  } //case of e
  else if (downEvent.key === 'e' || downEvent.key === 'E') {
    rotateRight = true;
  }
});
// release
window.addEventListener('keyup', (upEvent) => {
  //case of q
  if (upEvent.key === 'q' || upEvent.key === 'Q') {
    rotateLeft = false;
  } //case of e
  else if (upEvent.key === 'e' || upEvent.key === 'E') {
    rotateRight = false;
  }
});
// rerenderer

// let lookingRight = true;
const bgAnimate = (t) => {
  // TWEEN.update(t);
  const positions = bgGeometry.getAttribute('position').array;

  for (let i = 0; i < positions.length; i += 3) {
    let x = positions[i];
    let y = positions[i + 1];
    let z = positions[i + 2];

    y -= 0.5;

    if (y < -200) {
      y = 400;
    }
    positions[i + 1] = y; // Update the modified y-coordinate
  }
  // star rotation controls
  if (rotateLeft == true) {
    stars.rotation.y -= 0.01;
  } else if (rotateRight == true) {
    stars.rotation.y += 0.01;
  } // else stars.rotation.y = 0;

  // // camera automation
  // if (lookingRight) {
  //   if (stars.rotation.z < 0.3) {
  //     stars.rotation.z += 0.0002;
  //   } else {
  //     lookingRight = false;
  //   }
  // } else {
  //   if (stars.rotation.z > -0.3) {
  //     stars.rotation.z -= 0.0002;
  //   } else lookingRight = true;
  // }

  bgGeometry.getAttribute('position').needsUpdate = true;
  renderer.render(bgScene, bgCamera);
  window.requestAnimationFrame(bgAnimate);
};
bgAnimate();

// BACKGROUND SCENE END, MENU SCENE BEGIN

// sizes
const eyeSizes = {
  width: 150,
  height: 150,
};

// scene
const eyeScene = new THREE.Scene();

// shape
const eyeShape = new THREE.IcosahedronGeometry(2, 0, 0);
const eyeMaterial = new THREE.MeshStandardMaterial({
  color: 'white',
});
const eyeMesh = new THREE.Mesh(eyeShape, eyeMaterial);

const eyeOrigin = new THREE.Vector3(0, 0, 0);
eyeMesh.position.x = 0;
eyeMesh.position.z = 0;
eyeMesh.lookAt(eyeOrigin);

eyeScene.add(eyeMesh);

// camera
const eyeCamera = new THREE.PerspectiveCamera(
  30,
  eyeSizes.width / eyeSizes.height,
  0.1,
  100
);
eyeCamera.position.z = 10;

eyeScene.add(eyeCamera);

// light
const eyeLight = new THREE.PointLight(0xffffff, 0.5);
eyeLight.position.set(0, 0, 10);

eyeScene.add(eyeLight);

// mouse move anim

window.addEventListener('mousemove', onmousemove, false);

const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const intersectPoint = new THREE.Vector3();

function onmousemove(event) {
  setTimeout(function () {
    // const startRotation = eyeMesh.quaternion.clone();

    mouse.x = (event.clientX / sizes.width) * 75 - 37.5;
    mouse.y = -(event.clientY / sizes.height) * 75 + -10;
    raycaster.setFromCamera(mouse, eyeCamera);
    raycaster.ray.intersectPlane(plane, intersectPoint);
    intersectPoint.z = 100; // so that the object is still always facing the camera which has a position.z of 100 too
    // eyeMesh.lookAt(intersectPoint);

    // backup original rotation
    var startRotation = new THREE.Euler().copy(eyeMesh.rotation);

    // final rotation (with lookAt)
    eyeMesh.lookAt(intersectPoint);
    var endRotation = new THREE.Euler().copy(eyeMesh.rotation);

    // revert to original rotation
    eyeMesh.rotation.copy(startRotation);

    const eyeTween = new TWEEN.Tween(eyeMesh.rotation)
      .to({ x: endRotation.x, y: endRotation.y, z: endRotation.z }, 250)
      .easing(TWEEN.Easing.Quadratic.Out);
    eyeTween.start();
  });
}

// color change on hover
// get header child elements
const header = document.getElementById('header').children;

// loop through header children
for (let i = 0; i < header.length; i++) {
  const parent = header[i];
  // loop through header children's children
  for (let j = 0; j < parent.children.length; j++) {
    const child = parent.children[j];
    // mouseover event
    child.addEventListener('mouseover', function () {
      const itemID = this.id;
      // color cases
      switch (itemID) {
        case 'home':
          eyeMaterial.color.set('purple');
          break;

        case 'portfolio':
          eyeMaterial.color.set('blue');
          break;

        case 'music':
          eyeMaterial.color.set('yellow');
          break;

        case 'gallery':
          eyeMaterial.color.set('green');
          break;

        default:
          eyeMaterial.color.set('white');
      }
    });
    // mouseout event, default color
    child.addEventListener('mouseout', function () {
      const itemID = this.id;
      eyeMaterial.color.set('white');
    });
  }
}

// // hover listener
// abt.addEventListener('mouseover', abt_Color);
// // hover exit listener
// abt.addEventListener('mouseout', abt_Out);

// const col3 = document.getElementById('hcol3');
// // hover listener
// col3.addEventListener('mouseover', mouseOver3);
// // hover exit listener
// col3.addEventListener('mouseout', mouseOut3);

// function abt_Color() {
//   eyeMaterial.color.set('red');
//   console.log('apple');
// }

// function abt_Out() {
//   eyeMaterial.color.set('white');
//   console.log('orange');
// }

// function mouseOver3() {
//   eyeMaterial.color.set('blue');
//   console.log('apple');
// }

// function mouseOut3() {
//   eyeMaterial.color.set('white');
//   console.log('orange');
// }

// renderererer
const eyeBox = document.querySelector('#eyebox');
const eyeRenderer = new THREE.WebGLRenderer({ canvas: eyeBox, alpha: true });

eyeRenderer.setSize(eyeSizes.width, eyeSizes.height);
eyeRenderer.render(eyeScene, eyeCamera);

// anims
const eyeLoop = (t) => {
  TWEEN.update(t);
  //eyeMesh.rotation.x -= 0.01;
  eyeRenderer.render(eyeScene, eyeCamera);
  window.requestAnimationFrame(eyeLoop);
};

eyeLoop();

// sfx

document.querySelector('#home').addEventListener('mouseenter', mouseOverSFX);
document
  .querySelector('#portfolio')
  .addEventListener('mouseenter', mouseOverSFX);
document.querySelector('#music').addEventListener('mouseenter', mouseOverSFX);
document.querySelector('#gallery').addEventListener('mouseenter', mouseOverSFX);

let audioArr = document.getElementsByTagName('audio');

function mouseOverSFX() {
  audioArr[0].play();
  audioArr[0].volume = 0.02;
}

document.querySelector('#home').addEventListener('click', mouseClickSFX);
document.querySelector('#portfolio').addEventListener('click', mouseClickSFX);
document.querySelector('#music').addEventListener('click', mouseClickSFX);
document.querySelector('#gallery').addEventListener('click', mouseClickSFX);

function mouseClickSFX() {
  audioArr[1].play();
  audioArr[1].volume = 0.02;
}

// percent scroll

let percent = document.getElementById('percent');

document.addEventListener('DOMContentLoaded', function () {
  let content = document.getElementById('content');
  let children = content.children;
  let totalHeight = Array.from(children).reduce(function (height, child) {
    return height + child.scrollHeight;
  }, 0);
  console.log(totalHeight);
  content.onscroll = function () {
    let scrollDistance = content.scrollTop;
    let maxScrollDistance = content.scrollHeight - content.clientHeight;
    let progress = (scrollDistance / maxScrollDistance) * 100;
    progress = Math.max(0, Math.min(100, progress));
    percent.innerHTML = Math.round(progress) + '%';
    console.log(Math.round(progress));

    switch (progress) {
      case 0:
        percent.style.display = 'none';
        break;
      case 100:
        percent.style.color = 'grey';
        break;
      default:
        percent.style.display = 'block';
        percent.style.color = 'white';
    }
  };
});
