$(document).ready(function () {
  $.getJSON("http://api.aladhan.com/v1/timingsByCity?city=London&country=United Kingdom&method=8", setPrayerTimes);

  setWallpaper();
});

function setWallpaper() {
  var rand = Math.floor(Math.random() * 9);
  var mosque = mosques[rand];

  document.body.style.backgroundImage = "url(" + mosque.path + ")";
}

var mosques = [
  {
    path: "img/mosque1.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque2.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque3.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque4.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque5.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque6.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque7.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque8.jpg",
    name: "test",
    country: "test",
  },
  {
    path: "img/mosque9.jpg",
    name: "test",
    country: "Cairo",
  },
];

function formatTime(t) {
  t = t.replace(/:/, ".");
  return t;
}

function setPrayerTimes(data) {
  let weekday = data.data.date.gregorian.weekday.en;
  let day = data.data.date.gregorian.day
  let month = data.data.date.gregorian.month.en
  let year = data.data.date.gregorian.year

  let hijriWeekday = data.data.date.hijri.day;
  let hijriMonth = data.data.date.hijri.month.en;
  let hijriYear = data.data.date.hijri.year;

  hijriDate = `${hijriWeekday} ${hijriMonth} ${hijriYear}`

  let gregoriandate = `${weekday}, ${day} ${month} ${year}`
  times = data.data.timings;

  var fajr = formatTime(times["Fajr"]);
  var sunrise = formatTime(times["Sunrise"]);
  var dhuhr = formatTime(times["Dhuhr"]);
  var asr = formatTime(times["Asr"]);
  var maghrib = formatTime(times["Maghrib"]);
  var isha = formatTime(times["Isha"]);

  document.getElementById('gregorianDate').innerText = gregoriandate;
  document.getElementById('hijriDate').innerText = hijriDate;
  document.getElementById("fajr").innerText = fajr;
  document.getElementById('sunrise').innerText = sunrise;
  document.getElementById('dhuhr').innerText = dhuhr;
  document.getElementById('asr').innerText = asr;
  document.getElementById('maghrib').innerText = maghrib;
  document.getElementById('isha').innerText = isha;
}
