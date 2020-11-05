export class WallpaperService {
  mosques = [{
    filename: "mosque1.jpg"
  }, {
    filename: "mosque2.jpg"
  }];

  getRandom() {
    const rand = Math.floor(Math.random() * this.mosques.length);
    const mosque = this.mosques[rand].filename;
    const imgPath = "src/static/img";
    const path = `${imgPath}/${mosque}`;
    return Promise.resolve(path);
  }

}