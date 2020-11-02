import { PrayerTimesService, WallpaperService } from "./services";
import { PrayerModel } from './models'
import { formatTime } from "./utils/time";

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    const prayerTimesService = new PrayerTimesService();
    const wallpaperService = new WallpaperService();
    
    wallpaperService
      .getRandom()
      .then((path: string) => renderWallpaper(path));

    prayerTimesService
      .getPrayerTimes()
      .then((data) => render(data));
  }
};

function renderWallpaper(path: string) {
  document.body.style.backgroundImage = `url(${path})`;
}

function render(data: any) {
  const gregorian = data.date.gregorian;
  const hijri = data.date.hijri;

  const weekday = gregorian.weekday.en;
  const day = gregorian.day;
  const month = gregorian.month.en;
  const year = gregorian.year;

  const hijriWeekday = hijri.day;
  const hijriMonth = hijri.month.en;
  const hijriYear = hijri.year;

  const gregorianDate = `${weekday}, ${day} ${month} ${year}`;
  const hijriDate = `${hijriWeekday} ${hijriMonth} ${hijriYear}`;

  const times = data.timings;

  const fajr = formatTime(times[PrayerModel.Fajr]);
  const sunrise = formatTime(times[PrayerModel.Sunrise]);
  const dhuhr = formatTime(times[PrayerModel.Dhuhr]);
  const asr = formatTime(times[PrayerModel.Asr]);
  const maghrib = formatTime(times[PrayerModel.Maghrib]);
  const isha = formatTime(times[PrayerModel.Isha]);

  const template = `
  <div id="gregorianDate">${gregorianDate}</div>
      <div id='hijriDate'>${hijriDate}</div>
      <div id="location"></div>
      <hr>
      <div id="container">
        <div class="prayer">
          <div class="prayer-name">Fajr</div>
          <div class="prayer-time" id="fajr">${fajr}</div>
        </div>
        <div class="prayer">
          <div class="prayer-name">Sunrise</div>
          <div class="prayer-time" id="sunrise">${sunrise}</div>
        </div>
        <div class="prayer">
          <div class="prayer-name">Dhuhr</div>
          <div class="prayer-time" id="dhuhr">${dhuhr}</div>
        </div>
        <div class="prayer">
          <div class="prayer-name">Asr</div>
          <div class="prayer-time" id="asr">${asr}</div>
        </div>
        <div class="prayer">
          <div class="prayer-name">Maghrib</div>
          <div class="prayer-time" id="maghrib">${maghrib}</div>
        </div>
        <div class="prayer">
          <div class="prayer-name">Isha</div>
          <div class="prayer-time" id="isha">${isha}</div>
        </div>
      </div>;`

      const app: HTMLElement = <HTMLElement>document.getElementById('app');
      app.innerHTML = template
}