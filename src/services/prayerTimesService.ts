const endpoint = `https://api.aladhan.com/v1/timingsByCity`;
    const country = `United Kingdom`;
    const city = `London`;
    const method = 8;
    const url = `${endpoint}?city=${city}&country=${country}&method=${method}`;

export class PrayerTimesService {
  getPrayerTimes() {
    return fetch(url)
      .then((url) => url.json())
      .then((res) => res.data);
  }
}