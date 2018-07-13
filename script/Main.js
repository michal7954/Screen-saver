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
  var logotype, logotypeContainer, parent = new THREE.Object3D();
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
    camera.lookAt(center);
    camera.fov = 45;
    camera.updateProjectionMatrix();


    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    $("#root").append(renderer.domElement);

    $(window).on("resize", function () {
      var width = $("#root")[0].clientWidth;
      var height = $("#root")[0].clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
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
    dotGeometryMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0xf58220,
      //shininess: 1000
    });
  }

  initMaterials();

  function initObjects() {

    //axes
    axes = new THREE.AxesHelper(1500);
    //scene.add(axes);

    //groundMesh
    var geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    groundMesh = new THREE.Mesh(geometry, groundGeometryMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.rotation.x = Math.PI / 2;
    groundMesh.position.y -= 153.5;
    //scene.add(groundMesh);

    //logotypeContainer
    logotype = new Logotype(iLabMaterial, plusMaterial);
    logotype.loadModel('fonts/ReFormation Sans Regular_Regular.json', (data) => {
      logotypeContainer = data;
      logotypeContainer.position.set(-100, 200, 0);

      var box = new THREE.Box3().setFromObject(logotypeContainer);
      logotypeContainer.position.y = box.getSize().y / 2;
      logotypeContainer.position.x = -box.getSize().x / 2;
      logotypeContainer.position.z = -box.getSize().z / 2;

      scene.add(parent)
      parent.add(logotypeContainer)
    });

    //light
    light = new THREE.SpotLight(0xffffff, 5, 500, 3.14);
    light.castShadow = true;
    light.position.set(0, 300, 100);
    light.lookAt(center);
    scene.add(light);

    //dots

    for (let i = 0; i < 100; i++) {
      var dot = new Dot(dotGeometryMaterial);
      dotsArray.push(dot);
      scene.add(dot.getDot());
    }


    scene.add(dot.getDot());

    //orbits
    var radius = 320,
      segments = 64,
      material = new THREE.LineBasicMaterial({ color: 0xff00ff }),
      geometry = new THREE.CircleGeometry(radius, segments);

    geometry.vertices.shift();
    var circle = new THREE.LineLoop(geometry, material)
    circle.position.x = center.x
    circle.position.y = center.y;
    circle.position.z = center.z
    circle.position
    //scene.add(circle)

    var circle2 = circle.clone()
    circle2.rotateX(Math.PI / 2)
    //scene.add(circle2)

    var circle3 = circle.clone()
    circle3.rotateY(Math.PI / 2)
    //scene.add(circle3)
  }

  initObjects();

  function render() {
    for (let dot of dotsArray) {
      dot.rotate();
    }


    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
}

var main = new Main();