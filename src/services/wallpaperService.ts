import { MosqueModel } from "../models";

export class WallpaperService {
  mosques: MosqueModel[] = [
    {
      filename: "mosque1.jpg",
    },
    {
      filename: "mosque2.jpg",
    },
    {
      filename: "mosque3.jpg",
    }
  ];

  getRandom(): Promise<string> {
    const rand = Math.floor(Math.random() * this.mosques.length);
    const mosque = this.mosques[rand].filename;

    const imgPath: string = "static/img";
    const path = `${imgPath}/${mosque}`;

    return Promise.resolve(path)
  }
}