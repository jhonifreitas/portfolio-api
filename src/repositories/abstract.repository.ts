import admin from 'firebase-admin';

import { Log, LogEvent } from '@models/log';
import { UserLog } from '@models/firebase/log';
import { BaseModel } from '@interfaces/base-model';
import { FirebaseWhere } from '@models/firebase/where';

import { CollectionName } from '@configs/collection-name';
import { DocumentNotFound } from '@exceptions/doc-not-found';

export abstract class FirebaseAbstract<T extends BaseModel> {

  constructor(
    protected collectionName: string,
    protected user?: UserLog
  ) { }

  async add(data: T) {
    const doc = this.cloneObject(data);

    doc.createdAt = this.timestamp;
    doc.updatedAt = null;
    doc.deletedAt = null;

    delete doc.id;

    return this.collection().add(doc).then(async res => {
      await this.log(LogEvent.CREATE, {id: res.id, ...doc});
      return res.id;
    });
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const doc = this.cloneObject(data);

    doc.updatedAt = this.timestamp;
    delete doc.createdAt;
    delete doc.deletedAt;
    delete doc.id;

    await this.log(LogEvent.UPDATE, {id, ...doc});
    return this.collection().doc(id).update(doc).then(_ => undefined);
  }

  save(item: T) {
    if (!item.id) return this.add(item);
    return this.update(item.id, item);
  }

  set(data: T, options: FirebaseFirestore.SetOptions = {}) {
    const doc = this.cloneObject(data);

    if (doc.createdAt) {
      doc.updatedAt = this.timestamp;
      delete doc.createdAt;
      delete doc.deletetAt;
    } else {
      doc.createdAt = this.timestamp;
      doc.updatedAt = null;
      doc.deletedAt = null;
    }

    delete doc.id;

    return this.collection().doc(data.id).set(doc, options);
  }

  async delete(id: string, real?: boolean): Promise<void> {
    if (real) {
      await this.log(LogEvent.DELETE, { id });
      return this.collection().doc(id).delete().then(_ => undefined);
    } else return this.softDelete(id, true);
  }

  async softDelete(id: string, deleted: boolean): Promise<void> {
    const data = { deletedAt: deleted ? this.timestamp : null };
    await this.log(deleted ? LogEvent.DEACTIVATE : LogEvent.ACTIVE, { id });
    return this.collection().doc(id).update(data).then(_ => undefined);
  }

  async getById(id: string): Promise<T> {
    const doc = await this.collection().doc(id).get();
    if (!doc.exists) throw new DocumentNotFound();
    return this.toObject(doc);
  }

  async getAll(
    orderBy?: string,
    orderDirection?: FirebaseFirestore.OrderByDirection,
    limit?: number
  ): Promise<T[]> {
    if (orderBy && limit) {
      const { docs } = await this.collection()
        .orderBy(orderBy, orderDirection)
        .limit(limit)
        .get();
      return docs.map(doc => this.toObject(doc));
    } else if (orderBy) {
      const { docs } = await this.collection()
        .orderBy(orderBy, orderDirection)
        .get();
      return docs.map(doc => this.toObject(doc));
    } else if (limit) {
      const { docs } = await this.collection()
        .limit(limit)
        .get();
      return docs.map(doc => this.toObject(doc));
    } else {
      const { docs } = await this.collection().get();
      return docs.map(doc => this.toObject(doc));
    }
  }

  async getAllActive(
    orderBy?: string,
    orderDirection?: FirebaseFirestore.OrderByDirection,
    limit?: number
  ): Promise<T[]> {
    let query = this.collection().where('deletedAt', '==', null);

    if (orderBy) query = query.orderBy(orderBy, orderDirection);
    if (limit) query = query.limit(limit);

    const { docs } = await query.get();
    return docs.map((doc) => this.toObject(doc));
  }

