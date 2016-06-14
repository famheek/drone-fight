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


let plane = window.plane = new Plane(createPlane());
scene.add(plane.mesh);

let updateQueue = [];

render();

function render() {
  requestAnimationFrame( render );
  update();
  renderer.render( scene, camera );
}

function update() {
  for (let i = 0; i < updateQueue.length; i++) {
    let callback = updateQueue[i];
    if (typeof callback === 'function') {
      callback();
    } else {
      callback.update();
    }
  }


}

const AIR_RESISTANCE = 0.1;

class Plane {
  constructor(mesh) {
    this.mesh = mesh;
    this.position = mesh.position;
    this.velocity = new THREE.Vector3(0,0,0);
    this.acceleration = new THREE.Vector3(0,0,0);
    this.engineForce = new THREE.Vector3(0,0,0);
    this.airResistance = new THREE.Vector3(0,0,0);
  }

  update() {
    this.airResistance.copy(this.velocity).normalize().multiplyScalar(-AIR_RESISTANCE);
    // update position
    this.acceleration.addVectors(this.engineForce, this.airResistance);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    plane.mesh.getWorldPosition(camera.position);
    camera.position.z = 10;

    camera.lookAt(plane.mesh);
  }
}
