function init3d() {
    div3d = document.createElement("div");
    scene = new THREE.Scene();
    scene.background=new THREE.Color("rgb(0,0,0)");
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.set(10, 0, 10);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.75, window.innerHeight*0.75);
    div3d.appendChild(renderer.domElement);
    document.body.appendChild(div3d);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    var axes = new THREE.AxesHelper(1);
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

function updateVals() {
    // document.getElementById("db_entry_num_slider").max=CONFIG_POLYS.Length+"";

    var slider = document.getElementById ("db_entry_num_slider");

    if ('max' in slider) {  // Google Chrome, Safari from version 5 and Opera
        slider.max = NUMBER_CONFIGS;
    } else {
            // Safari before version 5
        slider.setAttribute ("max", NUMBER_CONFIGS);
    }


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
    if(CONFIG_POLYS.length>0){
        var db_entry = parseInt(document.getElementById("db_entry_num_slider").value);
        document.getElementById("dbEntry").innerHTML = "DB Entry to display " + db_entry + " out of " + CONFIG_POLYS.length;
        document.getElementById("infoP").innerHTML = "DB RESULTS: "+ CONFIG_POLYS.length;
        console.log(db_entry);
        if(db_entry>CONFIG_POLYS.length-1){
            db_entry=0;
        }
        generatePolys(CONFIG_POLYS[db_entry]); // in draw 
    }else{
        document.getElementById("infoP").innerHTML = "PLEASE REFRESH the page... no results retrieved from DB";
    }
    meshArr.forEach(node=>{
        scene.add(node);
    })
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth*0.75, window.innerHeight*0.75);
}


function animationLoop() {
    clear();
    draw();
    onWindowResize();
    render();
}

function render() {
    renderer.render(scene, camera);
}
