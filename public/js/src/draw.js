function addShape(pts) {
    var s = new THREE.Shape();
    s.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => {
        s.lineTo(p.x, p.y);
    });
    s.autoClose = true;
    var e = {
        steps: 2,
        depth: height,
        bevelEnabled: false
    };
    var g = new THREE.ExtrudeBufferGeometry(s, e);
    var m = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        opacity: 0.75,
        transparent: true
    });
    var me = new THREE.Mesh(g, m);
    meshArr.push(me);
}

function drawSegs(arr) {
    for (var i = 0; i < arr.length; i++) {
        var p, q;
        if (i === 0) {
            p = arr[arr.length - 1];
            q = arr[0]
        }
        else {
            p = arr[i - 1];
            q = arr[i];
        }
        debugL(p, q);
    }
}

function debugL(p, q) {
    var l = new THREE.Geometry();
    l.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
    l.vertices.push(new THREE.Vector3(q.x, q.y, q.z));
    var m = new THREE.LineBasicMaterial({ color: 0xffffff });
    var me = new THREE.Line(l, m);
    meshArr.push(me);
}

function debugS(p) {
    var g = new THREE.SphereGeometry(1, 20, 20);
    var m = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });



    var me = new THREE.Mesh(g, m);
    me.position.set(p.x, p.y, p.z);
    meshArr.push(me);
}
