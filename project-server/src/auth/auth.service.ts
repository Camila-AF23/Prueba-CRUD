import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

export interface IPayloadLogin {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(body: LoginDto) {
    try {
      const user = await this.userService.findOneUser(body.email);
      if (!user) return null;

      const match = await bcrypt.compare(body.password, user.password ?? '');
      if (match) {
        const { password, ...result } = user;
        return result;
      }

      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async Login(user: UserEntity) {
    const payload: IPayloadLogin = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      user,
      access_token: token,
    };
  }
}
