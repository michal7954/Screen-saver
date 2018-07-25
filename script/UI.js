function UI() {
  //screensaver
  var screensaver = window.opener.screensaver; //DO NOT DELETE AT ANY CASE

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

  //camera rotation type
  var labCameraRotationType = $('<label>').text("Camera rotation type : ").attr('id', 'labCameraRotationType');
  var inputRadio_cameraRotationType_1 = $('<input>'),
    inputRadio_cameraRotationType_2 = $('<input>');

  var labCameraRotationType_1 = $('<label>').text("Type 1");
  $(inputRadio_cameraRotationType_1).attr({
    "type": "radio",
    "name": "cameraRotationType",
    'id': 'inputRadio_cameraRotationType_1',
    'value': 'type_1',
    'text': 'f'
  });
  $(labCameraRotationType_1).append(inputRadio_cameraRotationType_1);

  var labCameraRotationType_2 = $('<label>').text("Type 2");
  $(inputRadio_cameraRotationType_2).attr({
    "type": "radio",
    "name": "cameraRotationType",
    'id': 'inputRadio_cameraRotationType_2',
    'value': 'type_2'
  });
  $(labCameraRotationType_2).append(inputRadio_cameraRotationType_2);

  $(labCameraRotationType).append(labCameraRotationType_1, labCameraRotationType_2);
  $("#control").append(labCameraRotationType);

  $("#labCameraRotationType input").on("change", function() {
    screensaver.setCameraRotationType($(this).val());
  });

  //logotypeRotationAngle
  var labCameraRotationSpeed = $('<label>').text("Camera rotation speed : ");
  var inputRange_logotypeRotationAngle = $('<input>');
  $(inputRange_logotypeRotationAngle).attr({
    'id': 'inputRange_logotypeRotationAngle',
    "type": "range",
    "min": 0,
    "max": 0.020,
    "step": 0.0001,
    "value": 0.005
  });

  var pValue_1 = $('<p>');
  $(pValue_1).text("0.005");
  $(labCameraRotationSpeed).append(inputRange_logotypeRotationAngle, pValue_1);

  $("#control").append(labCameraRotationSpeed);

  $("#inputRange_logotypeRotationAngle").on("input", function() {
    $(pValue_1).text(parseFloat($(this).val()));
    screensaver.setLogotypeRotationAngle(parseFloat($(this).val()));
  });

  //camera positions
  var labCameraPositionScalar = $('<label>').text("Camera distance : ");

  var inputRange_cameraPositionScalar = $('<input>');
  $(inputRange_cameraPositionScalar).attr({
    'id': 'inputRange_cameraPositionScalar',
    "type": "range",
    "min": 500,
    "max": 2500,
    "step": 1,
    "value": 1000
  });

  var pValue_2 = $('<p>');
  $(pValue_2).text("1000");
  $(labCameraPositionScalar).append(inputRange_cameraPositionScalar, pValue_2);

  $("#control").append(labCameraPositionScalar);

  $("#inputRange_cameraPositionScalar").on("input", function() {
    $(pValue_2).text(parseFloat($(this).val()));
    screensaver.setCameraScalar(parseFloat($(this).val()));
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

  //hemisphereLight
  var labHemisphereLight = $('<label>').text("Hemisphere light : ");
  var inputCheckbox_hLight = $('<input>');
  $(inputCheckbox_hLight).attr({
    'id': 'inputCheckbox_hLight',
    "type": "checkbox",
  });
  $(labHemisphereLight).append(inputCheckbox_hLight);
  $("#control").append(labHemisphereLight);

  $("#inputCheckbox_hLight").change(function() {
    screensaver.setHemisphereLight();
  });

  //background color
  var labBackgroundColor = $('<label>').text("Background : ");
  var blackDiv = $('<div>').attr('id', "blackDiv");
  var whiteDiv = $('<div>').attr('id', "whiteDiv");
  $(labBackgroundColor).append(blackDiv, whiteDiv);
  $("#control").append(labBackgroundColor);

  $("#blackDiv").on('click', function() {
    $(this).css('border', '2px solid white');
    $("#whiteDiv").css('border', '2px solid gray');

    screensaver.setBackgroundColor("black");
  });

  $("#whiteDiv").on('click', function() {
    $(this).css('border', '2px solid black');
    $("#blackDiv").css('border', '2px solid gray');

    screensaver.setBackgroundColor("white");
  });

  //##########To animations############//

  function setSettingsToRandomMove() {
    $("#settingsDiv").empty();
  }

  function setSettingsToElypticalMove() {
    $("#settingsDiv").empty();

    //rotation axis
    var rotationAxisArray = ['x', 'y', 'z', 'x1', 'y1', 'z1', 'x2', 'y2', 'z2'];

    var axisFieldset = $('<fieldset>')
      .attr('id', 'axisFieldset');
    var axisLegend = $('<legend>')
      .text('Rotation axis')
      .attr('align', 'center');
    axisFieldset.append(axisLegend);

    for (let i = 0; i < rotationAxisArray.length; i++) {
      var axisLabel = $('<label>')
        .text(rotationAxisArray[i]);

      var axisCheckbox = $('<input>')
        .val(rotationAxisArray[i])
        .attr({
          'type': 'checkbox'
        });

      axisLabel.append(axisCheckbox);
      axisFieldset.append(axisLabel);
    }

    $("#settingsDiv").append(axisFieldset);

    //rotation direction
    var rotationDirectionArray = [-1, 'Both', 1];

    var rotationDirectionFieldset = $('<fieldset>')
      .attr('id', 'rotationDirectionFieldset');
    var rotationDirectionLegend = $('<legend>')
      .text('Direction')
      .attr('align', 'center');
    rotationDirectionFieldset.append(rotationDirectionLegend);

    for (let i = 0; i < rotationDirectionArray.length; i++) {
      var dirLabel = $('<label>')
        .text(rotationDirectionArray[i]);

      var dirRadio = $('<input>')
        .val(rotationDirectionArray[i])
        .attr({
          'name': 'dir',
          'type': 'radio'
        });

      dirLabel.append(dirRadio);
      rotationDirectionFieldset.append(dirLabel);
    }
    $("#settingsDiv").append(rotationDirectionFieldset);

    //refresh button
    var buttonRefreshDots = $('<button>')
      .attr('id', 'buttonRefreshDots')
      .text('Refresh')
      .on('click', function() {
        var rotationAxisArray = [];

        $.each($('.axisCheckBox:checked'), function(key, value) {
          rotationAxisArray.push($(value).val());
        });
        var dir = $("input[name='dir']:checked").val();

        screensaver.setToElypticalMove(rotationAxisArray, dir);

      });
    $("#settingsDiv").append(buttonRefreshDots);
  }

  function setSettingsToFreeFallMove() {
    $("#settingsDiv").empty();
  }

}