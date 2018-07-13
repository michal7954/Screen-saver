function Dot(positionInArray, material) {
  var time = 0;

  //positions & trajectory
  var posX = Math.random() * 600 - 300;

  var posY;
  if (animationName === "randomMove") {
    posY = Math.random() * 600 - 300;
  } else {
    posY = Math.random() * 300;
  }

  var posZ = Math.random() * 600 - 300;
  var trajectory = Math.floor(Math.random() * 3 + 1);

  //dot
  var dotContainer = new THREE.Object3D();
  var geometry = new THREE.SphereGeometry(8, 32, 32);
  var dot = new THREE.Mesh(geometry, material);
  dot.position.set(posX, posY, posZ);
  dotContainer.add(dot);

  //clock
  var clock = new THREE.Clock();
  clock.start();

  //elypticalMove
  // var center = { x: 9.279999732971191, y: 165.5, z: -10 }

  // var axisTab = ['x', 'y', 'z', 'x1', 'y1', 'z1', 'x2', 'y2', 'z2']
  // var axis = axisTab[Math.floor(Math.random() * 9)]
  // var radius = Math.floor(Math.random() * 1800) + 300
  // var angle = Math.random() * 0.006 + 0.001
  // var startAngle = Math.random() * 2 * Math.PI - Math.PI
  // //console.log(startAngle)
  // var geometry = new THREE.SphereGeometry(20, 32, 32);
  // //axis = 'x1'
  // var direction = 0
  // var directionBool = Math.floor(Math.random() * 2)
  // if (directionBool)
  //   direction = 1
  // else
  //   direction = - 1

  // dot.position.y = center.y
  // dot.position.z = center.z
  // dot.position.x = center.x

  // switch (axis) {
  //   case 'x':
  //     geometry.translate(0, radius, 0)
  //     dot.rotation.x = startAngle;
  //     break;
  //   case 'y':
  //     geometry.translate(0, 0, radius)
  //     dot.rotation.y = startAngle;
  //     break;
  //   case 'z':
  //     geometry.translate(radius, 0, 0)
  //     dot.rotation.z = startAngle;
  //     break;
  //   case 'x1':
  //     geometry.translate(0, 0, radius)
  //     dot.rotation.x = startAngle;
  //     dot.rotation.y = startAngle;
  //     break;
  //   case 'x2':
  //     geometry.translate(0, 0, radius)
  //     dot.rotation.x = startAngle;
  //     dot.rotation.y = startAngle;
  //     break;
  //   case 'y1':
  //   case 'y2':
  //     geometry.translate(radius, 0, 0)
  //     dot.rotation.y = startAngle;
  //     dot.rotation.z = startAngle;
  //     break;
  //   case 'z1':
  //   case 'z2':
  //     geometry.translate(0, radius, 0)
  //     dot.rotation.z = startAngle;
  //     dot.rotation.x = startAngle;
  //     break;
  // }

  this.rotate = function () {
    switch (axis) {
      case 'x':
        dot.rotateX(direction * angle);
        break;
      case 'y':
        dot.rotateY(direction * angle);
        break;
      case 'z':
        dot.rotateZ(direction * angle);
        break;
      case 'x1':
        dot.rotateX(direction * angle);
        dot.rotateY(direction * angle);
        break;
      case 'y1':
        dot.rotateY(direction * angle);
        dot.rotateZ(angle);
        break;
      case 'z1':
        dot.rotateZ(direction * angle);
        dot.rotateX(angle);
        break;
      case 'x2':
        dot.rotateX(direction * angle);
        dot.rotateY(-angle);
        break;
      case 'y2':
        dot.rotateY(direction * angle);
        dot.rotateZ(-angle);
        break;
      case 'z2':
        dot.rotateZ(direction * angle);
        dot.rotateX(-angle);
        break;
    }
  }

  this.getDotContainer = function () {
    return dotContainer;
  };

  this.setPositionToFreeFall = function () {
    if (dot.position.y <= 0) {
      // clock.startTime = 0;
      // clock.oldTime = 0;
      // clock.elapsedTime = 0;
      time = 0;
      dot.position.y = posY;
    } else {
      // dot.position.y = dot.position.y - (9.8 * clock.getElapsedTime() * clock.getElapsedTime() / 2);
      time += 0.006;
      dot.position.y = dot.position.y - (9.8 * time * time);
    }
  };

  this.setPositionToRandomMove = function () {
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
    }
  };
}