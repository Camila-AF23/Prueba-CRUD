import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../database/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from '../../config/enviroment';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, LocalStrategy],
})
export class AuthModule {}
