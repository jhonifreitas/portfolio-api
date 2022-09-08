import { BaseModel } from './base';

export class Profile extends BaseModel {
  name: string;
  photo?: string;
  profession_init: Date;

  profession_PT: string;
  profession_EN: string;

  about_PT: string;
  about_EN: string;

  CV_PT?: string;
  CV_EN?: string;

  constructor(data: Profile) {
    super();
    this.name = data.name;
    this.photo = data.photo;
    this.profession_init = data.profession_init;
    this.profession_PT = data.profession_PT;
    this.profession_EN = data.profession_EN;
    this.about_PT = data.about_PT;
    this.about_EN = data.about_EN;
    this.CV_PT = data.CV_PT;
    this.CV_EN = data.CV_EN;
  }
}
