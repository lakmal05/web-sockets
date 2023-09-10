import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { CollectionModule } from './collection/collection.module';
import { PrismaModule } from './prisma/prisma.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [GatewayModule, CollectionModule, PrismaModule, FolderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
