//main variables of two windows
var settings = localStorage.getItem("settings");
var controlPanelWindow;
var screensaver = new Screensaver(); //create Screensaver

//controlPanelDiv : index.html
var controlPanelDiv = $('<div>');
$(controlPanelDiv)
  .attr('id', 'controlPanelDiv')
  .on('click', () => openControlPanelWindow())
  .css('display', 'none');
//.text("CP");
$("#root").prepend(controlPanelDiv);

//opening controlPanelWindow
function openControlPanelWindow() {
  controlPanelWindow = window.open("controlPanel.html", "", "width=600, height=600");
  $("#controlPanelDiv").css({
    'display': 'none'
  });
}
openControlPanelWindow();

//screensaver window on before close event
$(window).on("beforeunload", function() {
  controlPanelWindow.close();
});