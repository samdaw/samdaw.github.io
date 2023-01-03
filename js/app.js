function updateHue() {
  var timeNow = new Date(),
  seconds = timeNow.getSeconds() * 6;
  // ss = timeNow.getMinutes() * 6;
  document.documentElement.style.setProperty("--hue", seconds);
  console.log(seconds);
  setTimeout(updateHue, 1000);
  // setTimeout(updateHue, 10000);
}
updateHue();