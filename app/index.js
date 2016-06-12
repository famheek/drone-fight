import THREE from 'three';
import './STLLoader';
import './AMFLoader';

window.THREE = THREE;

var scene = window.scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var loader = new THREE.STLLoader();

let plane;

// loader.load('assets/plane.stl', function ( geometry ) {
//   scene.add( plane = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() ) );
//   window.plane = plane;
//   plane.scale.setScalar(10);
//   plane.rotation.z = Math.PI / 2;
//   plane.rotation.x = Math.PI / 2;
//   render();
// });

var loader = new THREE.AMFLoader();
loader.load('assets/plane.amf', function(objecttree) {
  scene.add(plane = objecttree);
  window.plane = plane;
  plane.scale.setScalar(1);
  // plane.rotation.z = Math.PI / 2;
  // plane.rotation.x = Math.PI / 2;
  render();
});

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 10;

var light = new THREE.PointLight( 0xffffffff, 1, 100 );
light.position.set( 0, 50, 20 );
scene.add( light );


function render() {
  plane.rotation.x += 0.01;

  renderer.render( scene, camera );

  requestAnimationFrame( render );
}
