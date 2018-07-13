function Dot(material, axis) {

  var center = { x: 9.279999732971191, y: 165.5, z: -10 }

  var geometry = new THREE.SphereGeometry(20, 32, 32);
  switch (axis) {
    case 'x':
      geometry.translate(0, 320, 0)
      break;
    case 'y':
      geometry.translate(0, 0, 320)
      break;
    case 'z':
      geometry.translate(320, 0, 0)
      break;
  }

  var dot = new THREE.Mesh(geometry, material);
  dot.position.y = center.y
  dot.position.z = center.z
  dot.position.x = center.x

  this.getDot = function () {
    return dot;
  };

  this.rotate = function () {
    switch (axis) {
      case 'x':
        dot.rotateX(0.01);
        break;
      case 'y':
        dot.rotateY(0.01);
        break;
      case 'z':
        dot.rotateZ(0.01);
        break;
    }
  }
}