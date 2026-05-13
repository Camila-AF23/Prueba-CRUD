import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneUser(email: string): Promise<UserEntity | null | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) return user;
      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async createUser(body: CreateUserDto): Promise<UserEntity | undefined> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(body.password, salt);
      const newuser = await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hash,
        },
      });
      const { password, ...result } = newuser;
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findUserById(id: number): Promise<UserEntity | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          contacts: true,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      const { password, ...result } = user;
      return result as UserEntity; //
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
