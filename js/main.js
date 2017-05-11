$(document).ready(function() {
    // get prayer times
    $.getJSON('https://muslimsalat.com/daily.json?key=48ac1b295a79364e5197c342429ab6e6&method=4&jsoncallback=?', setPrayerTimes)

    // get islamic calander date
    $.getJSON('https://api.aladhan.com/gToH?', setDate);

    // get a random wallpaper
    getWallpaper();
});

function getWallpaper() {
  var rand = Math.floor(Math.random() * 8);
  document.body.style.backgroundImage = "url(" + mosques[rand].path + ")";

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
  }
  ];

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
