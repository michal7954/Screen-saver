function Main() {

  //################Variables###################//

  //engine
  var stats;
  var scene, camera, orbitControl, renderer;

  //materials
  var fireParticleMeshMaterial, fireParticleSpriteMaterial;

  //objects
  var axes; //na razie
  var fires = [];

  //others
  var width = window.innerWidth;
  var height = window.innerHeight;

  //#############End Of Variables###############//

  function initEngine() {

    //stats
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(
      45,
      width/height,
      0.1,
      10000
    );
    camera.position.set(400, 100, 400);
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
    orbitControl.addEventListener('change', function() {
      renderer.render(scene, camera);
    });

  }

  function initMaterials() {

    //fireParticleMeshMaterial
    fireParticleMeshMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    });

    fireParticleSpriteMaterial = new THREE.SpriteMaterial({
      size: 10, // wielkość cząsteczki
      color: 0xff3300,
      //map: THREE.ImageUtils.loadTexture("mats/fire.png"),
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

  }

  function initObjects() {

    //axes
    // axes = new THREE.AxesHelper(1000);
    // scene.add(axes);

    //fires
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 2; k++) {

          var fire = new Fire(fireParticleMeshMaterial);
          var fireCont = fire.getFireCont();
          scene.add(fireCont);
          fires.push(fire);

          fireCont.position.x = i * 150 - (4 * 20) / 2.5;
          fireCont.position.z = j * 150 - (4 * 20) / 2.5;
          fireCont.position.y = k * 150 - (4 * 20) / 2.5;

        }
      }
    }


  }

  initEngine();
  initMaterials();
  initObjects();

  function render() {
    stats.begin();

    for (let fire of fires) {
      fire.updateFire();
    }

    camera.lookAt(scene.position);

    requestAnimationFrame(render);
    renderer.render(scene, camera);

    stats.end();
  }

  render();

}

var main = new Main();