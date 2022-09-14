import { BaseModel } from './base';

export class Company extends BaseModel {
  name: string;
  init: Date;
  description_PT: string;
  description_EN: string;

  end?: Date;
  link?: string;
  logo?: string;

  constructor(data: Company) {
    super();
    this.name = data.name;
    this.init = data.init;
    this.description_PT = data.description_PT;
    this.description_EN = data.description_EN;

    if (data.end) this.end = data.end;
    if (data.link) this.link = data.link;
    if (data.logo) this.logo = data.logo;
  }
}
