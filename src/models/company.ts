import { BaseModel } from './base';

export class Company extends BaseModel {
  name: string;
  init: Date;
  description: string;

  end?: Date;
  link?: string;
  logo?: string;

  constructor(data: Company) {
    super();
    this.name = data.name;
    this.init = data.init;
    this.description = data.description;

    if (data.end) this.end = data.end;
    if (data.link) this.link = data.link;
    if (data.logo) this.logo = data.logo;
  }
}
