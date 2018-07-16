function Main() {

  //################Variables###################//

  //engine
  var scene, camera, renderer, orbitControl;

  //materials
  var groundGeometryMaterial;
  var iLabMaterial, plusMaterial;
  var dotGeometryMaterial_1, dotGeometryMaterial_2;

  //objects
  var axes; //na razie
  var groundMesh;
  var logotype, logotypeContainer;
  var light;
  //var parent = new THREE.Object3D();

  var dotsArray = [];

  //others
  var width = window.innerWidth;
  var height = window.innerHeight;
  console.log("window inner W&H", width, height); //?

  // var center = {
  //   x: 9.279999732971191,
  //   y: 165.5,
  //   z: -10
  // };
  //get it from ilab...

  //screensaver
  var logotypeRotationAngle = 0;

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
    camera.position.set(400, 450, 700); //if animationName === ...
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
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function() {
      renderer.render(scene, camera);
    });

  }

  initEngine();

  function initMaterials() {

    //groundGeometryMaterial
    groundGeometryMaterial = new THREE.MeshPhongMaterial({
      specular: 0xffffff,
      shininess: 1,
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

    //groundMesh   //with freefall?
    // var geometry = new THREE.PlaneGeometry(4000, 4000, 50, 50);
    // groundMesh = new THREE.Mesh(geometry, groundGeometryMaterial);
    // groundMesh.receiveShadow = true;
    // scene.add(groundMesh);

    //logotypeContainer
    logotype = new Logotype(iLabMaterial, plusMaterial);
    logotype.loadModel('fonts/ReFormation Sans Regular_Regular.json', (data) => {
      logotypeContainer = data;

      var box = new THREE.Box3().setFromObject(logotypeContainer);
      console.log(box.min);

      logotypeContainer.position.x = -box.getSize().x / 2;
      logotypeContainer.position.z = -box.getSize().z / 2;

      scene.add(logotypeContainer);
      //parent.add(logotypeContainer);
    });

    //lights
    light = new THREE.SpotLight(0xffffcc, 2, 2000, 3.14);
    light.castShadow = true;
    scene.add(light);

    var lightPositions = [
      [-1000, 1000, -1000],
      [1000, 1000, 1000],
      [1000, -1000, 1000],
      [-1000, -1000, 1000],
    ];

    for (let lightPos of lightPositions) {
      let light = new THREE.SpotLight(0xffffcc, 3, 1500, 3.14 / 8);
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

    //orbits --> not as useful
    // var radius = 320,
    //   segments = 64,
    //   material = new THREE.LineBasicMaterial({ color: 0xff00ff }),
    //   geometry = new THREE.CircleGeometry(radius, segments);

    // geometry.vertices.shift();
    // var circle = new THREE.LineLoop(geometry, material)
    // circle.position.x = 0;
    // circle.position.y = 0;
    // circle.position.z = 0;    // circle.position
    // //scene.add(circle)

    // var circle2 = circle.clone()
    // circle2.rotateX(Math.PI / 2)
    // //scene.add(circle2)

    // var circle3 = circle.clone()
    // circle3.rotateY(Math.PI / 2)
    //scene.add(circle3)
  }

  initObjects();

  function render() {
    //groundMesh.rotation.x = Math.PI / 2;

    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    light.lookAt(scene.position);

    camera.position.x = Math.sin(logotypeRotationAngle) * 700; //if animationName === ...
    camera.position.z = Math.cos(logotypeRotationAngle) * 700;
    camera.lookAt(scene.position);
    logotypeRotationAngle += 0.005;

    //console.log(animationName);
    if (animationName === "randomMove") {
      for (let dot of dotsArray) {
        dot.setPositionToRandomMove();
      }
    } else if (animationName === "eliptycalMove") {
      for (let dot of dotsArray) {
        //dot.rotate();
      }
    } else if (animationName === "freeFallMove") {
      for (let dot of dotsArray) {
        dot.setPositionToFreeFall();
      }
    }


    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
}

var main = new Main();