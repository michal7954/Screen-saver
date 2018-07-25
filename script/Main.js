//main variables
var screensaver = new Screensaver();
var counter = parseInt(localStorage.getItem("counter"))
if (!counter) {
  localStorage.setItem("counter", 1);
}
else {
  localStorage.setItem("counter", counter + 1);
}
console.log(parseInt(localStorage.getItem("counter")))
var controlPanelWindow;

//controlPanelDiv
var controlPanelDiv = $('<div>');
$(controlPanelDiv).attr({
  'id': 'controlPanelDiv'
})
  .on('click', function () {
    openWin();
  })
  .css({
    'display': 'none'
  })
  .text("CP");
$("#root").prepend(controlPanelDiv);

function openWin() {
  controlPanelWindow = window.open("controlPanel.html", "", "width=600, height=600");
  $("#controlPanelDiv").css({
    'display': 'none'
  });
}
openWin();

$(window).on("beforeunload", function () {
  controlPanelWindow.close();
});
