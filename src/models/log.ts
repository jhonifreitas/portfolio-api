import { BaseModel } from '@models/base';

export class Log extends BaseModel {
  userId!: string;
  event!: LogEvent;
  afterData?: string;
  beforeData?: string;
  collectionPath!: string;

  constructor(userId: string, event: LogEvent, collectionPath: string, afterData?: string, beforeData?: string) {
    super();
    this.userId = userId;
    this.event = event;
    this.collectionPath = collectionPath;
    this.afterData = afterData;
    this.beforeData = beforeData;
    this.createdAt = new Date();
  }
}

export type LogEvent = 'create' | 'update' | 'delete' | 'active'| 'deactivate';
