function Dot(material) {

  var center = { x: 9.279999732971191, y: 165.5, z: -10 }

  var axisTab = ['x', 'y', 'z', 'x1', 'y1', 'z1', 'x2', 'y2', 'z2']
  var axis = axisTab[Math.floor(Math.random() * 9)]
  var radius = Math.floor(Math.random() * 1800) + 300
  var angle = Math.random() * 0.006 + 0.001
  var startAngle = Math.random() * 2 * Math.PI - Math.PI
  //console.log(startAngle)
  var geometry = new THREE.SphereGeometry(20, 32, 32);
  //axis = 'x1'
  var direction = 0
  var directionBool = Math.floor(Math.random() * 2)
  if (directionBool)
    direction = 1
  else
    direction = - 1

  var dot = new THREE.Mesh(geometry, material);
  dot.position.y = center.y
  dot.position.z = center.z
  dot.position.x = center.x

  switch (axis) {
    case 'x':
      geometry.translate(0, radius, 0)
      dot.rotation.x = startAngle;
      break;
    case 'y':
      geometry.translate(0, 0, radius)
      dot.rotation.y = startAngle;
      break;
    case 'z':
      geometry.translate(radius, 0, 0)
      dot.rotation.z = startAngle;
      break;
    case 'x1':
      geometry.translate(0, 0, radius)
      dot.rotation.x = startAngle;
      dot.rotation.y = startAngle;
      break;
    case 'x2':
      geometry.translate(0, 0, radius)
      dot.rotation.x = startAngle;
      dot.rotation.y = startAngle;
      break;
    case 'y1':
    case 'y2':
      geometry.translate(radius, 0, 0)
      dot.rotation.y = startAngle;
      dot.rotation.z = startAngle;
      break;
    case 'z1':
    case 'z2':
      geometry.translate(0, radius, 0)
      dot.rotation.z = startAngle;
      dot.rotation.x = startAngle;
      break;
  }

  this.getDot = function () {
    return dot;
  };

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
}