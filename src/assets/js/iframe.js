$(document).ready(function () {
  var iWidth = $('#textContent').width();
  var iHeight = iWidth * 9 / 16;
  $("iframe#leftTextContent").width(iWidth);
  $("iframe#leftTextContent").height(iHeight);

  $("#calendarIframe").width(document.body.clientWidth);
  $(".minHeight").css('margin-top',Math.floor($('#mainNav').height()));

  var iWidth = Math.min(document.body.clientWidth, 9/16 * (document.body.clientHeight));
  var iHeight = iWidth * 16/9;

  $("#videoIntro").width(iWidth);
  $("#videoIntro").height(iHeight);
  $("#videoIntro").css('max-height', iHeight);
  $("#videoIntro").css('max-width', iWidth);

  $("#video_overlay").width(iWidth);
  $("#video_overlay").height(iHeight);
  $("#video_overlay").css('max-height', iHeight);
  $("#video_overlay").css('max-width', iWidth);
});
