import { Social } from '@models/social';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class SocialRepository extends FirebaseAbstract<Social> {
  constructor(userId?: string) {
    super(CollectionName.Socials, userId);
  }
}
