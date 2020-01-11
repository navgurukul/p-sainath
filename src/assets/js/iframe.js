$(document).ready(function () {
  var iWidth = $('#textContent').width();
  var iHeight = iWidth * 9 / 16;
  $("iframe#leftTextContent").width(iWidth);
  $("iframe#leftTextContent").height(iHeight);
});
