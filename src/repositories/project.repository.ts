import { Project } from '@models/project';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class ProjectRepository extends FirebaseAbstract<Project> {
  constructor(userId?: string) {
    super(CollectionName.Projects, userId);
  }
}
