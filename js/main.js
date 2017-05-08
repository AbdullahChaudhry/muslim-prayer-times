$(document).ready(function() {
    // get prayer times
    $.getJSON('https://muslimsalat.com/daily.json?key=48ac1b295a79364e5197c342429ab6e6&jsoncallback=?', setPrayerTimes)

    // get islamic calander date
    $.getJSON('https://api.aladhan.com/gToH?', setDate);
});

function setDate(data) {
  var islamicDate = document.getElementById('islamicDate');
  islamicDate.innerText = data.data.hijri.day + ' ' + data.data.hijri.month.en + ', ' + data.data.hijri.year;
}

// format the time
function timeFormat(t) {
  t = t.replace(/:/, '.');
  return t;
}

function setPrayerTimes(times) {

  // store properties as variables
  var location = times.city + ", " + times.country;
  var fajr = timeFormat(times.items[0].fajr);
  var shurooq = timeFormat(times.items[0].shurooq);
  var dhuhr = timeFormat(times.items[0].dhuhr);
  var asr = timeFormat(times.items[0].asr);
  var maghrib = timeFormat(times.items[0].maghrib);
  var isha = timeFormat(times.items[0].isha);

  // set the prayer times to textbox
  document.getElementById('location').innerText = location;
  document.getElementById('fajr').innerText = fajr;
  document.getElementById('sunrise').innerText = shurooq;
  document.getElementById('dhuhr').innerText = dhuhr;
  document.getElementById('asr').innerText = asr;
  document.getElementById('maghrib').innerText = maghrib;
  document.getElementById('isha').innerText = isha;
}
