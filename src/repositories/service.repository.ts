import { Service } from '@models/service';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class ServiceRepository extends FirebaseAbstract<Service> {
  constructor(userId?: string) {
    super(CollectionName.Services, userId);
  }
}
