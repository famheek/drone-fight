import three from 'three';
import queryString from 'query-string';
import Keyboard from './keyboard';

let keyboard = new Keyboard();
console.log(keyboard)

let search = queryString.parse(location.search);

if (search.model) {
  System.import(search.model).then((model) => {
    model = model.default();

    window.model = model;
    scene.add(model);

    camera.lookAt(model);

    render();

    console.log('model loaded');
  });
}

import THREE from 'three';

window.THREE = THREE;

var scene = window.scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 10;

var light = new THREE.PointLight( 0xffffff, 1, 1000 );
light.position.set( 50, 50, 50 );
scene.add( light );


function render() {
  camera.lookAt(model);
  renderer.render( scene, camera );

  if (keyboard.pressed('left')) {
    model.rotation.y -= 0.1;
  }
  if (keyboard.pressed('right')) {
    model.rotation.y += 0.1;
  }
  if (keyboard.pressed('up')) {
    model.rotation.x -= 0.1;
  }
  if (keyboard.pressed('down')) {
    model.rotation.x += 0.1;
  }

  requestAnimationFrame( render );
}
