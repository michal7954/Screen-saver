function Dot(id, material) {

  //dotMesh
  var dotContainer = new THREE.Object3D();
  var geometry = new THREE.SphereGeometry(8, 32, 32);
  var dotMesh = new THREE.Mesh(geometry, material);
  dotContainer.add(dotMesh);

  //clock
  var clock = new THREE.Clock();
  clock.start();
  var time = 0; //todo : change in render to new Date

  //randomMove
  var trajectory = Math.floor(Math.random() * 3 + 1);

  //elypticalMove
  var axisArray = ['x', 'y', 'z', 'x1', 'y1', 'z1', 'x2', 'y2', 'z2'];
  var axis = axisArray[Math.floor(Math.random() * 9)];

  var radius = Math.floor(Math.random() * (700) + 300); //<300, 400>
  //console.log("radous", radius);
  var angle = Math.random() * 0.006 + 0.001;
  var startAngle = Math.random() * 2 * Math.PI - Math.PI;

  var direction = 0;
  var directionBool = Math.floor(Math.random() * 2);

  if (directionBool)
    direction = 1;
  else
    direction = -1;

  this.resetToElypticalMove = () => {
    geometry.center();
    dotMesh.position.set(0, 0, 0);

    switch (axis) {
      case 'x':
        geometry.translate(0, radius, 0);
        dotMesh.rotation.x = startAngle;
        break;
      case 'y':
        geometry.translate(0, 0, radius);
        dotMesh.rotation.y = startAngle;
        break;
      case 'z':
        geometry.translate(radius, 0, 0);
        dotMesh.rotation.z = startAngle;
        break;
      case 'x1':
        geometry.translate(0, 0, radius);
        dotMesh.rotation.x = startAngle;
        dotMesh.rotation.y = startAngle;
        break;
      case 'x2':
        geometry.translate(0, 0, radius);
        dotMesh.rotation.x = startAngle;
        dotMesh.rotation.y = startAngle;
        break;
      case 'y1':
      case 'y2':
        geometry.translate(radius, 0, 0);
        dotMesh.rotation.y = startAngle;
        dotMesh.rotation.z = startAngle;
        break;
      case 'z1':
      case 'z2':
        geometry.translate(0, radius, 0);
        dotMesh.rotation.z = startAngle;
        dotMesh.rotation.x = startAngle;
        break;
    }
  };

  this.resetToRandomMove = () => {
    geometry.center();
    dotMesh.rotation.set(0, 0, 0);
    dotMesh.position.set(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300);
  };

  this.resetToFreeFallMove = () => {
    geometry.center();
    dotMesh.rotation.set(0, 0, 0);

    let posY = Math.floor(Math.random() * (600 + 295) - 295); //<-295, 600>
    dotMesh.position.set(Math.random() * 1200 - 600, posY, Math.random() * 1200 - 600);
  };

  this.setPositionToElypticalMove = function() {
    switch (axis) {
      case 'x':
        dotMesh.rotateX(direction * angle);
        break;
      case 'y':
        dotMesh.rotateY(direction * angle);
        break;
      case 'z':
        dotMesh.rotateZ(direction * angle);
        break;
      case 'x1':
        dotMesh.rotateX(direction * angle);
        dotMesh.rotateY(direction * angle);
        break;
      case 'y1':
        dotMesh.rotateY(direction * angle);
        dotMesh.rotateZ(angle);
        break;
      case 'z1':
        dotMesh.rotateZ(direction * angle);
        dotMesh.rotateX(angle);
        break;
      case 'x2':
        dotMesh.rotateX(direction * angle);
        dotMesh.rotateY(-angle);
        break;
      case 'y2':
        dotMesh.rotateY(direction * angle);
        dotMesh.rotateZ(-angle);
        break;
      case 'z2':
        dotMesh.rotateZ(direction * angle);
        dotMesh.rotateX(-angle);
        break;
    }
  };

  this.setPositionToFreeFall = function() { //set pos y to > 0
    if (dotMesh.position.y <= -145) {
      //todo : clock reset
      time = 0;
      var posY = Math.floor(Math.random() * (600 + 295) - 295);
      dotMesh.position.y = posY;
    } else {
      // dotMesh.position.y = dotMesh.position.y - (9.8 * clock.getElapsedTime() * clock.getElapsedTime() / 2);
      time += 0.006;
      dotMesh.position.y = dotMesh.position.y - (9.8 * time * time);
    }
  };

  this.setPositionToRandomMove = function() {
    switch (trajectory) {
      case 1:
        dotMesh.position.x = 600 * Math.cos(clock.getElapsedTime() / 10 + id);
        dotMesh.position.y = 600 * Math.sin(clock.getElapsedTime() / 10 + id * 1.1); //<-600, 600>
        break;
      case 2:
        dotMesh.position.x = 600 * Math.cos(clock.getElapsedTime() / 10 + id);
        dotMesh.position.z = 600 * Math.sin(clock.getElapsedTime() / 10 + id * 1.1);
        break;
      case 3:
        dotMesh.position.y = 600 * Math.cos(clock.getElapsedTime() / 10 + id);
        dotMesh.position.z = 600 * Math.sin(clock.getElapsedTime() / 10 + id * 1.1);
        break;
    }
  };

  this.getDotContainer = function() {
    return dotContainer;
  };

}