function wing() {
   var c = circle({r: 1})
   var main = polygon([ [0,0],[2,2],[-2,2] ]);
   var thickness= .2;
   var a = Math.atan(2);
   var r = .2;
   return linear_extrude({height: thickness}, hull(
    main,
     circle({r: r, center: true}).translate([-0,0.2]),
     circle({r: r, center: true}).translate([-2,2 -r]),
     circle({r: r, center: true}).translate([2,2 - r])
    )).translate([0, 0, -thickness / 2]);
}


function main() {
    var engine = union(
        sphere({r: 1}).scale([.3,.8,.3]).translate([-.75, 1.5, 0]),
        sphere({r: 1}).scale([.3,.8,.3]).translate([.75, 1.5, 0]));

    var out = intersection(engine, cube({size: [10,1,10]}).translate([-5,2,-5]))
    engine = difference(engine, out);

    return union(
        sphere({r: 1}).scale([.3,.8,.3]).translate([0, 1, 0]),
        engine,
        color('yellow', out),
        wing()
    );
}
