import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [AuthModule, ContactModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
