import { BaseModel } from './base';

export class Skill extends BaseModel {
  name!: string;
  years: number;
  percent: number;

  constructor(data: Skill) {
    super();
    this.name = data.name;
    this.years = data.years;
    this.percent = data.percent;
  }
}
