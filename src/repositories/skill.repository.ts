import { Skill } from '@models/skill';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class SkillRepository extends FirebaseAbstract<Skill> {
  constructor(userId?: string) {
    super(CollectionName.Skills, userId);
  }
}
