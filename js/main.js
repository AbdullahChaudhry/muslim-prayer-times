getPrayerTimes();

// get quote from api
function getPrayerTimes() {

  const url = 'http://cors-proxy.htmldriven.com/?url=https://muslimsalat.com/daily.json?key=48ac1b295a79364e5197c342429ab6e6';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function() {
    if (xhr.status === 200) {
      var object = JSON.parse(xhr.responseText);
      var data = JSON.parse(object.body);

      // store prayer times
      var fajr = timeFormat(data.items[0].fajr);
      var sunrise = timeFormat(data.items[0].shurooq);
      var dhuhr = timeFormat(data.items[0].dhuhr);
      var asr = timeFormat(data.items[0].asr);
      var maghrib = timeFormat(data.items[0].maghrib);
      var isha = timeFormat(data.items[0].isha);

      setPrayerTimes(fajr, sunrise, dhuhr, asr, maghrib, isha);
    }
    else {
      console.log("error: " + xhr.status);
    }
  }
}

// format the time
function timeFormat(t) {
  t = t.replace(/[A-Z\s]/ig, '').replace(/:/, '.');
  return t.length <= 4 ? '0' + t : t;
}

// set the quote to textbox
function setPrayerTimes(fajr, sunrise, dhuhr, asr, maghrib, isha) {
  document.getElementById('fajr').innerText = fajr;
  document.getElementById('sunrise').innerText = sunrise;
  document.getElementById('dhuhr').innerText = dhuhr;
  document.getElementById('asr').innerText = asr;
  document.getElementById('maghrib').innerText = maghrib;
  document.getElementById('isha').innerText = isha;
}
