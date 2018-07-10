function Main() {

  $(window).on("resize", function () {

    var width = $("#root")[0].clientWidth;
    var height = $("#root")[0].clientHeight;

    renderer.setSize(width, height);
  })

  //################Variables###################//

  //engine
  var scene, camera, orbitControl, renderer;

  //materials
  var cubeMaterial, cubeWireframeMaterial;

  //objects
  var axes; //na razie

  var cubeGeometry, cubeMesh, cubeWireframeMesh;

  //others
  var width = $("#root")[0].clientWidth;
  var height = $("#root")[0].clientHeight;

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
    camera.position.set(0, 400, 400);
    camera.lookAt(scene.position);
    camera.fov = 45;
    camera.updateProjectionMatrix();

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);
    renderer
    $("#root").append(renderer.domElement);

    //orbitControl
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
      renderer.render(scene, camera);
    });

  }

  initEngine();

  function initMaterials() {
    cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    cubeWireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  }

  initMaterials();

  function initObjects() {

    //axes
    axes = new THREE.AxesHelper(500);
    scene.add(axes);

    //
    var cubeContainer = new THREE.Object3D();

    cubeGeometry = new THREE.BoxGeometry(400, 200, 400);

    cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
    cubeWireframeMesh = new THREE.Mesh(geometry, cubeWireframeMaterial);
    cubeContainer.add(cubeMesh);
    cubeContainer.add(cubeWireframeMesh);
    //scene.add(sheet)

    var cubes = [];
    for (let i = -2; i < 2; i++) {
      var cube = cubeContainer.clone();
      cube.position.x = i * 800;
      cubes.push(cube);
      scene.add(cube);
    }


  }

  initObjects();

  function render() {

    for (i = 0; i < cubes.length; i++) {
      cubes[i].rotateY(Math.PI / 360);
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);

  }

  render();

}

var main = new Main();