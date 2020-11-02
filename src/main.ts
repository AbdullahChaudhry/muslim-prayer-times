import { PrayerTimesService, WallpaperService } from './services';
import { formatTime, renderTemplate } from './utils';
import { PrayerModel } from './models'

const template = `
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
        <div class="prayer-name">Dhuhr</div>
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

class AppComponent {
  private wallpaperService: WallpaperService;
  private prayerTimesService: PrayerTimesService;

  public _template: string = template
  public currentWallpaper: string|null = null;
  public gregorianDate: string|null = null;
  public hijriDate: string|null = null;

  public fajr: string|null = null;
  public sunrise: string|null = null;
  public dhuhr: string|null = null;
  public asr: string|null = null;
  public maghrib: string|null = null;
  public isha: string|null = null;
  
  constructor(wallpaperService = new WallpaperService(), prayerTimesService = new PrayerTimesService()) {
    this.wallpaperService = wallpaperService;
    this.prayerTimesService = prayerTimesService;
  }

  init(): Promise<any> {
    const promiseA = this.wallpaperService.getRandom().then(path => {
      this.currentWallpaper = path;
      this.setWallpaper(path)
    })
    
    const promiseB = this.prayerTimesService.getPrayerTimes().then(data => {
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

    return Promise.all([promiseA, promiseB])
  }

  setWallpaper(path: string): void {
    document.body.style.backgroundImage = `url(${path})`;
  }
}

function render(appComponent: any) {
  const appInstance = new appComponent();
  appInstance.init().then(() => {
    const template = renderTemplate(appInstance._template, appInstance)
    const appElem: HTMLElement = <HTMLElement>document.getElementById("app");
    
    appElem.innerHTML = template;
  })
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    render(AppComponent)
  };
}