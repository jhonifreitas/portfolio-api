import { Project } from '@models/project';
import { UserLog } from '@models/firebase/log';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class ProjectRepository extends FirebaseAbstract<Project> {
  constructor(user?: UserLog) {
    super(CollectionName.Projects, user);
  }
}
