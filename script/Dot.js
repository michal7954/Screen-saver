function Dot(material) {
  var geometry = new THREE.SphereGeometry(5, 32, 32);
  var dot = new THREE.Mesh(geometry, material);

  this.getDot = function() {
    return dot;
  };


}