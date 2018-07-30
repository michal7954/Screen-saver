function UI() {
  //screensaver object reference
  var screensaver = window.opener.screensaver; //DO NOT DELETE AT ANY CASE
  screensaver.addStats($("#control"));

  var data = {
    currentAnimation: '---Choose animation type---',
    cameraRotationType: 'type_1',
    cameraRotationSpeed: 0.005,
    cameraDistance: 1000,
    mirror: false,
    hemisphereLight: false,
    backgroundColor: 'black',
    dotsSpeed: 10,
    maxDotsRadius: 600,
    rotationAxis: ['x', 'y', 'z', 'x1', 'y1', 'z1', 'x2', 'y2', 'z2'],
    direction: 0,
    freeFallMoveType: 'bouncing'
  };

  //restoring data from local storage
  var dataStoraged = JSON.parse(localStorage.getItem("settings"));
  console.log(dataStoraged);

  if (dataStoraged !== null) {
    data = dataStoraged;
  }

  //controlPanel window on before close event
  $(window).on("beforeunload", function () {
    saveLocalStorageData();
    window.opener.$("#controlPanelDiv").css({
      'display': 'flex'
    });
    //onclose : later restore form localStorage
  });

  //##############Title################//
  var pConfigurationPanel = $('<p>').attr('id', 'ptitle');
  $(pConfigurationPanel).html("<p><b>Configutation panel</b></p>");
  $("#control").prepend(pConfigurationPanel);

  //##############Select################//
  var switchAnimationSelect = $('<select>');

  var option = $('<option>').text("---Choose animation type---");
  var option_1 = $('<option>').text("Random move");
  var option_2 = $('<option>').text("Elyptical move");
  var option_3 = $('<option>').text("Free fall move");

  $(switchAnimationSelect).attr('id', 'switchAnimationSelect');
  $(switchAnimationSelect).append(option, option_1, option_2, option_3);
  $("#control").append(switchAnimationSelect);

  $("#switchAnimationSelect").change(function () {
    switchAnimationSelectOnChange();
  });

  function switchAnimationSelectOnChange() { //select on redo eg "2" also
    selectVal = $("#switchAnimationSelect").val();
    switch (selectVal) {
      case "Random move":
        setSettingsToRandomMove();
        screensaver.setToRandomMove();
        data.currentAnimation = 'Random move';
        break;
      case "Elyptical move":
        console.log("deas");

        setSettingsToElypticalMove();
        screensaver.setToElypticalMove();
        data.currentAnimation = 'Elyptical move';
        break;
      case "Free fall move":
        setSettingsToFreeFallMove();
        screensaver.setToFreeFallMove();
        data.currentAnimation = 'Free fall move';
        break;
    }
  }

  //##############Settings div for specific type of animation################//
  var settingsDiv = $('<div>');
  $(settingsDiv).attr('id', 'settingsDiv');
  $("#control").append(settingsDiv);

  //##########Custom############//

  //camera rotation type
  var labCameraRotationType = $('<label>').text("Camera rotation type : ").attr('id', 'labCameraRotationType');
  var inputRadio_cameraRotationType_1 = $('<input>');
  inputRadio_cameraRotationType_2 = $('<input>');

  var labCameraRotationType_1 = $('<label>').text("Type 1");
  $(inputRadio_cameraRotationType_1).attr({
    "type": "radio",
    "name": "cameraRotationType",
    'id': 'inputRadio_cameraRotationType_1',
    'value': 'type_1'
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

  $("#labCameraRotationType input").on("change", function () {
    screensaver.setCameraRotationType($(this).val());
    data.cameraRotationType = $(this).val();
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


  $("#inputRange_logotypeRotationAngle").on("input", function () {
    $(pValue_1).text(parseFloat($(this).val()));
    screensaver.setLogotypeRotationAngle(parseFloat($(this).val()));
    data.cameraRotationSpeed = parseFloat($(this).val());
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

  $("#inputRange_cameraPositionScalar").on("input", function () {
    $(pValue_2).text(parseFloat($(this).val()));
    screensaver.setCameraScalar(parseFloat($(this).val()));
    data.cameraDistance = parseFloat($(this).val());
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

  $("#inputCheckbox_mirror").change(function () {
    screensaver.setMirror();
    data.mirror = $(this)[0].checked;
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

  $("#inputCheckbox_hLight").change(function () {
    screensaver.setHemisphereLight();
    data.hemisphereLight = $(this)[0].checked;
  });


  //background color
  var labBackgroundColor = $('<label>').text("Background : ");
  var blackDiv = $('<div>').attr('id', "blackDiv");
  var whiteDiv = $('<div>').attr('id', "whiteDiv");
  $(labBackgroundColor).append(blackDiv, whiteDiv);
  $("#control").append(labBackgroundColor);

  $("#blackDiv").on('click', function () {
    $(this).css('border', '2px solid #f58220');
    $("#whiteDiv").css('border', '2px solid gray');
    screensaver.setBackgroundColor("black");
    data.backgroundColor = 'black';
  });

  $("#whiteDiv").on('click', function () {
    $(this).css('border', '2px solid #f58220');
    $("#blackDiv").css('border', '2px solid gray');
    screensaver.setBackgroundColor("white");
    data.backgroundColor = 'white';
  });

  //##########Update settings from storage##############///

  $("#switchAnimationSelect").val(data.currentAnimation);
  switchAnimationSelectOnChange();

  $("#labCameraRotationType input[value='" + data.cameraRotationType + "']").attr('checked', 'checked');
  screensaver.setCameraRotationType(data.cameraRotationType);

  $('#inputRange_logotypeRotationAngle').val(data.cameraRotationSpeed);
  $(pValue_1).text(data.cameraRotationSpeed);
  screensaver.setLogotypeRotationAngle(data.cameraRotationSpeed);

  $('#inputRange_cameraPositionScalar').val(data.cameraDistance);
  $(pValue_2).text(data.cameraDistance);
  screensaver.setCameraScalar(data.cameraDistance);

  if (data.mirror) {
    $('#inputCheckbox_mirror').prop('checked', true);
    if (!screensaver.isMirrorSet()) {
      screensaver.setMirror();
    }
  }

  if (data.hemisphereLight) {
    $('#inputCheckbox_hLight').prop('checked', true);
    if (!screensaver.isHemisphereLightSet()) {
      screensaver.setHemisphereLight();
    }
  }

  if (data.backgroundColor == 'black') {
    $('#blackDiv').css('border', '2px solid white');
    $("#whiteDiv").css('border', '2px solid gray');
    screensaver.setBackgroundColor("black");
  } else if (data.backgroundColor == 'white') {
    $('#whiteDiv').css('border', '2px solid black');
    $("#blackDiv").css('border', '2px solid gray');
    screensaver.setBackgroundColor("white");
  }

  //##########To animations############/

  function saveLocalStorageData() {
    console.log(JSON.stringify(data));
    localStorage.setItem("settings", JSON.stringify(data));
  }

  function setSettingsToRandomMove() {
    $("#settingsDiv").empty();

    //dotsSpeed
    var labDotsSpeed = $('<label>').text("Dots speed : ");
    var inputRange_dotsSpeed = $('<input>');
    $(inputRange_dotsSpeed).attr({
      'id': 'inputRange_dotsSpeed',
      "type": "range",
      "min": 1,
      "max": 20,
      "step": 1,
      "value": data.dotsSpeed
    });

    var pValue_3 = $('<p>');
    $(pValue_3).text(data.dotsSpeed);
    $(labDotsSpeed).append(inputRange_dotsSpeed, pValue_3);
    $("#settingsDiv").append(labDotsSpeed);
    screensaver.setDotsSpeed(20 - data.dotsSpeed + 1)

    $("#inputRange_dotsSpeed").on("input", function () {
      var val = parseFloat($(this).val())
      data.dotsSpeed = val
      $(pValue_3).text(val);
      screensaver.setDotsSpeed(20 - val + 1);
    });

    //maxDotsRadius
    var labMaxDotsRadius = $('<label>').text("Max dots radius : ");
    var inputRange_maxDotsRadius = $('<input>');
    $(inputRange_maxDotsRadius).attr({
      'id': 'inputRange_maxDotsRadius',
      "type": "range",
      "min": 100,
      "max": 800,
      "step": 10,
      "value": data.maxDotsRadius
    });

    var pValue_4 = $('<p>');
    $(pValue_4).text(data.maxDotsRadius);
    $(labMaxDotsRadius).append(inputRange_maxDotsRadius, pValue_4);
    $("#settingsDiv").append(labMaxDotsRadius);
    screensaver.setMaxDotsRadius(data.maxDotsRadius);

    $("#inputRange_maxDotsRadius").on("input", function () {
      var val = parseFloat($(this).val());
      data.maxDotsRadius = val
      $(pValue_4).text(val);
      screensaver.setMaxDotsRadius(val);
    });
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
        .attr('type', 'checkbox')
        .addClass('axisCheckbox');

      if (data.rotationAxis.includes(rotationAxisArray[i])) {
        $(axisCheckbox).attr('checked', 'checked');
      }

      axisLabel.append(axisCheckbox);
      axisFieldset.append(axisLabel);
    }

    $("#settingsDiv").append(axisFieldset);

    //rotation direction
    var rotationDirectionArray = [-1, 0, 1];

    var rotationDirectionFieldset = $('<fieldset>')
      .attr('id', 'rotationDirectionFieldset');
    var rotationDirectionLegend = $('<legend>')
      .text('Direction')
      .attr('align', 'center');
    rotationDirectionFieldset.append(rotationDirectionLegend);

    for (let i = 0; i < rotationDirectionArray.length; i++) {
      var dirLabel = $('<label>');
      if (i == 1) {
        $(dirLabel).text('Both');
      } else {
        $(dirLabel).text(rotationDirectionArray[i]);
      }

      var dirRadio = $('<input>')
        .val(rotationDirectionArray[i])
        .attr({
          'name': 'dir',
          'type': 'radio'
        });

      if (data.direction == rotationDirectionArray[i]) {
        $(dirRadio).attr('checked', 'checked');
      }

      dirLabel.append(dirRadio);
      rotationDirectionFieldset.append(dirLabel);
    }
    $("#settingsDiv").append(rotationDirectionFieldset);
    screensaver.setToElypticalMove(data.rotationAxis, data.direction);

    //refresh button
    var buttonRefreshDots = $('<button>')
      .attr('id', 'buttonRefreshDots')
      .text('Refresh')
      .on('click', function () {
        var rotationAxisArray = [];
        $.each($('.axisCheckbox:checked'), function (key, value) {
          rotationAxisArray.push($(value).val());
        });
        var dir = $("input[name='dir']:checked").val();
        screensaver.setToElypticalMove(rotationAxisArray, dir);
        data.rotationAxis = rotationAxisArray;
        data.direction = dir;
      });
    $("#settingsDiv").append(buttonRefreshDots);
  }

  function setSettingsToFreeFallMove() {
    $("#settingsDiv").empty();

    //freeFallMoveType
    var labFreeFallMoveType = $('<label>').text("Fall type : ").attr('id', 'labFreeFallMoveType');
    var inputRadio_freeFallMoveType_bouncing = $('<input>'),
      inputRadio_freeFallMoveType_rainDrop = $('<input>');

    var labFreeFallMoveType_bouncing = $('<label>').text("Bouncing");
    $(inputRadio_freeFallMoveType_bouncing).attr({
      "type": "radio",
      "name": "freeFallMoveType",
      'id': 'inputRadio_freeFallMoveType_bouncing',
      'value': 'bouncing',
    });
    $(labFreeFallMoveType_bouncing).append(inputRadio_freeFallMoveType_bouncing);

    var labFreeFallMoveType_rainDrop = $('<label>').text("Rain drop");
    $(inputRadio_freeFallMoveType_rainDrop).attr({
      "type": "radio",
      "name": "freeFallMoveType",
      'id': 'inputRadio_freeFallMoveType_rainDrop',
      'value': 'rainDrop'
    });

    $(labFreeFallMoveType_rainDrop).append(inputRadio_freeFallMoveType_rainDrop);
    $(labFreeFallMoveType).append(labFreeFallMoveType_bouncing, labFreeFallMoveType_rainDrop);
    $("#settingsDiv").append(labFreeFallMoveType);

    $("#labFreeFallMoveType input[value='" + data.freeFallMoveType + "']").attr('checked', 'checked');
    screensaver.setFreeFallMoveType(data.freeFallMoveType);

    $("#labFreeFallMoveType input").on("input", function () {
      var val = $(this).val()
      data.freeFallMoveType = val
      screensaver.setFreeFallMoveType(val);
    });
  }
}