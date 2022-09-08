import { Profile } from '@models/profile';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class ProfileRepository extends FirebaseAbstract<Profile> {
  constructor(userId?: string) {
    super(CollectionName.Profiles, userId);
  }
}
