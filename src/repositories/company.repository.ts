import { Company } from '@models/company';
import { FirebaseAbstract } from './abstract.repository';
import { CollectionName } from '@configs/collection-name';

export class CompanyRepository extends FirebaseAbstract<Company> {
  constructor(userId?: string) {
    super(CollectionName.Companies, userId);
  }
}
