
import THREE from 'three';
import * as CSG from '../threeCSG';

export function bsp(geometry, {position = [0,0,0], scale = [1,1,1], rotation=[0,0,0]} = {}) {
  var mesh = new THREE.Mesh( geometry );
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.rotation.set(...rotation);
  var bsp = new ThreeBSP( mesh );
  return bsp;
}

export function cube(x, y, z, transform) {
  var cube = new THREE.CubeGeometry( x, y, z );
  return bsp(cube, transform);
}

export function sphere(r, transform) {
  var sphere = new THREE.SphereGeometry( r, 16, 16);
  return bsp(sphere, transform);
}

export function cylinder(radiusTop, radiusBottom, height, options) {
  var sphere = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, 8, 1);
  return bsp(sphere, options);
}

export function plus(a, b) {
  return a + b;
}

export function union(...args) {
  return args.reduce((x, y) => x.union(y));
}

export function intersect(...args) {
  return args.reduce((x, y) => x.intersect(y));
}

export function subtract(...args) {
  return args.reduce((x, y) => x.subtract(y));
}
