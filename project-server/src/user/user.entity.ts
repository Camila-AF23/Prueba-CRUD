import { ContactEntity } from '../contact/contact.entity';

export class UserEntity {
  id!: number;
  name!: string;
  email!: string;
  password?: string;
  createdAt!: Date;
  contacts?: ContactEntity[];
}
