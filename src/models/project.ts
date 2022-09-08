import { BaseModel } from './base';

export class Project extends BaseModel {
  companyId: string;
  skillIds: string[];

  name: string;
  type: ProjectType;
  link?: string;

  description_PT: string;
  description_EN: string;

  images: string[];
  featured_image: number;

  constructor(data: Project) {
    super();
    this.companyId = data.companyId;
    this.skillIds = data.skillIds || [];
    this.name = data.name;
    this.type = data.type;
    this.description_PT = data.description_PT;
    this.description_EN = data.description_EN;
    this.images = data.images || [];
    this.featured_image = data.featured_image || 0;
  }
}

export type ProjectType = 'mobile' | 'system' | 'website' | 'e-commerce';
