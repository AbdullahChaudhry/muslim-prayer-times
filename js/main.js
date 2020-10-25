const endpoint = "https://api.aladhan.com/v1/timingsByCity"
const country = "United Kingdom";
const city = "London";
const method = 8;
const url = `${endpoint}?city=${city}&country=${country}&method=${method}`

const gregorianDateElem = document.getElementById('gregorianDate');
const hijriDateElem = document.getElementById('hijriDate');
const fajrElem = document.getElementById("fajr");
const sunriseElem = document.getElementById('sunrise');
const dhuhrElem = document.getElementById('dhuhr');
const asrElem = document.getElementById('asr');
const maghribElem = document.getElementById('maghrib');
const ishaElem = document.getElementById('isha');

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    fetch(url)
      .then(res => res.json())
      .then(value => {
        setWallpaper();
        setPrayerTimes(value.data)
      })
      .catch(err => console.log(err))
  }
}

function setWallpaper() {
  var rand = Math.floor(Math.random() * 7);
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
    path: "img/mosque0.jpg"
  },
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
    path: "img/mosque7.jpg"
  },
  {
    path: "img/mosque8.jpg"
  }
];

function formatTime(t) {
  t = t.replace(/:/, ".");
  return t;
}

function setPrayerTimes(data) {
  let gregorian = data.date.gregorian;
  let hijri = data.date.hijri;

  let weekday = gregorian.weekday.en;
  let day = gregorian.day
  let month = gregorian.month.en
  let year = gregorian.year

  let gregoriandate = `${weekday}, ${day} ${month} ${year}`

  let hijriWeekday = hijri.day;
  let hijriMonth = hijri.month.en;
  let hijriYear = hijri.year;

  let hijriDate = `${hijriWeekday} ${hijriMonth} ${hijriYear}`

  let times = data.timings;

  var fajr = formatTime(timeConvert(times["Fajr"]));
  var sunrise = formatTime(timeConvert(times["Sunrise"]));
  var dhuhr = formatTime(timeConvert(times["Dhuhr"]));
  var asr = formatTime(timeConvert(times["Asr"]));
  var maghrib = formatTime(timeConvert(times["Maghrib"]));
  var isha = formatTime(timeConvert(times["Isha"]));

  gregorianDateElem.innerText = gregoriandate
  hijriDateElem.innerText = hijriDate
  fajrElem.innerText = fajr
  sunriseElem.innerText = sunrise
  dhuhrElem.innerText = dhuhr
  asrElem.innerText = asr
  maghribElem.innerText = maghrib
  ishaElem.innerText = isha
}