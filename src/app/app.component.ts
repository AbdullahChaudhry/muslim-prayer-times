import { Component } from '../core';
import { PrayerTimesService, WallpaperService } from '../services';
import { formatTime } from '../utils';
import { PrayerModel } from '../models';

import '../../node_modules/reflect-metadata/Reflect.js'

// import 'reflect-metadata';

@Component({
  selector: "app",
  template: `
    <div id="gregorianDate">{{gregorianDate}}</div>
    <div id='hijriDate'>{{hijriDate}}</div>
    <div id="location"></div>
    <hr>
    <div id="container">
      <div class="prayer">
        <div class="prayer-name">Fajr</div>
        <div class="prayer-time">{{fajr}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Sunrise</div>
        <div class="prayer-time">{{sunrise}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Zuhr</div>
        <div class="prayer-time">{{dhuhr}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Asr</div>
        <div class="prayer-time">{{asr}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Maghrib</div>
        <div class="prayer-time">{{maghrib}}</div>
      </div>
      <div class="prayer">
        <div class="prayer-name">Isha</div>
        <div class="prayer-time">{{isha}}</div>
      </div>
   </div>;`
})
export class AppComponent {
  private wallpaperService: WallpaperService;
  private prayerTimesService: PrayerTimesService;

  public currentWallpaper: string = "-";
  public gregorianDate: string = "-";
  public hijriDate: string = "-";
  public fajr: string = "-";
  public sunrise: string = "-";
  public dhuhr: string = "-";
  public asr: string = "-";
  public maghrib: string = "-";
  public isha: string = "-";
  
  constructor(wallpaperService = new WallpaperService(), prayerTimesService = new PrayerTimesService()) {
    this.wallpaperService = wallpaperService;
    this.prayerTimesService = prayerTimesService;
  }

  setWallpaper(path: string): void {
    document.body.style.backgroundImage = `url(${path})`;
    this.currentWallpaper = path;
  }

  setPrayerTimes(prayerTimes: any): void {
    this.gregorianDate = `${prayerTimes.date.gregorian.weekday.en}, ${prayerTimes.date.gregorian.day} ${prayerTimes.date.gregorian.month.en} ${prayerTimes.date.gregorian.year}`;
    this.hijriDate = `${prayerTimes.date.hijri.day} ${prayerTimes.date.hijri.month.en} ${prayerTimes.date.hijri.year}`;
    this.fajr = formatTime(prayerTimes.timings[PrayerModel.Fajr]);
    this.sunrise = formatTime(prayerTimes.timings[PrayerModel.Sunrise]);
    this.dhuhr = formatTime(prayerTimes.timings[PrayerModel.Dhuhr]);
    this.asr = formatTime(prayerTimes.timings[PrayerModel.Asr]);
    this.maghrib = formatTime(prayerTimes.timings[PrayerModel.Maghrib]);
    this.isha = formatTime(prayerTimes.timings[PrayerModel.Isha]);
  }

  async init(): Promise<any> {
    let path = await this.wallpaperService.getRandom();
    this.setWallpaper(path);

    let prayerTimes = await this.prayerTimesService.getPrayerTimes();
    this.setPrayerTimes(prayerTimes);
  }
}