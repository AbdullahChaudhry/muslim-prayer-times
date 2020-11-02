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
  public _selector: string = "app"
  public _template: string = template
  
  private wallpaperService: WallpaperService;
  private prayerTimesService: PrayerTimesService;

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

    return Promise.all([wallpaperPromise, prayerTimesPromise])
  }

  setWallpaper(path: string): void {
    document.body.style.backgroundImage = `url(${path})`;
  }
}

function render(instance: any) {
  const selector = instance._selector;
  const template = instance._template;
  const HTMLMarkup = renderTemplate(template, instance)
  const appElem: HTMLElement = <HTMLElement>document.getElementById(selector);
  appElem.innerHTML = HTMLMarkup;
}

function initComponent(component: any) {
  const instance = new component();
  instance.init().then(() => render(instance))
}

function init() {
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      initComponent(AppComponent)
    };
  }
}

init()