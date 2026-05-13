import { UserEntity } from '../user/user.entity';

export class ContactEntity {
  id!: number;
  lastname!: string;
  email!: string;
  phone!: string;
  userID!: number;
  user!: UserEntity;
  createdAt!: Date;
}
