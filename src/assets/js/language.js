function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var g_lang = getLang();

function getLang() {
  return g_lang || getCookie("lang") || "en";
};

setLang(g_lang);

function setLang(lang) {
  var olang = lang == 'en' ? 'hi' : 'en';
  var language1 = lang == "en" ? "English" : "हिंदी";
  var language2 = lang == "en" ? "हिंदी " : "English";
  $('#selected_option').html(language1);
  $('#other_option').html(language2)
  $('.'+lang).removeClass('d-none');
  $('.'+olang).addClass('d-none');
}

function changeLang() {
  var language = getLang();
  g_lang = language == "en" ? "hi" : "en";
  setCookie("lang", g_lang, 365);
  setLang(g_lang);
  return g_lang;
}