function Main() {

  //################Variables###################//

  //engine
  var scene, camera, renderer, orbitControl;

  //materials
  var groundGeometryMaterial;
  var iLabMaterial, plusMaterial;
  var dotGeometryMaterial;

  //objects
  var axes; //na razie
  var groundMesh;
  var logotype, logotypeContainer;
  var light;

  var dotsArray = [];

  //others
  // var width = $("#root")[0].clientWidth;
  // var height = $("#root")[0].clientHeight;

  var width = window.innerWidth;
  var height = window.innerHeight;
  var center = { x: 9.279999732971191, y: 165.5, z: -10 }

  //screensaver
  //

  //#############End Of Variables###############//

  function initEngine() {

    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      10000
    );
    camera.position.set(500, 500, 500);
    camera.lookAt(scene.position);
    camera.fov = 45;
    camera.updateProjectionMatrix();

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);
    $("#root").append(renderer.domElement);

    $(window).on("resize", function () {
      var width = $("#root")[0].clientWidth;
      var height = $("#root")[0].clientHeight;

      renderer.setSize(width, height);
    });

    //orbitControl
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
      renderer.render(scene, camera);
    });

  }

  initEngine();

  function initMaterials() {

    //groundGeometryMaterial
    groundGeometryMaterial = new THREE.MeshPhongMaterial({
      specular: 0xffffff,
      shininess: 20,
      side: THREE.DoubleSide,
    });

    //iLabMaterial
    iLabMaterial = new THREE.MeshPhongMaterial({
      color: 0x808285,
      shininess: 50,
      side: THREE.DoubleSide,
    });

    //plusMaterial
    plusMaterial = new THREE.MeshPhongMaterial({
      color: 0xf58220,
      shininess: 50,
      side: THREE.DoubleSide,
    });

    //dotGeometryMaterial
    dotGeometryMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0xf58220,
    });

  }

  initMaterials();

  function initObjects() {

    //axes
    axes = new THREE.AxesHelper(1500);
    scene.add(axes);

    //groundMesh
    var geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    groundMesh = new THREE.Mesh(geometry, groundGeometryMaterial);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    //logotypeContainer
    logotype = new Logotype(iLabMaterial, plusMaterial);
    logotype.loadModel('fonts/ReFormation Sans Regular_Regular.json', (data) => {
      logotypeContainer = data;
      logotypeContainer.position.set(-100, 200, 0);

      var box = new THREE.Box3().setFromObject(logotypeContainer);
      logotypeContainer.position.y = box.getSize().y / 2;
      logotypeContainer.position.x = -box.getSize().x / 2;
      logotypeContainer.position.z = -box.getSize().z / 2;

      scene.add(logotypeContainer);
    });

    //light
    light = new THREE.PointLight(0xffffff, 10, 500, 3.14);
    light.castShadow = true;
    light.position.set(0, 350, 100);
    light.lookAt(scene.position);
    scene.add(light);

    //dots
    for (var i = 0; i < 50; i++) {
      var dot = new Dot(dotGeometryMaterial);
      var dotMesh = dot.getDot();

      dotMesh.position.x = center.x + i * 10;
      dotMesh.position.y = center.y;
      dotMesh.position.z = center.z + 10;

      dotsArray.push(dot);
      scene.add(dotMesh);
    }

  }

  initObjects();

  function render() {
    groundMesh.rotation.x = Math.PI / 2;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    for (let dot of dotsArray) {
      //do sth
      //dot.setPosition...
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);

  }

  render();

}

var main = new Main();