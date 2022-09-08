import { BaseModel } from './base';

export class Social extends BaseModel {
  link!: string;
  type: SocialType;

  constructor(data: Social) {
    super();
    this.type = data.type;
    this.link = data.link;
  }
}

export type SocialType = 'email' | 'phone' | 'whatsapp' | 'linked-in' | 'github' | 'facebook';
