import THREE from 'three';
import createPlane from './models/plane';

window.THREE = THREE;

var scene = window.scene = new THREE.Scene();
var camera = window.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var light = new THREE.PointLight( 0xffffffff, 1, 100 );
light.position.set( 0, 50, 20 );
scene.add( light );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


let plane = window.plane = createPlane();
scene.add(plane);

render();

function render() {
  requestAnimationFrame( render );
  update();
  renderer.render( scene, camera );
}

function update() {
  plane.getWorldPosition(camera.position);
  camera.position.z = 10;

  camera.lookAt(plane);

  
}
