import { BaseModel } from '@models/base';
import { UserLog } from '@models/firebase/log';

export class Log extends BaseModel {
  user: UserLog;
  event!: LogEvent;
  afterData?: string;
  beforeData?: string;
  collectionPath!: string;

  constructor() {
    super();
    this.user = new UserLog();
    this.createdAt = new Date();
  }
}

export enum LogEvent {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',

  ACTIVE = 'active',
  DEACTIVATE = 'deactivate'
}
