function generatePolys(configPolys){
    for(var i=0; i<configPolys.length-1; i++){
        var poly=configPolys[i];
        var coorLi=[];
        for(var j=0; j<poly.length; j++){
            var pt=poly[j];
            var sc=1;           
            var coor={'x': pt.x, 'y': pt.y, 'z': pt.z};
            coorLi.push(coor);
            /*
            var g=new THREE.SphereGeometry(0.05,12,12);
            var m=new THREE.MeshPhongMaterial({
                color: new THREE.Color("rgb(100,0,0)")
            });
            var me=new THREE.Mesh(g,m);
            me.position.set(pt.x,pt.y,pt.z);
            meshArr.push(me);
            */
        }
        addShape(coorLi); // util file
        drawSegs(coorLi); // util file
    }
}