var _dec, _dec2, _dec3, _class;

import { Component } from "../core/index.js";
import { PrayerTimesService, WallpaperService } from "../services/index.js";
import { formatTime } from "../utils/index.js";
import { PrayerModel } from "../models/index.js";
import '../../../node_modules/reflect-metadata/Reflect.js'; // import 'reflect-metadata';

export let AppComponent = (_dec = Component({
  selector: "app",
  template: `
    <div id="gregorianDate">{{gregorianDate}}</div>
    <div id='hijriDate'>{{hijriDate}}</div>
    <div id="location"></div>
    <hr>
    <div id="container">
      <div class="prayer">
        <div class="prayer-name">Fajr</div>
        <div class="prayer-time" id="fajr">{{fajr}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Sunrise</div>
        <div class="prayer-time" id="sunrise">{{sunrise}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Zuhr</div>
        <div class="prayer-time" id="dhuhr">{{dhuhr}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Asr</div>
        <div class="prayer-time" id="asr">{{asr}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Maghrib</div>
        <div class="prayer-time" id="maghrib">{{maghrib}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Isha</div>
        <div class="prayer-time" id="isha">{{isha}}</div>
      </div>
   </div>;`
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec(_class = _dec2(_class = _dec3(_class = class AppComponent {
  currentWallpaper = "-";
  gregorianDate = "-";
  hijriDate = "-";
  fajr = "-";
  sunrise = "-";
  dhuhr = "-";
  asr = "-";
  maghrib = "-";
  isha = "-";

  constructor(wallpaperService = new WallpaperService(), prayerTimesService = new PrayerTimesService()) {
    this.wallpaperService = wallpaperService;
    this.prayerTimesService = prayerTimesService;
  }

  setWallpaper(path) {
    document.body.style.backgroundImage = `url(${path})`;
    this.currentWallpaper = path;
  }

  setPrayerTimes(prayerTimes) {
    this.gregorianDate = `${prayerTimes.date.gregorian.weekday.en}, ${prayerTimes.date.gregorian.day} ${prayerTimes.date.gregorian.month.en} ${prayerTimes.date.gregorian.year}`;
    this.hijriDate = `${prayerTimes.date.hijri.day} ${prayerTimes.date.hijri.month.en} ${prayerTimes.date.hijri.year}`;
    this.fajr = formatTime(prayerTimes.timings[PrayerModel.Fajr]);
    this.sunrise = formatTime(prayerTimes.timings[PrayerModel.Sunrise]);
    this.dhuhr = formatTime(prayerTimes.timings[PrayerModel.Dhuhr]);
    this.asr = formatTime(prayerTimes.timings[PrayerModel.Asr]);
    this.maghrib = formatTime(prayerTimes.timings[PrayerModel.Maghrib]);
    this.isha = formatTime(prayerTimes.timings[PrayerModel.Isha]);
  }

  async init() {
    let path = await this.wallpaperService.getRandom();
    this.setWallpaper(path);
    let prayerTimes = await this.prayerTimesService.getPrayerTimes();
    this.setPrayerTimes(prayerTimes);
  }

}) || _class) || _class) || _class);