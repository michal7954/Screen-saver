var animationName = "randomMove";

var switchAnimationSelect = $('<select>');
var option = $('<option>').text("Choose animation");
var option_1 = $('<option>').text("Random move");
var option_2 = $('<option>').text("Elyptical move");
var option_3 = $('<option>').text("Free fall move");
$(switchAnimationSelect).attr('id', 'switchAnimationSelect');
$(switchAnimationSelect).append(option, option_1, option_2, option_3);

$("#select").on('input', function() { //select on redo eg "2" also
  selectVal = parseInt($(this).val());

  switch (selectVal) {
    case "Random move":
      animationName = "randomMove";
      break;
    case "Elyptical move":
      animationName = "eliptycalMove";
      break;
    case "Free fall move":
      animationName = "freeFallMove";
      break;
  }
});

$("#control").append(switchAnimationSelect);