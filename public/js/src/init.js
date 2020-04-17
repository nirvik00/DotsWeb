function init3d() {
    div3d = document.createElement("div");
    scene = new THREE.Scene();
    scene.background=new THREE.Color("rgb(255,155,255)");
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.set(200, 0, 200);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    div3d.appendChild(renderer.domElement);
    document.body.appendChild(div3d);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    var axes = new THREE.AxesHelper(51);
    scene.add(axes);
    var l = new THREE.PointLight(0xffffff, 1, 100);
    l.position.set(0, 0, 50);
    var l2 = new THREE.PointLight(0xffffff, 1, 100);
    l2.position.set(0, 0, -50);
    var l3 = new THREE.AmbientLight(0xff552a);
    scene.add(l3);
    scene.add(l);
    scene.add(l2);
    animationLoop();
}

function clear() {
    meshArr.forEach(node => {
        node.geometry.dispose();
        node.material.dispose();
        scene.remove(node);
        delete node;
    });
    meshArr = [];
}

function draw() {
    meshArr.forEach(node => {
        scene.add(node);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animationLoop() {
    clear();
    onWindowResize();
    render();
}

function render() {
    renderer.render(scene, camera);
}
