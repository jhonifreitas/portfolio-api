export class BaseModel {
  id!: string;
  createdAt!: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  constructor() {
    this.updatedAt = null;
    this.deletedAt = null;
  }
}
