import { BaseModel } from './base';

export class Service extends BaseModel {
  title_PT!: string;
  title_EN!: string;

  icon!: string;

  description_PT!: string;
  description_EN!: string;

  constructor(data: Service) {
    super();
    this.title_PT = data.title_PT;
    this.title_EN = data.title_EN;
    this.icon = data.icon;
    this.description_PT = data.description_PT;
    this.description_EN = data.description_EN;
  }
}
