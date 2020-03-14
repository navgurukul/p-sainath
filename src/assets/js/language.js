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
  return "en";
}

function deleteCookie(name) {
  // If the cookie exists
  if (getCookie(name))
    setCookie(name, "", -1);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie=cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log(document.cookie, cname + "=" + cvalue + ";" + expires + ";path=/", getLang());
}

function setLang() {
  var lang = getLang();
  var olang = lang == 'en' ? 'hi' : 'en';
  var language1 = lang == "en" ? "English" : "हिंदी";
  var language2 = lang == "en" ? "हिंदी " : "English";
  $('#selected_option').html(language1);
  $('#other_option').html(language2)
  $('.'+lang).removeClass('d-none');
  $('.'+olang).addClass('d-none');
}

function getLang() {
  return getCookie("lang");
};

setLang();

function changeLang() {
  var language = getLang();
  var lang = language == "en" ? "hi" : "en";
  deleteCookie("lang");
  setCookie("lang", lang, 365);
  console.log(language, lang, getLang());
  setLang();
  return lang;
}