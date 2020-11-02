(function() {
  "use strict";
  var endpoint = "https://api.aladhan.com/v1/timingsByCity";
  var country = "United Kingdom";
  var city = "London";
  var method = 8;
  var url = endpoint + "?city=" + city + "&country=" + country + "&method=" + method;
  var PrayerTimesService = function() {
    function PrayerTimesService() {}
    PrayerTimesService.prototype.getPrayerTimes = function() {
      return fetch(url).then((function(url) {
        return url.json();
      })).then((function(res) {
        return res.data;
      }));
    };
    return PrayerTimesService;
  }();
  var WallpaperService = function() {
    function WallpaperService() {
      this.mosques = [ {
        filename: "mosque1.jpg"
      }, {
        filename: "mosque2.jpg"
      } ];
    }
    WallpaperService.prototype.getRandom = function() {
      var rand = Math.floor(Math.random() * this.mosques.length);
      var mosque = this.mosques[rand];
      return Promise.resolve(mosque);
    };
    return WallpaperService;
  }();
  function toTwelveHour(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [ time ];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1);
 // Remove full string match value
            time[0] = +time[0] % 12 || 12;
 // Adjust hours
        }
    return time.join("");
  }
  function toPeriod(time) {
    return time.replace(/:/, ".");
  }
  function formatTime(time) {
    return toPeriod(toTwelveHour(time));
  }
  var imgPath = "src/static/img";
  var wallpaperService = new WallpaperService;
  wallpaperService.getRandom().then((function(mosque) {
    return renderWallpaper(mosque);
  }));
  document.onreadystatechange = function() {
    if ("complete" === document.readyState) {
      var prayerTimesService = new PrayerTimesService;
      prayerTimesService.getPrayerTimes().then((function(data) {
        return render(data);
      }));
    }
  };
  function renderWallpaper(mosque) {
    document.body.style.backgroundImage = "url(" + imgPath + "/" + mosque.filename + ")";
  }
  function render(data) {
    var gregorian = data.date.gregorian;
    var hijri = data.date.hijri;
    var weekday = gregorian.weekday.en;
    var day = gregorian.day;
    var month = gregorian.month.en;
    var year = gregorian.year;
    var hijriWeekday = hijri.day;
    var hijriMonth = hijri.month.en;
    var hijriYear = hijri.year;
    var gregorianDate = weekday + ", " + day + " " + month + " " + year;
    var hijriDate = hijriWeekday + " " + hijriMonth + " " + hijriYear;
    var times = data.timings;
    var fajr = formatTime(times["Fajr" /* Fajr */ ]);
    var sunrise = formatTime(times["Sunrise" /* Sunrise */ ]);
    var dhuhr = formatTime(times["Dhuhr" /* Dhuhr */ ]);
    var asr = formatTime(times["Asr" /* Asr */ ]);
    var maghrib = formatTime(times["Maghrib" /* Maghrib */ ]);
    var isha = formatTime(times["Isha" /* Isha */ ]);
    var template = '\n  <div id="gregorianDate">' + gregorianDate + "</div>\n      <div id='hijriDate'>" + hijriDate + '</div>\n      <div id="location"></div>\n      <hr>\n      <div id="container">\n        <div class="prayer">\n          <div class="prayer-name">Fajr</div>\n          <div class="prayer-time" id="fajr">' + fajr + '</div>\n        </div>\n        <div class="prayer">\n          <div class="prayer-name">Sunrise</div>\n          <div class="prayer-time" id="sunrise">' + sunrise + '</div>\n        </div>\n        <div class="prayer">\n          <div class="prayer-name">Dhuhr</div>\n          <div class="prayer-time" id="dhuhr">' + dhuhr + '</div>\n        </div>\n        <div class="prayer">\n          <div class="prayer-name">Asr</div>\n          <div class="prayer-time" id="asr">' + asr + '</div>\n        </div>\n        <div class="prayer">\n          <div class="prayer-name">Maghrib</div>\n          <div class="prayer-time" id="maghrib">' + maghrib + '</div>\n        </div>\n        <div class="prayer">\n          <div class="prayer-name">Isha</div>\n          <div class="prayer-time" id="isha">' + isha + "</div>\n        </div>\n      </div>;";
    var app = document.getElementById("app");
    app.innerHTML = template;
  }
})();
