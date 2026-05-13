import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactDTO {
  @IsNotEmpty()
  @IsString()
  lastname!: string;
  @IsNotEmpty()
  @IsString()
  email!: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  phone!: string;
}