  async getAllDeleted(
    orderBy?: string,
    orderDirection?: FirebaseFirestore.OrderByDirection,
    limit?: number
  ): Promise<T[]> {
    let query = this.collection().where('deletedAt', '!=', null);

    if (orderBy) query = query.orderBy(orderBy, orderDirection);
    if (limit) query = query.limit(limit);

    const { docs } = await query.get();
    return docs.map((doc) => this.toObject(doc));
  }

  async getWhere(
    field: string,
    operator: FirebaseFirestore.WhereFilterOp,
    value: any, // eslint-disable-line
    orderBy?: string,
    orderDirection?: FirebaseFirestore.OrderByDirection,
    limit?: number
  ): Promise<T[]> {
    let query = this.collection().where(field, operator, value);

    if (orderBy) query = query.orderBy(orderBy, orderDirection);
    if (limit) query = query.limit(limit);

    const { docs } = await query.get();
    return docs.map(doc => this.toObject(doc));
  }

  async getWhereMany(
    filters: FirebaseWhere[],
    orderBy?: string,
    orderDirection?: FirebaseFirestore.OrderByDirection,
    limit?: number
  ): Promise<T[]> {
    let query = this.collection().where(filters[0].field, filters[0].operator, filters[0].value);

    filters.splice(0, 1);

    for (const filter of filters) query = query.where(filter.field, filter.operator, filter.value);

    if (orderBy) query = query.orderBy(orderBy, orderDirection);
    if (limit) query = query.limit(limit);

    const { docs } = await query.get();
    return docs.map(doc => this.toObject(doc));
  }

  protected collection() {
    return this.db.collection(this.collectionName);
  }

  private get db() {
    return admin.firestore();
  }

  private get timestamp() {
    return admin.firestore.FieldValue.serverTimestamp();
  }

  protected toObject(document: admin.firestore.DocumentData): T {
    let data = { id: document.id, ...document.data() };
    data = this.transformTimestampToDate(data);
    return data;
  }

  private transformTimestampToDate(obj: any): any { // eslint-disable-line
    if (null === obj || 'object' !== typeof obj) return obj;

    if (obj instanceof admin.firestore.Timestamp) return obj.toDate();

    if (obj instanceof Array) {
      const copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.transformTimestampToDate(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      const copy: any = {}; // eslint-disable-line
      for (const attr in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = this.transformTimestampToDate(obj[attr]);
      }

      return copy;
    }

    throw new Error('The object could not be transformed! Type is not supported.');
  }

  protected cloneObject(obj: any): any { // eslint-disable-line
    if (typeof obj === 'string' && Date.parse(obj) && new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/).test(obj))
      return new Date(obj);

    if (null === obj || 'object' !== typeof obj) return obj;

    if (obj instanceof admin.firestore.FieldValue) return obj;

    let copy: any; // eslint-disable-line

    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.cloneObject(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = this.cloneObject(obj[attr]);
      }

      for (const prop in copy) {
        if (copy[prop] === undefined) delete copy[prop];
      }

      return copy;
    }

    throw new Error('The object could not be copied! Type is not supported.');
  }

  // LOG
  private async log(event: LogEvent, afterData: T | {id: string}) {
    if (this.user) {
      const log = new Log();
      log.event = event;
      log.user.id = this.user.id;
      log.user.name = this.user.name;
      log.user.role = this.user.role;
      log.collectionPath = `${this.collectionName}/${afterData.id}`;

      if (event === LogEvent.CREATE) {
        log.afterData = JSON.stringify(afterData);
      } else if (LogEvent.UPDATE) {
        const beforeData = await this.getById(afterData.id);
        log.beforeData = JSON.stringify(beforeData);
        log.afterData = JSON.stringify(afterData);
      } else if (LogEvent.DELETE) {
        const beforeData = await this.getById(afterData.id);
        log.beforeData = JSON.stringify(beforeData);
      }

      const doc = this.cloneObject(log);
      await this.db.collection(CollectionName.Logs).add(doc);
    }
  }
}
