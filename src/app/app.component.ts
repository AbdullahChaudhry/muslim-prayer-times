import { Component } from '../core';
import { PrayerTimesService, WallpaperService } from '../services';
import { formatTime } from '../utils';
import { PrayerModel } from '../models';

import { render } from '../core/platform-browser-dynamic';

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
  }

  init(): void {
    console.log(Reflect)

    const wallpaperPromise = this.wallpaperService.getRandom().then(path => {
      this.currentWallpaper = path;
      this.setWallpaper(path)
    })
    
    const prayerTimesPromise = this.prayerTimesService.getPrayerTimes().then(data => {
      const gregorian = data.date.gregorian;
      const hijri = data.date.hijri;
      const times = data.timings;

      const weekday = gregorian.weekday.en;
      const day = gregorian.day;
      const month = gregorian.month.en;
      const year = gregorian.year;
  
      const hijriWeekday = hijri.day;
      const hijriMonth = hijri.month.en;
      const hijriYear = hijri.year;
  
      this.gregorianDate = `${weekday}, ${day} ${month} ${year}`;
      this.hijriDate = `${hijriWeekday} ${hijriMonth} ${hijriYear}`;
      this.fajr = formatTime(times[PrayerModel.Fajr]);
      this.sunrise = formatTime(times[PrayerModel.Sunrise]);
      this.dhuhr = formatTime(times[PrayerModel.Dhuhr]);
      this.asr = formatTime(times[PrayerModel.Asr]);
      this.maghrib = formatTime(times[PrayerModel.Maghrib]);
      this.isha = formatTime(times[PrayerModel.Isha]);
    })

    Promise.all([wallpaperPromise, prayerTimesPromise])
      .then(() => render(this))
    }
}
