function Screensaver() {

  //##############Public methods################//

  this.setCameraRotationType = (type) => {
    cameraRotationType = type;
  };

  this.setLogotypeRotationAngle = (angle) => {
    cameraRotationSpeed = angle;
  };

  this.setCameraScalar = (scalar) => {
    cameraScalar = scalar;
  };

  this.setMirror = () => {
    if (!groundMirror) {
      var geometry = new THREE.PlaneBufferGeometry(4000, 4000);
      groundMirror = new THREE.Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: 3000,
        textureHeight: 3000,
        recursion: 1,
        shininess: 20,
      });
      groundMirror.position.y = -200;
      groundMirror.rotateX(-Math.PI / 2);
      scene.add(groundMirror);
    } else {
      scene.remove(groundMirror);
      groundMirror = false;
    }
  };

  this.setHemisphereLight = () => {
    if (!hemisphereLight) {
      hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      scene.add(hemisphereLight);
    } else {
      scene.remove(hemisphereLight);
      hemisphereLight = false;
    }
  };

  this.setBackgroundColor = (color) => {
    switch (color) {
      case "black":
        renderer.setClearColor(0x000000);
        break;
      case "white":
        renderer.setClearColor(0xffffff);
        break;
    }
  };

  //animations methods

  this.setToRandomMove = () => {
    for (let dot of dotsArray) {
      dot.resetToRandomMove();
    }
    currentAnimation = "randomMove";
  };

  this.setDotsSpeed = (speed) => {
    for (let dot of dotsArray) {
      dot.setSpeed(speed);
    }
  };

  this.setMaxDotsRadius = (radius) => {
    for (let dot of dotsArray) {
      dot.setRandomMoveRadius(radius);
    }
  };

  this.setToElypticalMove = (axisArray, direction) => {
    for (let dot of dotsArray) {
      dot.resetToElypticalMove(axisArray, direction);
    }
    currentAnimation = "eliptycalMove";
  };

  this.setToFreeFallMove = () => {
    for (let dot of dotsArray) {
      dot.resetToFreeFallMove();
    }
    currentAnimation = "freeFallMove";
  };

  this.setFreeFallMoveType = (moveType) => {
    for (let dot of dotsArray) {
      dot.setFreeFallMoveType(moveType);
    }
  };

  //###########End of public methods############//

  //################Variables###################//

  //engine
  var scene, camera, renderer, orbitControl, stats;

  //materials
  var iLabMaterial, plusMaterial;
  var dotGeometryMaterial_1, dotGeometryMaterial_2;

  //objects
  //var axes;

  var logotype, logotypeContainer;
  var light, hemisphereLight = false;
  var groundMirror = false;

  var dotsArray = [];

  //others
  // var width = window.innerWidth;
  // var height = window.innerHeight;
  // console.log("window inner W&H", width, height); //?
  var width = $("#root")[0].clientWidth;
  var height = $("#root")[0].clientHeight;

  //screensaver
  var currentAnimation = null;

  var cameraRotationSpeed = 0.005;
  var currentLogotypeRotationAngle = 0;
  var cameraScalar = 1000;
  var cameraRotationType = "type_1";

  //#############End of variables###############//

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
    camera.position.set(500, 500, 500); //if currentAnimation === ...
    camera.lookAt(scene.position);
    camera.fov = 45; //ckeck
    camera.updateProjectionMatrix();

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    $("#root").append(renderer.domElement);

    $(window).on("resize", function() {
      var width = $("#root")[0].clientWidth;
      var height = $("#root")[0].clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    //orbitControl
    // orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    // orbitControl.addEventListener('change', function() {
    //   renderer.render(scene, camera);
    // });

    //stats
    stats = new Stats();
    stats.showPanel(0);
    $('#control').append(stats.dom);
  }

  initEngine();

  function initMaterials() {

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

    //dotGeometryMaterials
    dotGeometryMaterial_1 = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0xf58220,
      //shininess: 1000
    });

    dotGeometryMaterial_2 = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0x808285,
    });

  }

  initMaterials();

  function initObjects() {

    //axes
    // axes = new THREE.AxesHelper(1500);
    // scene.add(axes);

    //logotypeContainer
    logotype = new Logotype(iLabMaterial, plusMaterial);
    logotype.loadModel('fonts/ReFormation Sans Regular_Regular.json', (data) => {
      logotypeContainer = data;

      var box = new THREE.Box3().setFromObject(logotypeContainer);

      logotypeContainer.position.x = -box.getSize().x / 2;
      logotypeContainer.position.z = -box.getSize().z / 2;

      scene.add(logotypeContainer);
    });

    //lights
    light = new THREE.SpotLight(0xffffcc, 2, 2000, 3.14);
    light.castShadow = true;
    scene.add(light);

    var lightPositions = [
      // [-1000, 1000, -1000],
      // [1000, 1000, 1000],
      // [1000, 1000, -1000],
      // [-1000, 1000, 1000],
    ];

    for (let lightPos of lightPositions) {
      let light = new THREE.PointLight(0xffffcc, 3, 1500, 3.14 / 8);
      light.castShadow = true;
      light.position.set(lightPos[0], lightPos[1], lightPos[2]);
      light.lookAt(scene.position);
      scene.add(light);
    }

    //dots
    for (var i = 0; i < 200; i++) {
      var materialNum = Math.floor(Math.random() * 2 + 1);
      var material = materialNum === 1 ? dotGeometryMaterial_1 : dotGeometryMaterial_2;

      var dot = new Dot(i, material);
      var dotContainer = dot.getDotContainer();

      dotsArray.push(dot);
      scene.add(dotContainer);
    }

  }

  initObjects();

  function render() {
    stats.begin();

    var timer = Date.now() * 0.01;

    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    light.lookAt(scene.position);

    if (cameraRotationType === "type_1") {
      camera.position.x = Math.sin(currentLogotypeRotationAngle) * cameraScalar;
      camera.position.y = cameraScalar;
      camera.position.z = Math.cos(currentLogotypeRotationAngle) * cameraScalar;
    } else if (cameraRotationType === "type_2") {
      camera.position.x = Math.sin(currentLogotypeRotationAngle) * cameraScalar;
      camera.position.y = Math.cos(currentLogotypeRotationAngle + Math.PI / 2) * cameraScalar / 2;
      camera.position.z = Math.cos(currentLogotypeRotationAngle) * cameraScalar;
    }
    camera.lookAt(scene.position);
    if (currentLogotypeRotationAngle <= Math.pow(2, 53)) currentLogotypeRotationAngle += cameraRotationSpeed;
    else currentLogotypeRotationAngle = 0;

    if (currentAnimation === "randomMove") {
      for (let dot of dotsArray) {
        dot.setPositionToRandomMove();
      }
    } else if (currentAnimation === "eliptycalMove") {
      for (let dot of dotsArray) {
        dot.setPositionToElypticalMove();
      }
    } else if (currentAnimation === "freeFallMove") {
      for (let dot of dotsArray) {
        dot.setPositionToFreeFall(timer);
      }
    }

    stats.end();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();

  this.setToRandomMove(); //do according to currentAnimation
}