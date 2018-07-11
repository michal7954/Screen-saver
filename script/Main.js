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
  var cubeMaterial, cubeWireframeMaterial, cubeTexture;

  //objects
  var axes; //na razie

  var cubeGeometry, cubeMesh, cubeWireframeMesh;

  //others
  var width = $("#root")[0].clientWidth;
  var height = $("#root")[0].clientHeight;

  //screensaver
  var cubesContainers = [];

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

    var loader = new THREE.TextureLoader();
    loader.load('texture.png', function (texture) {
      var geometry = new THREE.SphereGeometry(1000, 20, 20);
      var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
      var mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    cubeWireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  }

  initMaterials();

  function initObjects() {

    //axes
    axes = new THREE.AxesHelper(500);
    scene.add(axes);

    //cubesContainers

    for (let i = -2; i < 2; i++) {
      var cubeContainer = new THREE.Object3D();

      cubeGeometry = new THREE.BoxGeometry(400, 200, 400);
      cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubeWireframeMesh = new THREE.Mesh(cubeGeometry, cubeWireframeMaterial);

      cubeContainer.add(cubeMesh);
      cubeContainer.add(cubeWireframeMesh);

      cubeContainer.position.x = i * 800;
      cubesContainers.push(cubeContainer);
      scene.add(cubeContainer);
    }

  }

  initObjects();

  function render() {

    for (let i = 0; i < cubesContainers.length; i++) {
      cubesContainers[i].rotateY(Math.PI / 360);
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);

  }

  render();

}

var main = new Main();