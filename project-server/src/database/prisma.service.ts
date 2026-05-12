import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Base de datos conectada');
    } catch (error) {
      if (error instanceof Error)
        console.log('Error al conectar a la base de datos:', error.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
