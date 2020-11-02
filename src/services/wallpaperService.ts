import { MosqueModel } from "../models";

export class WallpaperService {
  mosques: MosqueModel[] = [
    {
      filename: "mosque1.jpg",
    },
    {
      filename: "mosque2.jpg",
    }
  ];

  getRandom(): Promise<MosqueModel> {
    const rand = Math.floor(Math.random() * this.mosques.length);
    const mosque = this.mosques[rand]
    return Promise.resolve(mosque)
  }
}