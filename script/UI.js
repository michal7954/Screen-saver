function UI() {
  //##############Title################//
  var pConfigurationPanel = $('<p>');
  $(pConfigurationPanel).text("Configutation panel");
  $("#control").append(pConfigurationPanel);

  //##############Select################//
  var switchAnimationSelect = $('<select>');

  var option = $('<option>').text("---Choose animation---");
  var option_1 = $('<option>').text("Random move");
  var option_2 = $('<option>').text("Elyptical move");
  var option_3 = $('<option>').text("Free fall move");

  $(switchAnimationSelect).attr('id', 'switchAnimationSelect');
  $(switchAnimationSelect).append(option, option_1, option_2, option_3);
  $("#control").append(switchAnimationSelect);

  $("#switchAnimationSelect").change(function() { //select on redo eg "2" also
    selectVal = $(this).val();
    switch (selectVal) {
      case "Random move":
        setSettingsToRandomMove();
        screensaver.setToRandomMove();
        break;
      case "Elyptical move":
        setSettingsToElypticalMove();
        screensaver.setToElypticalMove();
        break;
      case "Free fall move":
        setSettingsToFreeFallMove();
        screensaver.setToFreeFallMove();
        break;
    }
  });

  //##############Settings################//
  var settingsDiv = $('<div>');
  $(settingsDiv).attr('id', 'settingsDiv');
  $("#control").append(settingsDiv);

  //##########Custom############//

  //logotypeRotationAngle
  var labCameraRotationSpeed = $('<label>').text("Camera rotation speed : ");
  var inputRange_logotypeRotationAngle = $('<input>');
  $(inputRange_logotypeRotationAngle).attr({
    'id': 'inputRange_logotypeRotationAngle',
    "type": "range",
    "min": 0,
    "max": 0.02,
    "step": 0.0001,
    "value": 0.005
  });
  $(labCameraRotationSpeed).append(inputRange_logotypeRotationAngle);
  $("#control").append(labCameraRotationSpeed);

  $("#inputRange_logotypeRotationAngle").on("input", function() {
    screensaver.setLogotypeRotationAngle(parseFloat($(this).val()));
  });

  //mirror
  var labMirror = $('<label>').text("Mirror : ");
  var inputCheckbox_mirror = $('<input>');
  $(inputCheckbox_mirror).attr({
    'id': 'inputCheckbox_mirror',
    "type": "checkbox",
  });
  $(labMirror).append(inputCheckbox_mirror);
  $("#control").append(labMirror);

  $("#inputCheckbox_mirror").change(function() {
    screensaver.setMirror();
  });

  //##########To animations############//

  function setSettingsToRandomMove() {
    $("#settingsDiv").empty();
  }

  function setSettingsToElypticalMove() {
    $("#settingsDiv").empty();
  }

  function setSettingsToFreeFallMove() {
    $("#settingsDiv").empty();
  }

}