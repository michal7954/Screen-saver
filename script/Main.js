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

  var cubeGeometry, cubeMesh, cubeWireframeMesh, cubeTexture;

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
    cubeWireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    var loader = new THREE.TextureLoader();
    loader.load('texture.png', function (texture) {
      cubeTexture = new THREE.MeshBasicMaterial({ map: texture });

      var cubeContainer = new THREE.Object3D();
      cubeGeometry = new THREE.BoxGeometry(372, 197, 372);

      cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubeTexturedMesh = new THREE.Mesh(cubeGeometry, cubeTexture);
      cubeWireframeMesh = new THREE.Mesh(cubeGeometry, cubeWireframeMaterial);

      //cubeContainer.add(cubeMesh);
      cubeContainer.add(cubeTexturedMesh);
      cubeContainer.add(cubeWireframeMesh);

      cubesContainers.push(cubeContainer);
      scene.add(cubeContainer);

    });

  }

  initMaterials();

  function initObjects() {

    //axes
    axes = new THREE.AxesHelper(500);
    scene.add(axes);

    //cubesContainers



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