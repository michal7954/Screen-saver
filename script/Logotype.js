function Logotype(iLabMaterial, plusMaterial) {

  var container = new THREE.Object3D();
  var loader;

  this.loadModel = (url, callback) => {

    //loader
    loader = new THREE.FontLoader();

    loader.load(url, (font) => {

      //iLab
      var geometryILab = new THREE.TextGeometry('iLab', {
        font: font,
        size: 180,
        height: 30,
        curveSegments: 10,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });
      var meshILab = new THREE.Mesh(geometryILab, iLabMaterial);
      meshILab.receiveShadow = true;
      meshILab.castShadow = true;

      //PLUS
      var geometryPlus = new THREE.TextGeometry('  PLUS', {
        font: font,
        size: 100,
        height: 30,
        curveSegments: 10,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });
      var meshPlus = new THREE.Mesh(geometryPlus, plusMaterial);
      meshPlus.receiveShadow = true;
      meshPlus.castShadow = true;

      meshPlus.position.y -= 150;

      container.add(meshILab, meshPlus);

      callback(container);

    });

  };

  this.getContainer = function() {
    return container;
  };

}