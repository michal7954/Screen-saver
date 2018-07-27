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
  var dotSpeed = 10;
  var randomMoveRadius = 600;


  //freeFallMove
  var freeFallMovPosX = Math.floor(Math.random() * (1200) - 600); //<-600, 600>
  var freeFallMovPosY = Math.floor(Math.random() * (600 + 184) - 184); //<-184, 600>
  var freeFallMovPosZ = Math.floor(Math.random() * (1200) - 600); //<-600, 600>
  var timerScalar = (Math.random() + 0.05) * 0.09;
  var freeFallMoveType = "bouncing";

  //elypticalMove
  var axisArray = ['x', 'y', 'z', 'x1', 'y1', 'z1', 'x2', 'y2', 'z2'];
  var axis = axisArray[Math.floor(Math.random() * 9)];
  var angle = Math.random() * 0.005 + 0.001;
  var radius = Math.floor(Math.random() * (700) + 300); //<300, 1000)
  var direction = 0;
  var directionBool = Math.floor(Math.random() * 2);
  if (directionBool)
    direction = 1;
  else
    direction = -1;

  //publicFunctions
  this.resetToElypticalMove = (axisArray, dir) => {
    geometry.center();
    dotMesh.position.set(0, 0, 0);
    dotMesh.rotation.set(0, 0, 0);
    startAngle = 0;

    if (axisArray)
      axis = axisArray[Math.floor(Math.random() * axisArray.length)];

    if (dir == 1 || dir == -1) {
      direction = dir;
    } else {
      var directionBool = Math.floor(Math.random() * 2);
      if (directionBool)
        direction = 1;
      else
        direction = -1;
    }

    switch (axis) {
      case 'x':
        geometry.translate(0, radius, 0);
        break;
      case 'y':
        geometry.translate(0, 0, radius);
        break;
      case 'z':
        geometry.translate(radius, 0, 0);
        break;
      case 'x1':
        geometry.translate(0, 0, radius);
        break;
      case 'x2':
        geometry.translate(0, 0, radius);
        break;
      case 'y1':
      case 'y2':
        geometry.translate(radius, 0, 0);
        break;
      case 'z1':
      case 'z2':
        geometry.translate(0, radius, 0);
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

    dotMesh.position.set(freeFallMovPosX, freeFallMovPosY, freeFallMovPosZ);
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
        dotMesh.rotateZ(direction * angle);
        break;
      case 'z1':
        dotMesh.rotateZ(direction * angle);
        dotMesh.rotateX(direction * angle);
        break;
      case 'x2':
        dotMesh.rotateX(direction * angle);
        dotMesh.rotateY(direction * -angle);
        break;
      case 'y2':
        dotMesh.rotateY(direction * angle);
        dotMesh.rotateZ(direction * -angle);
        break;
      case 'z2':
        dotMesh.rotateZ(direction * angle);
        dotMesh.rotateX(direction * -angle);
        break;
    }
  };

  this.setPositionToFreeFall = function(timer) { //set pos y to > 0
    if (freeFallMoveType === "bouncing") {

      dotMesh.position.set(
        freeFallMovPosX,
        Math.abs(Math.cos(timer * timerScalar)) * freeFallMovPosY + 5,
        freeFallMovPosZ
      );

    } else if (freeFallMoveType === "rainDrop") {

      if (dotMesh.position.y <= -184) { //reached to floor or under => start dot bounce
        //todo : clock reset
        time = 0;
        dotMesh.position.y = freeFallMovPosY;
      } else { //reached the ceiling ;) => start dot fall
        // dotMesh.position.y = dotMesh.position.y - (9.8 * clock.getElapsedTime() * clock.getElapsedTime() / 2);
        time += 0.006;
        dotMesh.position.y = dotMesh.position.y - (9.8 * time * time);
      }

    }
  };

  this.setFreeFallMoveType = function(moveType) {
    freeFallMoveType = moveType;
  };

  this.setPositionToRandomMove = function() {
    switch (trajectory) {
      case 1:
        dotMesh.position.x = randomMoveRadius * Math.cos(clock.getElapsedTime() / dotSpeed + id);
        dotMesh.position.y = randomMoveRadius * Math.sin(clock.getElapsedTime() / dotSpeed + id * 1.1); //<-600, 600>
        break;
      case 2:
        dotMesh.position.x = randomMoveRadius * Math.cos(clock.getElapsedTime() / dotSpeed + id);
        dotMesh.position.z = randomMoveRadius * Math.sin(clock.getElapsedTime() / dotSpeed + id * 1.1);
        break;
      case 3:
        dotMesh.position.y = randomMoveRadius * Math.cos(clock.getElapsedTime() / dotSpeed + id);
        dotMesh.position.z = randomMoveRadius * Math.sin(clock.getElapsedTime() / dotSpeed + id * 1.1);
        break;
    }
  };

  this.setSpeed = function(speed) {
    dotSpeed = speed;
  };

  this.setRandomMoveRadius = function(radius) {
    randomMoveRadius = radius;
  };

  this.getDotContainer = function() {
    return dotContainer;
  };
}