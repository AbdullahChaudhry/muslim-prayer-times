const endpoint = "https://api.aladhan.com/v1/timingsByCity"
const country = "United Kingdom";
const city = "London";
const method = 8;
const url = `${endpoint}?city=${city}&country=${country}&method=${method}`

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    fetch(url)
      .then(res => res.json())
      .then(value => {
        setWallpaper();
        setPrayerTimes(value)
      })
  }
}

function setWallpaper() {
  var rand = Math.floor(Math.random() * 9);
  var mosque = mosques[rand];

  document.body.style.backgroundImage = "url(" + mosque.path + ")";
}

function timeConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join ('');
}

var mosques = [
  {
    path: "img/mosque1.jpg"
  },
  {
    path: "img/mosque2.jpg"
  },
  {
    path: "img/mosque3.jpg"
  },
  {
    path: "img/mosque4.jpg"
  },
  {
    path: "img/mosque5.jpg"
  },
  {
    path: "img/mosque6.jpg"
  },
  {
    path: "img/mosque7.jpg"
  },
  {
    path: "img/mosque8.jpg"
  },
  {
    path: "img/mosque9.jpg"
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

  var fajr = formatTime(timeConvert(times["Fajr"]));
  var sunrise = formatTime(timeConvert(times["Sunrise"]));
  var dhuhr = formatTime(timeConvert(times["Dhuhr"]));
  var asr = formatTime(timeConvert(times["Asr"]));
  var maghrib = formatTime(timeConvert(times["Maghrib"]));
  var isha = formatTime(timeConvert(times["Isha"]));

  document.getElementById('gregorianDate').innerText = gregoriandate;
  document.getElementById('hijriDate').innerText = hijriDate;
  document.getElementById("fajr").innerText = fajr;
  document.getElementById('sunrise').innerText = sunrise;
  document.getElementById('dhuhr').innerText = dhuhr;
  document.getElementById('asr').innerText = asr;
  document.getElementById('maghrib').innerText = maghrib;
  document.getElementById('isha').innerText = isha;
}
