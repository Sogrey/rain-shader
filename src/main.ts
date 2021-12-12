import './style.css';
import * as THREE from 'three';
import rainVertShader from './rain.vert.glsl?raw';
import rainFragShader from './rain.frag.glsl?raw';
import imageUrl from './background.jpg';

const app = document.querySelector<HTMLDivElement>('#app')!;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = await textureLoader.loadAsync(imageUrl);

const aspectRatio = texture.image.height / texture.image.width;
console.log(aspectRatio);
const planeHeight = 10;
const planeWidth = planeHeight / aspectRatio;

const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 1, 1);

texture.image;
const material = new THREE.ShaderMaterial({
  vertexShader: rainVertShader,
  fragmentShader: rainFragShader,
  uniforms: {
    u_time: { value: 0 },
    u_texture: { value: texture },
  },
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animationFrame(time: number) {
  cube.material.uniforms.u_time.value = time / 1000;
  renderer.render(scene, camera);
  requestAnimationFrame(animationFrame);
}
requestAnimationFrame(animationFrame);
