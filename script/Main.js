var screensaver = new Screensaver();
(function openWin() {
  myWindow = window.open("controlPanel.html", "", "width=600, height=600");
})();

var counter = parseInt(localStorage.getItem("counter"))
if (!counter) {
  localStorage.setItem("counter", 1);
}
else {
  localStorage.setItem("counter", counter + 1);
}
console.log(parseInt(localStorage.getItem("counter")))
