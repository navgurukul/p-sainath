$(document).ready(function () {
  var classes = ["info", "warning", "dark", "secondary", "danger", "primary"]
  $('.bgRandom').each(function (index) {
    console.log($(this).addClass("badge-" + classes[Math.floor(Math.random() * classes.length)]));
  })
});
//# sourceMappingURL=randomBadge.js.map
