function Dot(positionInArray, material) {
  var dotContainer = new THREE.Object3D();

  var posX = Math.random() * 600 - 300;
  var posY = Math.random() * 600 - 300;
  var posZ = Math.random() * 600 - 300;
  var trajectory = Math.floor(Math.random() * 3 + 1);

  //dot
  var geometry = new THREE.SphereGeometry(8, 32, 32);
  var dot = new THREE.Mesh(geometry, material);
  dot.position.set(posX, posY, posZ);
  dotContainer.add(dot);

  var clock = new THREE.Clock();
  clock.start();

  this.getDotContainer = function() {
    return dotContainer;
  };

  this.setPositionToFreeFall = function() {
    if (dot.position.y <= 0) {

    } else {
      dot.position.y = dot.position.y - (9.8 * clock.getElapsedTime() * clock.getElapsedTime() / 2);
    }
  };

  this.setPositionToRandomMove = function() {
    switch (trajectory) {
      case 1:
        dot.position.x = 600 * Math.cos(clock.getElapsedTime() / 10 + positionInArray);
        dot.position.y = 600 * Math.sin(clock.getElapsedTime() / 10 + positionInArray * 1.1);
        break;
      case 2:
        dot.position.x = 600 * Math.cos(clock.getElapsedTime() / 10 + positionInArray);
        dot.position.z = 600 * Math.sin(clock.getElapsedTime() / 10 + positionInArray * 1.1);
        break;
      case 3:
        dot.position.y = 600 * Math.cos(clock.getElapsedTime() / 10 + positionInArray);
        dot.position.z = 600 * Math.sin(clock.getElapsedTime() / 10 + positionInArray * 1.1);
        break;
      case 4:

        break;
    }
  };

}