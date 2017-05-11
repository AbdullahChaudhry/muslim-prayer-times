$(document).ready(function() {
    // get prayer times
    $.getJSON('https://muslimsalat.com/daily.json?key=48ac1b295a79364e5197c342429ab6e6&method=4&jsoncallback=?', setPrayerTimes)

    // get islamic calander date
    $.getJSON('https://api.aladhan.com/gToH?', setDate);

    // get a random wallpaper
    getWallpaper();
});

function getWallpaper() {
  var rand = Math.floor(Math.random() * 9);

  var mosque = mosques[rand];

  // set the background image
  document.body.style.backgroundImage = "url(" + mosque.path + ")";

  // info box
  // var info = document.getElementById('info');
  // info.innerText = mosque.country;

  // debugging
  console.log("url(" + mosques[rand].path + ")");
}
  //data
  var mosques = [
  {
      path: 'img/mosque1.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque2.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque3.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque4.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque5.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque6.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque7.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque8.jpg',
      name: 'test',
      country: 'test'
  },
  {
      path: 'img/mosque9.jpg',
      name: 'test',
      country: 'Cairo'
  }
  ];

  function setDate(data) {

    data = data.data;

    // gregorian calander date
    var gregorianDate = document.getElementById('gregorianDate');

   // abbreviate weekday
    var weekday = (data.gregorian.weekday.en);

    // set the gregorian date
    gregorianDate.innerText = weekday + ', ' +  data.gregorian.day + ' ' + data.gregorian.month.en + ' ' + data.gregorian.year;

    // islamic calander date
    var islamicDate = document.getElementById('islamicDate');
    islamicDate.innerText = data.hijri.day + ' ' + data.hijri.month.en + ' ' + data.hijri.year;
  }

  // format the time
  function timeFormat(t) {
    t = t.replace(/:/, '.');
    return t;
  }

  function setPrayerTimes(times) {
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
