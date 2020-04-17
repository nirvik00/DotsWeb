function addShape(pts) {
    var s = new THREE.Shape();
    s.moveTo(pts[0].x, pts[0].y);
    for(var i=1; i<pts.length-1; i++){
        let p=pts[i];
        s.lineTo(p.x, p.y);
    }
    s.autoClose = true;
    var height=pts[0].z+1;
    var e = {
        steps: 2,
        depth: height,
        bevelEnabled: false
    };
    var g = new THREE.ExtrudeBufferGeometry(s, e);
    var m = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        opacity: 0.50,
        transparent: true
    });
    var me = new THREE.Mesh(g, m);
    meshArr.push(me);
    
}

function drawSegs(arr) {
    for (var i = 1; i < arr.length; i++) {
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
    var x0=parseFloat(p.x);
    var y0=parseFloat(p.y);
    var z0=parseFloat(p.z);
    var x1=parseFloat(q.x);
    var y1=parseFloat(q.y);
    var z1=parseFloat(q.z);
    if((x0!== 0 && y0!== 0) || (x1!==0 && y1!==0)){
        l.vertices.push(new THREE.Vector3(x0,y0,z0));
        l.vertices.push(new THREE.Vector3(x1,y1,z1));
        var m = new THREE.LineBasicMaterial({ color: 0xffffff });
        var me = new THREE.Line(l, m);
        meshArr.push(me);
    }    
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
