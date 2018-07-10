function Fire(fireParticleMaterial) {

  var container = new THREE.Object3D();

  var fireParticleGeometry;
  var firePartialsMeshesArray = [];

  //light
  light = new THREE.PointLight(0xff6600, 5, 300, 3.14);
  light.position.set(0, 0, 0);
  light.lookAt(container.position);
  container.add(light);

  function generateFire() {
    fireParticleGeometry = new THREE.SphereGeometry(2, 2, 4);

    for (var i = 0; i < 65; i++) {
      //var fireParticle = new THREE.Sprite(fireParticleMaterial.clone());
      var fireParticle = new THREE.Mesh(fireParticleGeometry, fireParticleMaterial.clone());
      var scale = Math.floor((Math.random() * 5) + 1);
      fireParticle.scale.set(scale, scale, scale);
      fireParticle.position.set(0, 0, 0);
      firePartialsMeshesArray.push(fireParticle);

      container.add(fireParticle);
    }
  }

  generateFire();

  this.getFireCont = function() {
    return container;
  };

  this.getFireMesh = function() {
    return fireParticle;
  };

  this.updateFire = function(distance) {
    for (let fireParticle of firePartialsMeshesArray) {
      if (fireParticle.position.y >= 25 || fireParticle.position.y === 0) {
        fireParticle.speed = Math.random() + 0.2;
        fireParticle.rotation.x = Math.floor((Math.random() * 2 * Math.PI));
        fireParticle.position.x = Math.floor((Math.random() * 41)) - 20;
        fireParticle.position.z = Math.floor((Math.random() * 41)) - 20;
        fireParticle.position.y = Math.floor((Math.random() * 6));
        fireParticle.material.opacity = 1;
      } else {
        fireParticle.position.y += fireParticle.speed;
        fireParticle.material.opacity -= 0.03;
      }

    }
  };

}