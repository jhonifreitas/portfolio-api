import { BaseModel } from './base';

export class Company extends BaseModel {
  name: string;
  link?: string;
  logo?: string;

  constructor(data: Company) {
    super();
    this.name = data.name;
    if (data.link) this.link = data.link;
    if (data.logo) this.logo = data.logo;
  }
}
