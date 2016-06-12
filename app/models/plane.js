import THREE from 'three';
import {union, intersect, subtract, sphere, cube, cylinder, bsp} from './csg';




function wing() {
  var shape = new THREE.Shape();
  var s = 0;
  shape.moveTo(0,s);
  shape.lineTo(-2 - s, -2 - s);
  shape.lineTo(2 + s, -2 - s);
  shape.lineTo(0,s);

  var x = union(
    // cylinder(.2, .2, .2),
    // cylinder(.2, .2, .2, {position: [-2, 0, -2]}),
    // cylinder(.2, .2, .2, {position: [-2, 0, 2]}),
    bsp(new THREE.ExtrudeGeometry(shape, {amount: .2, bevelEnabled: false}), {position: [0, 0.1, 0], rotation: [Math.PI / 2, 0, -Math.PI / 2]})
  );

  return x;
}



export default function plane(planeColor = 0xFF0000) {
    var engine = union(
      sphere(1, {scale: [.6,.2,.2], position: [-1.5, 0, -.75]}),
      sphere(1, {scale: [.6,.2,.2], position: [-1.5, 0, .75]})
    );

    // var out = intersect(engine, cube(20,1,20, {position: [-20,0,0]}));
    // engine = subtract(engine, out);

    let cockpit = sphere(1, {scale: [.8,.3,.3], position: [-1, 0, 0]});
    let plane = new THREE.Object3D();
    plane.add(cockpit.toMesh(new THREE.MeshPhongMaterial({color: 0x49faff})));
    let body = union(
      engine,
      wing()
    ).toMesh(new THREE.MeshPhongMaterial({color: planeColor}));
    plane.add(body);
    return plane;
}
